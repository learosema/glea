/**
 * Create a square (2 triangles)
 *
 * @name square
 * @param {number} size
 */
export function square(size = 1) {
  const s = size * 0.5;
  return [-s, -s, 0, s, -s, 0, -s, s, 0, -s, s, 0, s, -s, 0, s, s, 0];
}

/**
 * Create a box with the sizes a * b * c,
 * centered at (0, 0, 0), 2 triangles per side.
 *
 * @name box
 * @param {number} sizeA
 * @param {number} sizeB
 * @param {number} sizeC
 */
export function box(sizeA = 1.0, sizeB = 1.0, sizeC = 1.0) {
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

export function cube(size = 1.0) {
  return box(size, size, size);
}
