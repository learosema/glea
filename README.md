# GLea - GL experience artistry

GLea is a WebGL library with a minimal footprint.
It provides helper functions for creating a WebGL program, compiling shaders and passing data from JavaScript to the shader language.

There are some additional helper libraries for matrix and vector calculations as well as easing functions.

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

function loop(time) {
  const { gl } = glea;
  glea.clear();
  glea.uni('width', glea.width);
  glea.uni('height', glea.height);
  glea.uni('time', time * 0.005);
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
