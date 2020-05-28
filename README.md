# GLea - GL experience artistry

GLea is a low-level WebGL library with a minimal footprint.
It provides helper functions for creating a WebGL program, compiling shaders and passing data from JavaScript to the shader language.

## Usage

GLea is provided as an UMD build as well as an ESM module, minified and unminified.
You can load GLea directly via script tag:

```html
<script src="https://unpkg.com/glea@1.0.1/dist/glea.umd.min.js"></script>
```

Inside a JavaScript ES module:

```js
import GLea from 'https://unpkg.com/glea@1.0.1/dist/glea.min.js';
```

Via NPM, you can install GLea via `npm i glea` and import it like this:

```js
import GLea from 'glea';
```

## Getting started

- [WebGL Fundamentals](https://webglfundamentals.org/)

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

## API Documentation

- [API documentation](https://terabaud.github.io/glea/docs/)

### using in esm modules

```js
import GLea from 'https://terabaud.github.io/glea/dist/glea.js';
```

### via script tag

```html
<script src="https://terabaud.github.io/glea/dist/umd/glea.js"></script>
```

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

### More examples

- There is more: https://terabaud.github.io/hello-webgl/
