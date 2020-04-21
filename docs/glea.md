<a name="module_glea"></a>

## glea
GLea - GL experience audience Library


* [glea](#module_glea)
    * [~GLea](#module_glea..GLea)
        * _instance_
            * [.width](#module_glea..GLea+width) ⇒ <code>number</code>
            * [.height](#module_glea..GLea+height) ⇒ <code>number</code>
            * [.create()](#module_glea..GLea+create) ⇒ <code>GLea</code>
            * [.setActiveTexture(textureIndex, texture)](#module_glea..GLea+setActiveTexture)
            * [.createTexture(textureIndex, params)](#module_glea..GLea+createTexture)
            * [.updateBuffer(name, offset)](#module_glea..GLea+updateBuffer)
            * [.resize()](#module_glea..GLea+resize)
            * [.use()](#module_glea..GLea+use)
            * [.uniM(name, data)](#module_glea..GLea+uniM)
            * [.uniV(name, data)](#module_glea..GLea+uniV)
            * [.uniIV(name, data)](#module_glea..GLea+uniIV)
            * [.uni(name, data)](#module_glea..GLea+uni)
            * [.uniI(name, data)](#module_glea..GLea+uniI)
            * [.clear(clearColor)](#module_glea..GLea+clear)
            * [.destroy()](#module_glea..GLea+destroy)
        * _static_
            * [.vertexShader(code)](#module_glea..GLea.vertexShader)
            * [.fragmentShader(code)](#module_glea..GLea.fragmentShader)
            * [.buffer(size, data, usage, type, normalized, stride, offset)](#module_glea..GLea.buffer)
    * [~convertArray(data, type)](#module_glea..convertArray)
    * [~shader(code, shaderType)](#module_glea..shader)
    * [~GLeaTextureOptions](#module_glea..GLeaTextureOptions)

<a name="module_glea..GLea"></a>

### glea~GLea
Class GLea

**Kind**: inner class of [<code>glea</code>](#module_glea)  

* [~GLea](#module_glea..GLea)
    * _instance_
        * [.width](#module_glea..GLea+width) ⇒ <code>number</code>
        * [.height](#module_glea..GLea+height) ⇒ <code>number</code>
        * [.create()](#module_glea..GLea+create) ⇒ <code>GLea</code>
        * [.setActiveTexture(textureIndex, texture)](#module_glea..GLea+setActiveTexture)
        * [.createTexture(textureIndex, params)](#module_glea..GLea+createTexture)
        * [.updateBuffer(name, offset)](#module_glea..GLea+updateBuffer)
        * [.resize()](#module_glea..GLea+resize)
        * [.use()](#module_glea..GLea+use)
        * [.uniM(name, data)](#module_glea..GLea+uniM)
        * [.uniV(name, data)](#module_glea..GLea+uniV)
        * [.uniIV(name, data)](#module_glea..GLea+uniIV)
        * [.uni(name, data)](#module_glea..GLea+uni)
        * [.uniI(name, data)](#module_glea..GLea+uniI)
        * [.clear(clearColor)](#module_glea..GLea+clear)
        * [.destroy()](#module_glea..GLea+destroy)
    * _static_
        * [.vertexShader(code)](#module_glea..GLea.vertexShader)
        * [.fragmentShader(code)](#module_glea..GLea.fragmentShader)
        * [.buffer(size, data, usage, type, normalized, stride, offset)](#module_glea..GLea.buffer)

<a name="module_glea..GLea+width"></a>

#### gLea.width ⇒ <code>number</code>
Get canvas width

**Kind**: instance property of [<code>GLea</code>](#module_glea..GLea)  
**Returns**: <code>number</code> - canvas width  
<a name="module_glea..GLea+height"></a>

#### gLea.height ⇒ <code>number</code>
Get canvas height

**Kind**: instance property of [<code>GLea</code>](#module_glea..GLea)  
**Returns**: <code>number</code> - canvas height  
<a name="module_glea..GLea+create"></a>

#### gLea.create() ⇒ <code>GLea</code>
init WebGLRenderingContext

**Kind**: instance method of [<code>GLea</code>](#module_glea..GLea)  
**Returns**: <code>GLea</code> - glea instance  
<a name="module_glea..GLea+setActiveTexture"></a>

#### gLea.setActiveTexture(textureIndex, texture)
Set active texture

**Kind**: instance method of [<code>GLea</code>](#module_glea..GLea)  

| Param | Type | Description |
| --- | --- | --- |
| textureIndex | <code>number</code> | texture index in the range [0 .. gl.MAX_COMBINED_TEXTURE_IMAGE_UNITS - 1] |
| texture | <code>WebGLTexture</code> | webgl texture object |

<a name="module_glea..GLea+createTexture"></a>

#### gLea.createTexture(textureIndex, params)
Create a texture object

**Kind**: instance method of [<code>GLea</code>](#module_glea..GLea)  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| textureIndex | <code>number</code> | <code>0</code> |  |
| params | <code>GLeaTextureOptions</code> |  | configuration options |

<a name="module_glea..GLea+updateBuffer"></a>

#### gLea.updateBuffer(name, offset)
Update buffer data

**Kind**: instance method of [<code>GLea</code>](#module_glea..GLea)  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| name | <code>string</code> |  | name |
| offset | <code>number</code> | <code>0</code> | default: 0 |

<a name="module_glea..GLea+resize"></a>

#### gLea.resize()
Resize canvas and webgl viewport

**Kind**: instance method of [<code>GLea</code>](#module_glea..GLea)  
<a name="module_glea..GLea+use"></a>

#### gLea.use()
Use program

**Kind**: instance method of [<code>GLea</code>](#module_glea..GLea)  
<a name="module_glea..GLea+uniM"></a>

#### gLea.uniM(name, data)
Set uniform matrix

**Kind**: instance method of [<code>GLea</code>](#module_glea..GLea)  

| Param | Type | Description |
| --- | --- | --- |
| name | <code>string</code> | uniform variable name |
| data | <code>Array.&lt;number&gt;</code> | uniform float matrix |

<a name="module_glea..GLea+uniV"></a>

#### gLea.uniV(name, data)
Set uniform float vector

**Kind**: instance method of [<code>GLea</code>](#module_glea..GLea)  

| Param | Type | Description |
| --- | --- | --- |
| name | <code>string</code> | uniform variable name |
| data | <code>Array.&lt;number&gt;</code> | uniform float vector |

<a name="module_glea..GLea+uniIV"></a>

#### gLea.uniIV(name, data)
Set uniform int vector

**Kind**: instance method of [<code>GLea</code>](#module_glea..GLea)  

| Param | Type | Description |
| --- | --- | --- |
| name | <code>string</code> | uniform variable name |
| data | <code>Array.&lt;number&gt;</code> | uniform int vector |

<a name="module_glea..GLea+uni"></a>

#### gLea.uni(name, data)
Set uniform float

**Kind**: instance method of [<code>GLea</code>](#module_glea..GLea)  

| Param | Type | Description |
| --- | --- | --- |
| name | <code>string</code> | uniform variable name |
| data | <code>number</code> | data |

<a name="module_glea..GLea+uniI"></a>

#### gLea.uniI(name, data)
Set uniform int

**Kind**: instance method of [<code>GLea</code>](#module_glea..GLea)  

| Param | Type | Description |
| --- | --- | --- |
| name | <code>string</code> | uniform variable name |
| data | <code>number</code> | data |

<a name="module_glea..GLea+clear"></a>

#### gLea.clear(clearColor)
Clear screen

**Kind**: instance method of [<code>GLea</code>](#module_glea..GLea)  

| Param | Type | Default |
| --- | --- | --- |
| clearColor | <code>Float32Array.&lt;GLclampf&gt;</code> | <code></code> | 

<a name="module_glea..GLea+destroy"></a>

#### gLea.destroy()
destroys the WebGLRendering context by deleting all textures, buffers and shaders.
Additionally, it calls loseContext.
Also the canvas element is removed from the DOM and replaced by a new cloned canvas element

**Kind**: instance method of [<code>GLea</code>](#module_glea..GLea)  
<a name="module_glea..GLea.vertexShader"></a>

#### GLea.vertexShader(code)
Create a vertex shader

**Kind**: static method of [<code>GLea</code>](#module_glea..GLea)  

| Param | Type | Description |
| --- | --- | --- |
| code | <code>string</code> | shader code |

<a name="module_glea..GLea.fragmentShader"></a>

#### GLea.fragmentShader(code)
Create a fragment shader

**Kind**: static method of [<code>GLea</code>](#module_glea..GLea)  

| Param | Type | Description |
| --- | --- | --- |
| code | <code>string</code> | fragment shader code |

<a name="module_glea..GLea.buffer"></a>

#### GLea.buffer(size, data, usage, type, normalized, stride, offset)
Create Buffer

**Kind**: static method of [<code>GLea</code>](#module_glea..GLea)  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| size | <code>number</code> |  | buffer size |
| data | <code>Array.&lt;number&gt;</code> |  | buffer data |
| usage | <code>number</code> |  | usage, by default gl.STATIC_DRAW |
| type | <code>number</code> |  | data type, by default gl.FLOAT |
| normalized | <code>boolean</code> | <code>false</code> | normalize data, false |
| stride | <code>number</code> | <code>0</code> | stride, by default 0 |
| offset | <code>number</code> | <code>0</code> | offset, by default 0 |

<a name="module_glea..convertArray"></a>

### glea~convertArray(data, type)
Converts an array of number to a Float32Array or Uint8Array

**Kind**: inner method of [<code>glea</code>](#module_glea)  

| Param | Type |
| --- | --- |
| data | <code>Array.&lt;number&gt;</code> | 
| type | <code>WebGLRenderingContext.FLOAT</code> \| <code>WebGLRenderingContext.BYTE</code> | 

<a name="module_glea..shader"></a>

### glea~shader(code, shaderType)
Create shader

**Kind**: inner method of [<code>glea</code>](#module_glea)  

| Param | Type | Description |
| --- | --- | --- |
| code | <code>string</code> | the shader code |
| shaderType | <code>string</code> | frag or vert |

<a name="module_glea..GLeaTextureOptions"></a>

### glea~GLeaTextureOptions
**Kind**: inner typedef of [<code>glea</code>](#module_glea)  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| textureWrapS | <code>string</code> | default: clampToEdge |
| textureWrapT | <code>string</code> | default: clampToEdge |
| textureMinFilter | <code>string</code> | default: nearest |
| textureMagFilter | <code>string</code> | default: nearest |

