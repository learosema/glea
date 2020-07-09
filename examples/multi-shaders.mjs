import GLea from '../dist/glea.js';
import * as Ella from 'https://unpkg.com/ella-math@0.2.5/dist/ella.esm.js';

// work in progress...

class App {
  constructor() {
    this.setProjectionMatrix();
    this.loop = this.loop.bind(this);
  }

  setProjectionMatrix() {
    const w = document.body.clientWidth;
    const h = document.body.clientHeight;
    this.perspectiveMat = Ella.perspective(60, w / h, 0.1, 300);
  }

  init() {
    // too
  }

  loop() {}
}

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
