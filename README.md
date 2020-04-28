# GLea - GL experience artistry

GLea is a WebGL library with a minimal footprint.
It provides helper functions for creating a WebGL program, compiling shaders and passing data from JavaScript to the shader language.

There are some optional helper libraries for matrix and vector calculations.

## Usage

```
import GLea from 'glea.esm.js';

const glea = new GLea({
  shaders: [
    GLea.fragmentShader(frag),
    GLea.vertexShader(vert)
  ],
  buffers: {
    position: Glea.buffer(2, [1, 1, 1, 0, 0, 0])
  }
}).create();
```

### Options

- `canvas`: optional, if not specified, `document.querySelector('canvas')` is used
- `gl`: optional, if not specified, `canvas.getContext(contextType)` is used
- `contextType`: optional, default `webgl` (or `experimental-webgl`, you don't need to prefix it yourself)
- `glOptions`: additional options to pass to `canvas.getContext`
- `shaders`: array that takes a fragmentShader and a vertexShader in the above form
- `buffers`: an object with attributes and buffers. You can access the buffers via an attribute named as the Object keys.

### Properties

- `glea.gl`: the `WebGLRenderingContext`
- `glea.width`: viewport width
- `glea.height`: viewport height

### Methods

- `glea.create()` - creates the WebGLRenderingContext, compiles and links shaders, registers attributes and buffers.
- `glea.resize()` - resizes the WebGL viewport to the current canvas client size. Call this inside a `resize` event listener.
