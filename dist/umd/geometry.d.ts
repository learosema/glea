/**
 * create rectangle geometry
 * @param a length of side A
 * @param b length of side B
 * @param axes
 */
export declare function rect(
  sizeA: number,
  sizeB: number,
  axes: 'xy' | 'xz' | 'yz'
): number[];
/**
 * Create square geometry (2 triangles) *
 * @name square
 * @param size
 */
export declare function square(size?: number): number[];
/**
 * Create a box geometry with the sizes a * b * c,
 * centered at (0, 0, 0), 2 triangles per side.
 *
 * @name box
 * @param {number} sizeA
 * @param {number} sizeB
 * @param {number} sizeC
 */
export declare function box(
  sizeA?: number,
  sizeB?: number,
  sizeC?: number
): number[];
/**
 * create a cube
 * @param size
 */
export declare function cube(size?: number): number[];
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
export declare function grid(
  deltaX?: number,
  deltaY?: number,
  xMin?: number,
  yMin?: number,
  xMax?: number,
  yMax?: number
): number[];
