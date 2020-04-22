/**
 * GLea - GL experience audience Library
 * @module glea
 */

/**
 * Converts an array of number to a Float32Array or Uint8Array
 * @param {number[]} data
 * @param {WebGLRenderingContext.FLOAT|WebGLRenderingContext.BYTE} type
 */
function convertArray(data = [], type = WebGLRenderingContext.FLOAT) {
  if (type === WebGLRenderingContext.FLOAT) {
    return new Float32Array(data);
  }
  if (type === WebGLRenderingContext.BYTE) {
    return new Uint8Array(data);
  }
  return data;
}

/**
 * Create shader
 * @param {string} code the shader code
 * @param {string} shaderType frag or vert
 */
function shader(code, shaderType) {
  return (gl) => {
    const sh = gl.createShader(
      /frag/.test(shaderType) ? gl.FRAGMENT_SHADER : gl.VERTEX_SHADER
    );
    gl.shaderSource(sh, code);
    gl.compileShader(sh);
    if (!gl.getShaderParameter(sh, gl.COMPILE_STATUS)) {
      throw 'Could not compile Shader.\n\n' + gl.getShaderInfoLog(sh);
    }
    return sh;
  };
}

/** Class GLea */
class GLea {
  constructor({
    canvas,
    gl,
    contextType = 'webgl',
    shaders,
    buffers,
    devicePixelRatio = 1,
    glOptions,
  }) {
    this.canvas = canvas || document.querySelector('canvas');
    this.gl = gl;
    if (!this.gl && this.canvas) {
      if (contextType === 'webgl') {
        this.gl =
          this.canvas.getContext('webgl', glOptions) ||
          this.canvas.getContext('experimental-webgl', glOptions);
      } else {
        this.gl = this.canvas.getContext(contextType, glOptions);
      }
      if (!this.gl) {
        throw Error(`no ${contextType} context available.`);
      }
    }
    this.shaders = shaders;
    this.buffers = buffers;
    this.textures = [];
    this.devicePixelRatio = devicePixelRatio;
  }

  /**
   * Create a vertex shader
   *
   * @param {string} code shader code
   */
  static vertexShader(code) {
    return (gl) => shader(code, 'vertex')(gl);
  }

  /**
   * Create a fragment shader
   *
   * @param {string} code fragment shader code
   */
  static fragmentShader(code) {
    return (gl) => shader(code, 'fragment')(gl);
  }

  /**
   * Create Buffer
   *
   * @param {number}   size buffer size
   * @param {number[]} data buffer data
   * @param {number}   usage usage, by default gl.STATIC_DRAW
   * @param {number}   type data type, by default gl.FLOAT
   * @param {boolean}  normalized normalize data, false
   * @param {number}   stride stride, by default 0
   * @param {number}   offset offset, by default 0
   */
  static buffer(
    size,
    data,
    usage = WebGLRenderingContext.STATIC_DRAW,
    type = WebGLRenderingContext.FLOAT,
    normalized = false,
    stride = 0,
    offset = 0
  ) {
    return (name, gl, program) => {
      const loc = gl.getAttribLocation(program, name);
      gl.enableVertexAttribArray(loc);
      // create buffer:
      const id = gl.createBuffer();
      const bufferData =
        data instanceof Array ? convertArray(data, type) : data;
      gl.bindBuffer(gl.ARRAY_BUFFER, id);
      gl.bufferData(gl.ARRAY_BUFFER, bufferData, usage);
      gl.vertexAttribPointer(loc, size, type, normalized, stride, offset);
      return {
        id,
        name,
        data: bufferData,
        loc,
        type,
        size,
      };
    };
  }

  /**
   * init WebGLRenderingContext
   * @returns {GLea} glea instance
   */
  create() {
    const { gl, shaders } = this;
    this.program = gl.createProgram();
    const { program } = this;
    shaders
      .map((shaderFunc) => shaderFunc(gl))
      .map((shader) => {
        gl.attachShader(program, shader);
      });
    gl.linkProgram(program);
    gl.validateProgram(program);
    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
      const info = gl.getProgramInfoLog(program);
      throw 'Could not compile WebGL program. \n\n' + info;
    }
    this.use();
    Object.keys(this.buffers).forEach((name) => {
      const bufferFunc = this.buffers[name];
      this.buffers[name] = bufferFunc(name, gl, program);
    });
    this.resize();
    return this;
  }

  /**
   * Set active texture
   * @param {number} textureIndex texture index in the range [0 .. gl.MAX_COMBINED_TEXTURE_IMAGE_UNITS - 1]
   * @param {WebGLTexture} texture webgl texture object
   */
  setActiveTexture(textureIndex, texture) {
    const { gl } = this;
    gl.activeTexture(gl['TEXTURE' + textureIndex.toString()]);
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
   */
  createTexture(
    textureIndex = 0,
    params = {
      textureWrapS: 'clampToEdge',
      textureWrapT: 'clampToEdge',
      textureMinFilter: 'nearest',
      textureMagFilter: 'nearest',
    }
  ) {
    const scream = (str = '') =>
      /^[A-Z0-9_]+$/.test(str)
        ? str
        : str.replace(/([A-Z])/g, '_$1').toUpperCase();
    const { gl } = this;
    const texture = gl.createTexture();
    gl.activeTexture(gl['TEXTURE' + textureIndex.toString()]);
    gl.bindTexture(gl.TEXTURE_2D, texture);
    for (let key in params) {
      if (params.hasOwnProperty(key)) {
        const KEY = scream(key);
        const VAL = scream(params[key]);
        if (KEY in gl && VAL in gl) {
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
  updateBuffer(name, offset = 0) {
    const buffer = this.buffers[name];
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer.id);
    gl.bufferSubData(gl.ARRAY_BUFFER, offset, buffer.data);
  }

  /**
   * Resize canvas and webgl viewport
   */
  resize() {
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
  get width() {
    return this.canvas ? this.canvas.width : null;
  }

  /**
   * Get canvas height
   * @returns {number} canvas height
   */
  get height() {
    return this.canvas ? this.canvas.height : null;
  }

  /**
   * Use program
   */
  use() {
    this.gl.useProgram(this.program);
    return this;
  }

  /**
   * Set uniform matrix
   *
   * @param {string} name uniform variable name
   * @param {number[]} data uniform float matrix
   */
  uniM(name, data) {
    const { gl, program } = this;
    const { sqrt } = Math;
    const loc = gl.getUniformLocation(program, name);
    gl['uniformMatrix' + sqrt(data.length) + 'fv'](
      loc,
      false,
      new Float32Array(data)
    );
    return loc;
  }

  /**
   * Set uniform float vector
   *
   * @param {string} name uniform variable name
   * @param {number[]} data uniform float vector
   */
  uniV(name, data) {
    const { gl, program } = this;
    const loc = gl.getUniformLocation(program, name);
    gl['uniform' + data.length + 'fv'](
      loc,
      data instanceof Array || data instanceof Float32Array
        ? data
        : new Float32Array(data)
    );
    return loc;
  }

  /**
   * Set uniform int vector
   *
   * @param {string} name uniform variable name
   * @param {number[]} data uniform int vector
   */
  uniIV(name, data) {
    const { gl, program } = this;
    const loc = gl.getUniformLocation(program, name);
    gl['uniform' + data.length + 'iv'](loc, new Int32Array(data));
    return loc;
  }

  /**
   * Set uniform float
   *
   * @param {string} name uniform variable name
   * @param {number} data data
   */
  uni(name, data) {
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
  uniI(name, data) {
    const { gl, program } = this;
    const loc = gl.getUniformLocation(program, name);
    if (typeof data === 'number') {
      gl.uniform1i(loc, data);
    }
  }

  /**
   * Clear screen
   *
   * @param {Float32Array<GLclampf>} clearColor
   */
  clear(clearColor = null) {
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
    const { gl, program, canvas } = this;
    try {
      gl.deleteProgram(program);
      Object.values(this.buffers).forEach((buffer) => {
        gl.deleteBuffer(buffer.id);
      });
      this.textures.forEach((texture) => {
        gl.deleteTexture(texture);
      });
      gl.getExtension('WEBGL_lose_context').loseContext();
      const newCanvas = canvas.cloneNode();
      canvas.style.display = 'none';
      if (canvas.parentNode) {
        canvas.parentNode.insertBefore(newCanvas, canvas);
        canvas.parentNode.removeChild(canvas);
      }
      this.gl = null;
      this.canvas = newCanvas;
      this.program = null;
    } catch (err) {
      console.error(err);
    }
  }
}

export default GLea;
