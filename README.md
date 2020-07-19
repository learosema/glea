# GLea - GL experience artistry

GLea is a low-level WebGL library with a minimal footprint.
It provides helper functions for creating a WebGL program, compiling shaders and passing data from JavaScript to the shader language.

## Introduction

There are several options to embed GLea into your project. You can load GLea directly via script tag:

```html
<script src="https://unpkg.com/glea@1.0.1/dist/glea.umd.min.js"></script>
```

Inside a JavaScript ES module:

```js
import GLea from 'https://unpkg.com/glea@1.0.1/dist/glea.min.js';
```

Or via NPM, you can install GLea via `npm i glea` and import it like this:

```js
import GLea from 'glea';
```

### Initialization

By default, GLea looks for a canvas element in your HTML and uses that. If there is no canvas element existing, GLea creates one for you.

If your HTML document doesn't include any CSS (neither a `style` nor a `link` tag, a minimal stylesheet is provided that sizes the canvas to the browser's viewport size.

The GLea instance expects a shaders property, containing your fragment and vertex shader.
Also, a buffers property, which contains the data that is passed as attributes to the vertex shader.

If no buffers are provided, GLea provides a default position attribute with a buffer containing 4 vec2 values for a triangle strip, defining a plane filling the screen.

### Setting uniforms

GLea provides several helper functions to set uniforms to pass data from JavaScript to GLSL. These are:

```js
// set uniform float
glea.uni('pi', Math.PI);

// set uniform int
glea.uniI('width', innerWidth);

// set uniform float vector (supported types are vec2, vec3, vec4)
glea.uniV('vector', [Math.sqrt(2), Math.sqrt(3)]);

// set uniform int vector
glea.uniV('resolution', [innerWidth, innerHeight]);

// set uniform matrix
// HEADS UP: it is the other way round as you would write it down on paper
// prettier-ignore
glea.uniM('translateMatrix', [
  1, 0, 0, 0, // column 1
  0, 1, 0, 0, // column 2
  0, 0, 1, 0, // column 3
  x, y, z, 1, // column 4
]);
```

### Draw

GLea provides a wrapper to [drawArrays](https://developer.mozilla.org/en-US/docs/Web/API/WebGLRenderingContext/drawArrays) from the underlying WebGLRenderingContext. It works exactly like the original drawArrays function, but if you don't provide any vertex count, it is determined
automatically from the buffers.

```js
const { gl } = glea;

glea.drawArrays(gl.TRIANGLE_STRIP);

// The same as:
const numVertices = 4;
glea.gl.drawArrays(gl.TRIANGLE_STRIP, 0, numVertices);
```

### Multiple programs and switching

GLea supports multiple programs.

```js
const prg1 = new GLea({
  shaders: [GLea.vertexShader(vert), GLea.fragmentShader(frag)],
}).create();

const prg2 = prg1.add({
  shaders: [GLea.vertexShader(vert2), GLea.fragmentShader(frag2)],
  buffers: {
    position: GLea.buffer(3, Ella.Geometry.sphere(0.25, 32, 16).toTriangles()),
  },
});
```

The the main instance `prg1` and its child `prg2` use the same underlying WebGLRenderingContext.
In the example `prg1` renders a plane geometry (GLea provides a `position` attribute with a plane geometry by default),
and `prg2` provides a sphere geometry. The sphere geometry is provided by [ella-math](https://github.com/terabaud/ella-math).

In the draw loop, the switching between programs is done via `enableAttribs` and `disableAttribs`:

```js
// Shader 1 does the background animation
prg1.gl.disable(gl.DEPTH_TEST);
prg1.enableAttribs();
prg1.uniV('resolution', [width, height]);
prg1.uni('time', time * 1e-3);
prg1.drawArrays(gl.TRIANGLE_STRIP);
prg1.disableAttribs();

// Shader 2 renders a sphere
gl.enable(gl.DEPTH_TEST);
prg2.enableAttribs();
prg2.uniV('resolution', [width, height]);
prg2.uni('time', time * 1e-3);
prg2.uniM('uPM', this.projectionMat.toArray());
prg2.uniM('uVM', this.viewMat.toArray());
prg2.drawArrays(gl.TRIANGLES);
prg2.disableAttribs();
```

[Full example](https://codepen.io/terabaud/pen/wvMQQyr)

### Loading textures

I'm using a loadImage helper function that wraps `img.onload` into a Promise:

```js
function loadImage(url) {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = 'Anonymous';
    img.src = url;
    img.onload = () => {
      resolve(img);
    };
    img.onerror = () => {
      reject(img);
    };
  });
}

async function setup() {
  const img = await loadImage('https://placekitten.com/256/256/');
  const textureIndex = 0;
  glea.createTexture(textureIndex);
  glea.gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, img);
  glea.uniI('texture0', textureIndex);
}

setup();
```

In GLSL, you can access the texture like this:

```glsl
uniform sampler2D texture0;

void main() {
  vec2 coord = 1.0 - gl_FragCoord.xy / vec2(width, height);
  gl_FragColor = texture2D(texture1, coord);
}
```

## Example

```js
import GLea from 'https://unpkg.com/glea@1.0.1/dist/glea.min.js';

const vert = `
precision highp float;
attribute vec2 position;

void main() {
  gl_Position = vec4(position, 0, 1.0);
}
`;

const frag = `
precision highp float;
uniform float time;
uniform vec2 resolution;

void main() {
  float vmin = min(resolution.y, resolution.x);
  vec2 p = (gl_FragCoord.xy - .5 * resolution) / vmin;
  float r = .5 + .5 * sin(5. * log(length(p)) - time * 1.2);
  float g = .5 + .5 * sin(5. * log(length(p)) + sin(time + 2. * p.x));  
  float b = .5 + .5 * sin(.2 + 5. * log(length(p)) + sin(time * .4 + 4. * p.y));
  gl_FragColor = vec4(r, g, b, 1.);
}
`;

const glea = new GLea({
  shaders: [GLea.fragmentShader(frag), GLea.vertexShader(vert)],
  buffers: {
    // create a position attribute bound
    // to a buffer with 4 2D coordinates
    // this is what GLea provides by default if you omit buffers in the constructor
    position: GLea.buffer(2, [1, 1, -1, 1, 1, -1, -1, -1]),
  },
}).create();

function loop(time) {
  const { gl, width, height } = glea;
  glea.clear();
  glea.uniV('resolution', [width, height]);
  glea.uni('time', time * 1e-3);
  gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
  requestAnimationFrame(loop);
}

function setup() {
  const { gl } = glea;
  window.addEventListener('resize', () => {
    glea.resize();
  });
  loop(0);
}

setup();
```

- [Try this on Codepen](https://codepen.io/terabaud/pen/PoPJqvM)

## Exampes

- [Example 01: Triangle](https://codepen.io/terabaud/pen/OKVpYV)
- [Example 02: Full screen plane](https://codepen.io/terabaud/pen/eqNjjY)
- [Example 03: Cube](https://codepen.io/terabaud/pen/EqgpbQ)
- [Example 04: Circle Heart Morph](https://codepen.io/terabaud/pen/BaNRbXL)
- [Example 05: Rotating heart yin yang morph pattern](https://codepen.io/terabaud/pen/VwLbVjE)
- [Example 06: Fun with circles](https://codepen.io/terabaud/pen/xxGdeEe)
- [Example 07: Retro Style Dither Cam](https://codepen.io/terabaud/pen/WNvoOgK)
- [Example 08: Signed Distance Field Symmetric Diff](https://codepen.io/terabaud/pen/dyoXjVv)
- [Example 09: Hypnotizing Cyclone 2.0](https://codepen.io/terabaud/pen/PowKxNp)
- [Example 10: Hypnotizing Cyclone 3.0](https://codepen.io/terabaud/pen/bGNMGvb)
- [Example 11: numeric spiral](https://codepen.io/terabaud/pen/poogqxq)
- [Example 12: Evil virus](https://codepen.io/terabaud/pen/ZgreLo)
- [Example 13: Halftone Circles](https://codepen.io/terabaud/pen/BajJbgd)

### More examples

- There is more: https://terabaud.github.io/hello-webgl/

## Additional WebGL resources

- [WebGL Fundamentals](https://webglfundamentals.org/)
- [WebGL 2 Fundamentals](https://webgl2fundamentals.org/)
