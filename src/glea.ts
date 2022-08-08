/**
 * GLea - GL experience artistry Library
 * @module glea
 */
export type GLeaContext = WebGLRenderingContext | WebGL2RenderingContext;

const SHADER_HEAD = 'precision highp float;';
const VERT_DEFAULT =
  SHADER_HEAD +
  'attribute vec2 position;void main(){gl_Position=vec4(position,0, 1.);}';
const FRAG_DEFAULT =
  SHADER_HEAD +
  `precision highp float;void main(){gl_FragColor = vec4(1.,0.,0.,1.);}`;

/**
 * store for an attribute and a buffer
 */
export type GLeaBuffer = {
  id: WebGLBuffer;
  name: string;
  data: ArrayBuffer;
  loc: number;
  type: number;
  size: number;
  normalized: boolean;
  stride: number;
  offset: number;
};

/**
 * function that compiles a shader
 */
export type GLeaShaderFactory = {
  shaderType: string;
  init: (gl: GLeaContext) => WebGLShader;
};

/**
 * function that registers an attribute and binds a buffer to it
 */
export type GLeaBufferFactory = (
  name: string,
  gl: GLeaContext,
  program: WebGLProgram
) => GLeaBuffer;

export type GLeaConstructorParams = {
  canvas?: HTMLCanvasElement;
  gl?: WebGLRenderingContext | WebGL2RenderingContext;
  contextType?: string;
  shaders: GLeaShaderFactory[];
  buffers?: Record<string, GLeaBufferFactory>;
  devicePixelRatio?: number;
  glOptions?: WebGLContextAttributes;
};

/**
 * @hidden hide internal function from documentation
 */
function convertArray(
  data: number[],
  type = WebGLRenderingContext.FLOAT
): ArrayBuffer {
  if (type === WebGLRenderingContext.FLOAT) {
    return new Float32Array(data);
  }
  if (type === WebGLRenderingContext.BYTE) {
    return new Uint8Array(data);
  }
  throw Error('type not supported');
}

/**
 * @hidden hide internal function from documentation
 */
function shader(code: string, shaderType: 'frag' | 'vert'): GLeaShaderFactory {
  const init = (gl: WebGLRenderingContext | WebGL2RenderingContext) => {
    const glShaderType = /frag/.test(shaderType)
      ? WebGLRenderingContext.FRAGMENT_SHADER
      : WebGLRenderingContext.VERTEX_SHADER;
    const sh = gl.createShader(glShaderType);
    if (!sh) {
      throw Error('shader type not supported');
    }
    gl.shaderSource(sh, code);
    gl.compileShader(sh);
    if (!gl.getShaderParameter(sh, gl.COMPILE_STATUS)) {
      throw 'Could not compile Shader.\n\n' + gl.getShaderInfoLog(sh);
    }
    return sh;
  };
  return {
    shaderType,
    init,
  };
}

/** Class GLea */
class GLea {
  canvas: HTMLCanvasElement = document.createElement('canvas');
  contextType: string;
  glOptions?: WebGLContextAttributes;
  gl: WebGLRenderingContext | WebGL2RenderingContext;
  shaderFactory: GLeaShaderFactory[];
  bufferFactory: Record<string, GLeaBufferFactory>;

  program: WebGLProgram;
  buffers: Record<string, GLeaBuffer>;
  textures: WebGLTexture[];
  devicePixelRatio: number;
  parent?: GLea;

  constructor({
    canvas,
    gl,
    contextType = 'webgl',
    shaders,
    buffers,
    devicePixelRatio = 1,
    glOptions,
  }: GLeaConstructorParams) {
    this.canvas = canvas || <HTMLCanvasElement>document.querySelector('canvas');
    if (!this.canvas) {
      this.canvas = document.createElement('canvas') as HTMLCanvasElement;
      document.body.appendChild(this.canvas);
    }
    if (!document.querySelector('link[rel=stylesheet], style')) {
      // if there's no css, provide some minimal defaults
      const style = document.createElement('style') as HTMLStyleElement;
      style.innerHTML =
        'body{margin:0}canvas{display:block;width:100vw;height:100vh}';
      document.head.appendChild(style);
    }
    this.contextType = contextType;
    this.glOptions = glOptions;
    this.gl = gl || this.getContext(contextType, glOptions);
    const program = this.gl.createProgram() as WebGLProgram;
    this.program = program;
    this.buffers = {};
    this.shaderFactory = shaders;
    this.bufferFactory = buffers || this.getDefaultBuffers();
    this.textures = [];
    this.devicePixelRatio = devicePixelRatio;
  }

  /**
   * By default, GLea provides a position buffer containing 4 2D coordinates
   * A triangle strip plane that consists of 2 triangles
   */
  private getDefaultBuffers() {
    return {
      // create a position attribute bound
      // to a buffer with 4 2D coordinates
      position: GLea.buffer(2, [1, 1, -1, 1, 1, -1, -1, -1]),
    };
  }

  /**
   * Used to create a WebGLRenderingContext
   * @param contextType webgl or webgl2. Also detects if webgl is only available via the context `experimental-webgl`
   * @param glOptions see WebGLContextAttributes
   */
  private getContext(
    contextType: string,
    glOptions?: WebGLContextAttributes
  ): GLeaContext {
    if (contextType === 'webgl') {
      return (this.canvas.getContext('webgl', glOptions) ||
        this.canvas.getContext(
          'experimental-webgl',
          glOptions
        )) as WebGLRenderingContext;
    }
    if (contextType === 'webgl2') {
      return this.canvas.getContext(
        'webgl2',
        glOptions
      ) as WebGL2RenderingContext;
    }
    throw Error(`no ${contextType} context available.`);
  }

  /**
   * Create a vertex shader
   *
   * @param code shader code
   */
  static vertexShader(code: string = VERT_DEFAULT) {
    return shader(code, 'vert');
  }

  /**
   * Create a fragment shader
   *
   * @param {string} code fragment shader code
   */
  static fragmentShader(code: string = FRAG_DEFAULT) {
    return shader(code, 'frag');
  }

  /**
   * Create a webgl program from a vertex and fragment shader (no matter which order)
   * @param shader1 a factory created by GLea.vertexShader or GLea.fragmentShader
   * @param shader2 a factory created by GLea.vertexShader or GLea.fragmentShader
   */
  private prog(
    gl: GLeaContext,
    shader1: GLeaShaderFactory,
    shader2: GLeaShaderFactory
  ) {
    const p = gl.createProgram() as WebGLProgram;
    const s1 = shader1.init(gl);
    const s2 = shader2.init(gl);
    gl.attachShader(p, s1);
    gl.attachShader(p, s2);
    gl.linkProgram(p);
    gl.validateProgram(p);
    if (!gl.getProgramParameter(p, gl.LINK_STATUS)) {
      const info = gl.getProgramInfoLog(p);
      throw 'Could not compile WebGL program. \n\n' + info;
    }
    return p;
  }

  /**
   * Create Buffer
   *
   * @param {number}   size record size (2 for vec2, 3 for vec3, 4 for vec4)
   * @param {number[]} data buffer data
   * @param {number}   usage usage, by default gl.STATIC_DRAW
   * @param {number}   type data type, by default gl.FLOAT
   * @param {boolean}  normalized normalize data, false
   * @param {number}   stride stride, by default 0
   * @param {number}   offset offset, by default 0
   */
  static buffer(
    size: number,
    data: number[] | Uint8Array | Float32Array,
    usage = WebGLRenderingContext.STATIC_DRAW,
    type = WebGLRenderingContext.FLOAT,
    normalized = false,
    stride = 0,
    offset = 0
  ): GLeaBufferFactory {
    return (
      name: string,
      gl: GLeaContext,
      program: WebGLProgram
    ): GLeaBuffer => {
      const loc = gl.getAttribLocation(program, name);
      gl.enableVertexAttribArray(loc);
      // create buffer:
      const id = gl.createBuffer() as WebGLBuffer;
      const bufferData =
        data instanceof Array ? convertArray(data, type) : data;
      gl.bindBuffer(gl.ARRAY_BUFFER, id);
      gl.bufferData(gl.ARRAY_BUFFER, bufferData as ArrayBuffer, usage);
      gl.vertexAttribPointer(loc, size, type, normalized, stride, offset);
      return {
        id,
        name,
        data: bufferData,
        loc,
        type,
        size,
        normalized,
        stride,
        offset,
      };
    };
  }

  /**
   * Wrapper for gl.drawArrays
   *
   * @param {number} drawMode gl.POINTS, gl.TRIANGLES, gl.TRIANGLE_STRIP, ...
   * @param {number} first offset of first vertex
   * @param {number} count count of vertices. If not provided, it is determined from the provided buffers
   */
  drawArrays(drawMode: number, first = 0, count?: number) {
    if (typeof count === 'undefined') {
      const attributes = Object.keys(this.buffers);
      if (attributes.length === 0) {
        return;
      }
      const firstAttributeName = attributes[0];
      const firstBuffer = this.buffers[firstAttributeName];
      const len = (firstBuffer.data as Float32Array).length;
      count = len / firstBuffer.size;
    }
    this.gl.drawArrays(drawMode, first, count);
  }

  /**
   * Disable attribs (useful for switching between GLea instances)
   */
  disableAttribs() {
    const { gl, program, buffers } = this;
    for (let key of Object.keys(buffers)) {
      const loc = gl.getAttribLocation(program, key);
      gl.disableVertexAttribArray(loc);
    }
  }

  /**
   * Enable attribs
   */
  enableAttribs() {
    const { gl, program, buffers } = this;
    this.use();
    for (let key of Object.keys(buffers)) {
      const b = buffers[key];
      const loc = gl.getAttribLocation(program, key);
      gl.enableVertexAttribArray(loc);
      gl.bindBuffer(gl.ARRAY_BUFFER, buffers[key].id);
      gl.vertexAttribPointer(
        loc,
        b.size,
        b.type,
        b.normalized,
        b.stride,
        b.offset
      );
    }
  }

  /**
   * init WebGLRenderingContext
   * @returns {GLea} glea instance
   */
  create() {
    const { gl } = this;
    this.program = this.prog(gl, this.shaderFactory[0], this.shaderFactory[1]);
    this.use();
    Object.keys(this.bufferFactory).forEach((name) => {
      const bufferFunc = this.bufferFactory[name];
      this.buffers[name] = bufferFunc(name, gl, this.program);
    });
    if (!this.parent) {
      this.resize();
    }
    return this;
  }

  private replaceCanvas() {
    const { canvas } = this;
    const newCanvas = canvas.cloneNode() as HTMLCanvasElement;
    if (canvas.parentNode) {
      canvas.parentNode.insertBefore(newCanvas, canvas);
      canvas.parentNode.removeChild(canvas);
    }
    this.canvas = newCanvas;
  }

  /**
   * Deletes the canvas element and replaces it with a cloned node and calls create() again
   */
  restart() {
    this.replaceCanvas();
    this.gl = this.getContext(this.contextType, this.glOptions);
    this.create();
    return this;
  }

  /**
   * Create a new instance with another program and reuse the rendering context
   * @param param0 buffers and shaders
   */
  add({ shaders, buffers }: GLeaConstructorParams) {
    const instance = new GLea({
      canvas: this.canvas,
      gl: this.gl,
      shaders,
      buffers: buffers || this.getDefaultBuffers(),
    });
    instance.parent = this.parent || this;
    instance.create();
    return instance;
  }

  /**
   * Set active texture
   * @param {number} textureIndex texture index in the range [0 .. gl.MAX_COMBINED_TEXTURE_IMAGE_UNITS - 1]
   * @param {WebGLTexture} texture webgl texture object
   */
  setActiveTexture(textureIndex: number, texture: WebGLTexture) {
    const { gl } = this;
    gl.activeTexture(gl.TEXTURE0 + textureIndex);
    gl.bindTexture(gl.TEXTURE_2D, texture);
  }

  /**
   * @typedef GLeaTextureOptions
   * @property {string} textureWrapS default: clampToEdge
   * @property {string} textureWrapT default: clampToEdge
   * @property {string} textureMinFilter default: nearest
   * @property {string} textureMagFilter default: nearest
   */

  /**
   * Create a texture object
   *
   * @param {number} textureIndex
   * @param {GLeaTextureOptions} params configuration options
   * @returns texture WebGLTexture object
   */
  createTexture(
    textureIndex = 0,
    params: Record<string, string> = {
      textureWrapS: 'clampToEdge',
      textureWrapT: 'clampToEdge',
      textureMinFilter: 'nearest',
      textureMagFilter: 'nearest',
    }
  ): WebGLTexture {
    const scream = (str = '') =>
      /^[A-Z0-9_]+$/.test(str)
        ? str
        : str.replace(/([A-Z])/g, '_$1').toUpperCase();
    const { gl } = this;
    const texture = gl.createTexture() as WebGLTexture;
    gl.activeTexture(gl.TEXTURE0 + textureIndex);
    gl.bindTexture(gl.TEXTURE_2D, texture);
    for (let key in params) {
      if (params.hasOwnProperty(key)) {
        const KEY = scream(key);
        const VAL = scream(params[key]);
        if (KEY in gl && VAL in gl) {
          // @ts-ignore indexing gl by string
          gl.texParameteri(gl.TEXTURE_2D, gl[KEY], gl[VAL]);
        }
      }
    }
    this.textures.push(texture);
    return texture;
  }

  /**
   * Update buffer data
   * @param {string} name name
   * @param {number} offset default: 0
   */
  updateBuffer(name: string, offset = 0): void {
    const { gl } = this;
    const buffer = this.buffers[name];
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer.id);
    gl.bufferSubData(gl.ARRAY_BUFFER, offset, buffer.data);
  }

  /**
   * Resize canvas and webgl viewport
   */
  resize(): void {
    const { canvas, gl, devicePixelRatio } = this;
    if (canvas) {
      canvas.width = canvas.clientWidth * devicePixelRatio;
      canvas.height = canvas.clientHeight * devicePixelRatio;
      gl.viewport(0, 0, gl.drawingBufferWidth, gl.drawingBufferHeight);
    }
  }

  /**
   * Get canvas width
   * @returns {number} canvas width
   */
  get width(): number {
    return this.canvas ? this.canvas.width : NaN;
  }

  /**
   * Get canvas height
   * @returns {number} canvas height
   */
  get height(): number {
    return this.canvas ? this.canvas.height : NaN;
  }

  /**
   * Use program
   */
  use(): GLea {
    this.gl.useProgram(this.program);
    return this;
  }

  /**
   * set uniform matrix (mat2, mat3, mat4)
   * @param name uniform name
   * @param data array of numbers (4 for mat2, 9 for mat3, 16 for mat4)
   * @returns location id of the uniform
   */
  uniM(name: string, data: Float32Array | number[]): WebGLUniformLocation {
    const { gl, program } = this;
    const loc = gl.getUniformLocation(program, name) as WebGLUniformLocation;
    if (data.length === 4) {
      gl.uniformMatrix2fv(loc, false, data);
      return loc;
    }
    if (data.length === 9) {
      gl.uniformMatrix3fv(loc, false, data);
      return loc;
    }
    if (data.length === 16) {
      gl.uniformMatrix4fv(loc, false, data);
      return loc;
    }
    throw Error('unsupported uniform matrix type');
  }

  /**
   * Set uniform float vector
   *
   * @param {string} name uniform variable name
   * @param {number[]} data uniform float vector
   */
  uniV(name: string, data: Float32Array | number[]): WebGLUniformLocation {
    const { gl, program } = this;
    const loc = gl.getUniformLocation(program, name) as WebGLUniformLocation;
    if (data.length === 2) {
      gl.uniform2fv(loc, data);
      return loc;
    }
    if (data.length === 3) {
      gl.uniform3fv(loc, data);
      return loc;
    }
    if (data.length === 4) {
      gl.uniform4fv(loc, data);
      return loc;
    }
    throw Error('unsupported uniform vector type');
  }

  /**
   * Set uniform int vector
   *
   * @param {string} name uniform variable name
   * @param {number[]} data uniform int vector
   * @returns uniform location
   */
  uniIV(name: string, data: Int32Array | number[]): WebGLUniformLocation {
    const { gl, program } = this;
    const loc = gl.getUniformLocation(program, name);
    if (data.length === 2) {
      gl.uniform2iv(loc, data);
      return loc as WebGLUniformLocation;
    }
    if (data.length === 3) {
      gl.uniform3iv(loc, data);
      return loc as WebGLUniformLocation;
    }
    if (data.length === 4) {
      gl.uniform4iv(loc, data);
      return loc as WebGLUniformLocation;
    }
    throw Error('unsupported uniform vector type');
  }

  /**
   * Set uniform float
   *
   * @param {string} name uniform variable name
   * @param {number} data data
   */
  uni(name: string, data: number) {
    const { gl, program } = this;
    const loc = gl.getUniformLocation(program, name);
    if (typeof data === 'number') {
      gl.uniform1f(loc, data);
    }
    return loc;
  }

  /**
   * Set uniform int
   * @param {string} name uniform variable name
   * @param {number} data data
   */
  uniI(name: string, data: number) {
    const { gl, program } = this;
    const loc = gl.getUniformLocation(program, name);
    if (typeof data === 'number') {
      gl.uniform1i(loc, data);
    }
  }
  
  /**
   * Set uniform bool
   * @param {string} name uniform variable name
   * @param {boolean} data data
   */
  uniB(name, data) {
    const { gl, program } = this;
    const loc = gl.getUniformLocation(program, name);
    if (typeof data === 'boolean') {
      gl.uniform1f(loc, data);
    }
  }

  /**
   * Clear screen
   *
   * @param {number[]} clearColor
   */
  clear(clearColor: number[] | null = null) {
    const { gl } = this;
    if (clearColor) {
      gl.clearColor(clearColor[0], clearColor[1], clearColor[2], 1);
    }
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
  }

  /**
   * destroys the WebGLRendering context by deleting all textures, buffers and shaders.
   * Additionally, it calls loseContext.
   * Also the canvas element is removed from the DOM and replaced by a new cloned canvas element
   */
  destroy() {
    const { gl, program } = this;
    try {
      gl.deleteProgram(program);
      Object.values(this.buffers).forEach((buffer) => {
        gl.deleteBuffer(buffer.id);
      });
      this.buffers = {};
      this.textures.forEach((texture) => {
        gl.deleteTexture(texture);
      });
      this.textures = [];
      const extLC = gl.getExtension('WEBGL_lose_context');
      if (extLC && typeof extLC.loseContext === "function") {
        extLC.loseContext();
      }
      this.replaceCanvas();
    } catch (err) {
      console.error(err);
    }
  }
}

export default GLea;
