(function (factory) {
  if (typeof module === 'object' && typeof module.exports === 'object') {
    var v = factory(require, exports);
    if (v !== undefined) module.exports = v;
  } else if (typeof define === 'function' && define.amd) {
    define(['require', 'exports'], factory);
  }
})(function (require, exports) {
  'use strict';
  Object.defineProperty(exports, '__esModule', { value: true });
  /**
   * create rectangle geometry
   * @param a length of side A
   * @param b length of side B
   * @param axes
   */
  function rect(sizeA, sizeB, axes) {
    const a = sizeA * 0.5;
    const b = sizeB * 0.5;
    switch (axes) {
      case 'xy':
        return [-a, -b, 0, a, -b, 0, -a, b, 0, -a, b, 0, a, -b, 0, a, b, 0];
      case 'xz':
        return [-a, 0, -b, a, 0, -b, -a, 0, b, -a, 0, b, a, 0, -b, a, 0, b];
      case 'yz':
        return [0, -a, -b, 0, a, -b, 0, -a, b, 0, -a, b, 0, a, -b, 0, a, b];
    }
  }
  exports.rect = rect;
  /**
   * Create square geometry (2 triangles) *
   * @name square
   * @param size
   */
  function square(size = 1) {
    const s = size * 0.5;
    return [-s, -s, 0, s, -s, 0, -s, s, 0, -s, s, 0, s, -s, 0, s, s, 0];
  }
  exports.square = square;
  /**
   * Create a box geometry with the sizes a * b * c,
   * centered at (0, 0, 0), 2 triangles per side.
   *
   * @name box
   * @param {number} sizeA
   * @param {number} sizeB
   * @param {number} sizeC
   */
  function box(sizeA = 1.0, sizeB = 1.0, sizeC = 1.0) {
    const a = sizeA * 0.5;
    const b = sizeB * 0.5;
    const c = sizeC * 0.5;
    const vertices = [
      [-a, -b, -c],
      [a, -b, -c],
      [-a, b, -c],
      [a, b, -c],
      [-a, -b, c],
      [a, -b, c],
      [-a, b, c],
      [a, b, c],
    ];
    //     0______1
    //   4/|____5/|
    //   |2|____|_|3
    //   |/ ____|/
    //  6       7
    const faces = [
      // back
      [0, 1, 2],
      [2, 1, 3],
      // front
      [5, 4, 7],
      [7, 4, 6],
      // left
      [4, 0, 6],
      [6, 0, 2],
      // right
      [7, 5, 1],
      [1, 7, 3],
      // top
      [1, 0, 5],
      [5, 0, 4],
      // bottom
      [2, 3, 6],
      [6, 3, 7],
    ];
    const result = faces
      .flat()
      .map((vertexIndex) => vertices[vertexIndex])
      .flat();
    return result;
  }
  exports.box = box;
  /**
   * create a cube
   * @param size
   */
  function cube(size = 1.0) {
    return box(size, size, size);
  }
  exports.cube = cube;
  /**
   * create 2D grid geometry
   * @param deltaX distance between x coordinates
   * @param deltaY distance between y coordinates
   * @param xMin minimum x coordinate
   * @param yMin minimum y coordinate
   * @param xMax maximum x coordinate
   * @param yMax maximum y coordinate
   * @returns an array of 2D coordinates [x0, y0, x1, y1, ...] for use with GL_TRIANGLES
   */
  function grid(
    deltaX = 0.1,
    deltaY = 0.1,
    xMin = -1,
    yMin = -1,
    xMax = 1,
    yMax = 1
  ) {
    const dimX = Math.round((xMax - xMin) / deltaX);
    const dimY = Math.round((yMax - yMin) / deltaY);
    /* More modelling in ASCII art :)
      
        x--x--x
        | /| /|
        |/ |/ |
        x--x--x
        | /| /|
        |/ |/ |
        x--x--x
      
        */
    const squares = Array(dimX * dimY)
      .fill(0)
      .map((_, idx) => {
        const col = idx % dimX;
        const row = (idx / dimX) | 0;
        const x0 = xMin + deltaX * col;
        const y0 = yMin + deltaY * row;
        const x1 = x0 + deltaX;
        const y1 = y0 + deltaY;
        // return two triangles per square
        return [x0, y0, x1, y0, x0, y1, x0, y1, x1, y0, x1, y1];
      });
    return squares.flat();
  }
  exports.grid = grid;
});
//# sourceMappingURL=geometry.js.map
