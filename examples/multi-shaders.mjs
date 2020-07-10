///<reference path="vendor/ella.d.ts"/>

import GLea from '../dist/glea.js';
import * as Ella from './vendor/ella.esm.js';

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

const vert2 = `
precision highp float;
attribute vec3 position;

`;

class App {
  constructor() {
    this.projectionMat = Ella.Mat4.identity();
    this.viewMat = Ella.Mat4.identity();
    this.cube = Ella.cube();
    this.loop = this.loop.bind(this);
  }

  setProjectionMatrix() {
    const w = document.body.clientWidth;
    const h = document.body.clientHeight;
    this.projectionMat = Ella.perspective(60, w / h, 0.1, 300);
  }

  init() {
    const cube = Ella.Geometry.cube(1);
    const cubeTriangles = cube.toTriangles();
    this.setProjectionMatrix();
    this.prg1 = new GLea({
      shaders: [GLea.vertexShader(), GLea.fragmentShader(frag)],
    }).create();
    this.prg2 = this.program1.add({
      shaders: [GLea.vertexShader(vert2), GLea.fragmentShader(frag2)],
      buffers: {
        // create a position attribute bound
        // to a buffer with 4 2D coordinates
        position: GLea.buffer(3, cubeTriangles),
      },
    });
  }

  loop() {
    const { gl, width, height } = this.prg1;
    prg1.clear();
    prg1.uniV('resolution', [width, height]);
    prg1.uni('time', time * 1e-3);
    gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
    requestAnimationFrame(loop);
  }
}

function setup() {
  const { gl } = glea;
  window.addEventListener('resize', () => {
    glea.resize();
  });
  loop(0);
}

setup();
