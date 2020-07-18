const SHADER_HEAD = 'precision highp float;';
const VERT_DEFAULT = SHADER_HEAD +
    'attribute vec2 position;void main(){gl_Position=vec4(position,0, 1.);}';
const FRAG_DEFAULT = SHADER_HEAD +
    `precision highp float;void main(){gl_FragColor = vec4(1.,0.,0.,1.);}`;
/**
 * @hidden hide internal function from documentation
 */
function convertArray(data, type = WebGLRenderingContext.FLOAT) {
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
function shader(code, shaderType) {
    const init = (gl) => {
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
    constructor({ canvas, gl, contextType = 'webgl', shaders, buffers, devicePixelRatio = 1, glOptions, }) {
        this.canvas = document.createElement('canvas');
        this.canvas = canvas || document.querySelector('canvas');
        if (!this.canvas) {
            this.canvas = document.createElement('canvas');
            document.body.appendChild(this.canvas);
        }
        if (!document.querySelector('link[rel=stylesheet], style')) {
            // if there's no css, provide some minimal defaults
            const style = document.createElement('style');
            style.innerHTML =
                'body{margin:0}canvas{display:block;width:100vw;height:100vh}';
            document.head.appendChild(style);
        }
        this.contextType = contextType;
        this.glOptions = glOptions;
        this.gl = gl || this.getContext(contextType, glOptions);
        const program = this.gl.createProgram();
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
    getDefaultBuffers() {
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
    getContext(contextType, glOptions) {
        if (contextType === 'webgl') {
            return (this.canvas.getContext('webgl', glOptions) ||
                this.canvas.getContext('experimental-webgl', glOptions));
        }
        if (contextType === 'webgl2') {
            return this.canvas.getContext('webgl2', glOptions);
        }
        throw Error(`no ${contextType} context available.`);
    }
    /**
     * Create a vertex shader
     *
     * @param code shader code
     */
    static vertexShader(code = VERT_DEFAULT) {
        return shader(code, 'vert');
    }
    /**
     * Create a fragment shader
     *
     * @param {string} code fragment shader code
     */
    static fragmentShader(code = FRAG_DEFAULT) {
        return shader(code, 'frag');
    }
    /**
     * Create a webgl program from a vertex and fragment shader (no matter which order)
     * @param shader1 a factory created by GLea.vertexShader or GLea.fragmentShader
     * @param shader2 a factory created by GLea.vertexShader or GLea.fragmentShader
     */
    prog(gl, shader1, shader2) {
        const p = gl.createProgram();
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
    static buffer(size, data, usage = WebGLRenderingContext.STATIC_DRAW, type = WebGLRenderingContext.FLOAT, normalized = false, stride = 0, offset = 0) {
        return (name, gl, program) => {
            const loc = gl.getAttribLocation(program, name);
            gl.enableVertexAttribArray(loc);
            // create buffer:
            const id = gl.createBuffer();
            const bufferData = data instanceof Array ? convertArray(data, type) : data;
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
                normalized,
                stride,
                offset,
            };
        };
    }
    drawArrays(drawMode, first = 0) {
        const attributes = Object.keys(this.buffers);
        if (attributes.length === 0) {
            return;
        }
        const firstAttributeName = attributes[0];
        const firstBuffer = this.buffers[firstAttributeName];
        const len = firstBuffer.data.length;
        const count = len / firstBuffer.size;
        this.gl.drawArrays(drawMode, first, count);
    }
    disableAttribs() {
        const { gl, program, buffers } = this;
        for (let key of Object.keys(buffers)) {
            const loc = gl.getAttribLocation(program, key);
            gl.disableVertexAttribArray(loc);
        }
    }
    enableAttribs() {
        const { gl, program, buffers } = this;
        this.use();
        for (let key of Object.keys(buffers)) {
            const b = buffers[key];
            const loc = gl.getAttribLocation(program, key);
            gl.enableVertexAttribArray(loc);
            gl.bindBuffer(gl.ARRAY_BUFFER, buffers[key].id);
            gl.vertexAttribPointer(loc, b.size, b.type, b.normalized, b.stride, b.offset);
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
    replaceCanvas() {
        const { canvas } = this;
        const newCanvas = canvas.cloneNode();
        if (canvas.parentNode) {
            canvas.parentNode.insertBefore(newCanvas, canvas);
            canvas.parentNode.removeChild(canvas);
        }
        this.canvas = newCanvas;
    }
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
    add({ shaders, buffers }) {
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
    setActiveTexture(textureIndex, texture) {
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
    createTexture(textureIndex = 0, params = {
        textureWrapS: 'clampToEdge',
        textureWrapT: 'clampToEdge',
        textureMinFilter: 'nearest',
        textureMagFilter: 'nearest',
    }) {
        const scream = (str = '') => /^[A-Z0-9_]+$/.test(str)
            ? str
            : str.replace(/([A-Z])/g, '_$1').toUpperCase();
        const { gl } = this;
        const texture = gl.createTexture();
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
    updateBuffer(name, offset = 0) {
        const { gl } = this;
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
        return this.canvas ? this.canvas.width : NaN;
    }
    /**
     * Get canvas height
     * @returns {number} canvas height
     */
    get height() {
        return this.canvas ? this.canvas.height : NaN;
    }
    /**
     * Use program
     */
    use(program) {
        if (program) {
            this.program = program;
        }
        this.gl.useProgram(this.program);
        return this;
    }
    /**
     * set uniform matrix (mat2, mat3, mat4)
     * @param name uniform name
     * @param data array of numbers (4 for mat2, 9 for mat3, 16 for mat4)
     * @returns location id of the uniform
     */
    uniM(name, data) {
        const { gl, program } = this;
        const loc = gl.getUniformLocation(program, name);
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
    uniV(name, data) {
        const { gl, program } = this;
        const loc = gl.getUniformLocation(program, name);
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
    uniIV(name, data) {
        const { gl, program } = this;
        const loc = gl.getUniformLocation(program, name);
        if (data.length === 2) {
            gl.uniform2iv(loc, data);
            return loc;
        }
        if (data.length === 3) {
            gl.uniform3iv(loc, data);
            return loc;
        }
        if (data.length === 4) {
            gl.uniform4iv(loc, data);
            return loc;
        }
        throw Error('unsupported uniform vector type');
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
     * @param {number[]} clearColor
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
            // @ts-ignore TS doesn't know about getExtension
            gl.getExtension('WEBGL_lose_context').loseContext();
            this.replaceCanvas();
        }
        catch (err) {
            console.error(err);
        }
    }
}

export default GLea;
