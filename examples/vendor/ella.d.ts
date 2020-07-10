declare module 'vector' {
  export class Vec {
    readonly values: number[];
    constructor(...values: number[]);
    get dim(): number;
    get x(): number;
    get y(): number;
    get z(): number;
    get w(): number;
    get xy(): Vec;
    get xz(): Vec;
    get yz(): Vec;
    get xyz(): Vec;
    /**
     * Create vector from Array
     * @param arr array of numbers
     */
    static fromArray(arr: number[]): Vec;
    /**
     * Create vector with x = y = n
     * @param n the number
     * @param dim the dimension
     */
    static fromNumber(n: number, dim: number): Vec;
    /**
     * clone vector
     */
    clone(): Vec;
    /**
     * add vector
     * @param otherVec addend
     * @returns addition result
     */
    add(otherVec: Vec): Vec;
    /**
     * subtract vector
     * @param otherVec addend
     * @returns subtraction result
     */
    sub(otherVec: Vec): Vec;
    /**
     * multiply vector with scalar
     * @param value scalar
     * @returns multiplication result
     */
    mul(value: number): Vec;
    /**
     * divide vector with scalar
     * @param value scalar
     * @returns multiplication result
     */
    div(value: number): Vec;
    /**
     * dot product
     * @param otherVec
     */
    dot(otherVec: Vec): number;
    /**
     * check for equality
     * @param otherVec
     */
    equals(otherVec: Vec): boolean;
    /**
     * Calculate length
     */
    get length(): number;
    /**
     * Convert to array
     */
    toArray(): number[];
    /**
     * Convert to string, in the form of `(x, y)`
     */
    toString(): string;
    /**
     * cross product
     * @param otherVec
     * @returns new Vec3 instance containing cross product
     */
    cross(otherVec: Vec): Vec;
    /**
     * normalized vector,
     * @returns vector normalized to length = 1
     */
    get normalized(): Vec;
  }
}
declare module 'matrix' {
  import { Vec } from 'vector';
  /** @class Mat */
  export class Mat {
    values: number[];
    numRows: number;
    numCols: number;
    constructor(
      values: number[],
      options?: {
        numRows: number;
        numCols: number;
      }
    );
    /**
     * create identity matrix
     * @param dimension dimension of the matrix
     */
    static identity(dimension: number): Mat;
    /**
     * Converts a vector with dimension n into a matrix with 1 col and n rows
     * useful for matrix multiplication
     * @param value the input vector
     */
    static fromVector(value: Vec): Mat;
    /**
     * Converts a bunch of vectors into a matrix
     */
    static fromVectors(vectors: Vec[]): Mat;
    /**
     * convert to array
     */
    toArray(): number[];
    /**
     * get value at a given position
     * @param row row index starting from 0
     * @param column column index starting from 0
     */
    valueAt(row: number, column: number): number;
    /**
     * get column at a given index
     * @param column index of column starting from 0
     * @returns column as an array of numbers
     */
    colAt(column: number): number[];
    /**
     * get row at a given index
     * @param row index of row starting from 0
     * @returns row as an array of numbers
     */
    rowAt(row: number): number[];
    /**
     * returns transposed matrix
     */
    transpose(): Mat;
    /**
     * check for equality
     * @param otherMatrix matrix to compare
     * @returns true or false
     */
    equals(otherMatrix: Mat): boolean;
    /**
     * add two matrices
     * @param otherMatrix matrix to add
     * @returns result matrix
     */
    add(otherMatrix: Mat): Mat;
    /**
     * subtract another matrix
     * @param otherMatrix matrix to subtract
     * @returns result matrix
     */
    sub(otherMatrix: Mat): Mat;
    /**
     * matrix multiplication
     * @param param can be a matrix, a number or a vector
     * @returns a vector in case of matrix vector multiplication, else a matrix
     * @throws dimension Mismatch if dimensions doesn't match
     */
    mul(param: Mat | number | Vec): Mat | Vec;
    /**
     * calculate determinant
     */
    determinant(): number;
    /**
     * convert matrix to string
     * @returns a string containing matROWSxCOLS(comma-separated-values)
     */
    toString(): string;
  }
  export const Mat2: {
    /**
     * create rotation matrix
     * @param angle angle in radians
     */
    rotation(angle: number): Mat;
    /**
     * create scaling matrix
     * @param sx X-scale factor
     * @param sy Y-scale factor
     */
    scaling(sx: number, sy: number): Mat;
  };
  export const Mat3: {
    /**
     * create translation matrix
     * @param x translation in x-direction
     * @param y translation in y-direction
     * @returns 3x3 translation matrix
     */
    translation(x: number, y: number): Mat;
    /**
     * create scaling matrix
     * @param sx scale X factor
     * @param sy scale Y factor
     * @param sz scale Z factor
     * @returns 3x3 scale matrix
     */
    scaling(sx: number, sy: number, sz: number): Mat;
    /**
     * create X-rotation matrix
     * @param angle rotation in radians
     */
    rotX(angle: number): Mat;
    /**
     * create Y-rotation matrix
     * @param angle angle in radians
     */
    rotY(angle: number): Mat;
    /**
     * create Z-rotation matrix
     * @param angle angle in radians
     */
    rotZ(angle: number): Mat;
  };
  export const Mat4: {
    /**
     * create 4x4 identity matrix
     */
    identity(): Mat;
    /**
     * create translation matrix
     * @param x translation in X direction
     * @param y translation in Y direction
     * @param z translation in Z direction
     */
    translation(x: number, y: number, z: number): Mat;
    /**
     * create scaling matrix
     * @param sx X-scale factor
     * @param sy Y-scale factor
     * @param sz Z-scale factor
     */
    scaling(sx: number, sy: number, sz: number): Mat;
    /**
     * create x-rotation matrix
     * @param angle angle in radians
     */
    rotX(angle: number): Mat;
    /**
     * create y-rotation matrix
     * @param angle angle in radians
     */
    rotY(angle: number): Mat;
    /**
     * create z-rotation matrix
     * @param angle angle in radians
     */
    rotZ(angle: number): Mat;
  };
}
declare module 'lookat' {
  import { Vec } from 'vector';
  import { Mat } from 'matrix';
  /**
   * Create a view matrix
   * @param eye position of the eye is (where you are)
   * @param center position where you want to look at
   * @param up it's a normalized vector, quite often (0,1,0)
   * @returns view matrix
   * @see https://www.khronos.org/opengl/wiki/GluLookAt_code
   */
  export function lookAt(eye: Vec, center: Vec, up: Vec): Mat;
}
declare module 'perspective' {
  import { Mat } from 'matrix';
  /**
   * creates a transformation that produces a parallel projection
   * @param left coordinate for the left vertical clipping planes.
   * @param right coordinate for the right vertical clipping planes.
   * @param bottom coordinate for the bottom horizontal clippling pane.
   * @param top coordinate for the top horizontal clipping pane
   * @param zNear Specify the distances to the nearer and farther depth clipping planes. These values are negative if the plane is to be behind the viewer.
   * @param zFar Specify the distances to the nearer and farther depth clipping planes. These values are negative if the plane is to be behind the viewer.
   * @returns 4x4 orthographic transformation matrix
   * @see https://www.khronos.org/registry/OpenGL-Refpages/gl2.1/xhtml/glOrtho.xml
   */
  export function ortho(
    left: number,
    right: number,
    bottom: number,
    top: number,
    zNear: number,
    zFar: number
  ): Mat;
  /**
   * creates a perspective matrix that produces a perspective projection
   * @param left coordinates for the vertical left clipping pane
   * @param right coordinates for the vertical right clipping pane
   * @param bottom coordinates for the horizontal bottom clipping pane
   * @param top coodinates for the top horizontal clipping pane
   * @param zNear Specify the distances to the near depth clipping plane. Must be positive.
   * @param zFar Specify the distances to the far depth clipping planes. Must be positive.
   * @returns 4x4 perspective projection matrix
   * @see https://www.khronos.org/registry/OpenGL-Refpages/gl2.1/xhtml/glFrustum.xml
   */
  export function frustum(
    left: number,
    right: number,
    bottom: number,
    top: number,
    zNear: number,
    zFar: number
  ): Mat;
  /**
   * creates a perspective projection matrix
   * @param fieldOfView Specifies the field of view angle, in degrees, in the y direction.
   * @param aspectRatio Specifies the aspect ratio that determines the field of view in the x direction. The aspect ratio is the ratio of x (width) to y (height).
   * @param zNear Specifies the distance from the viewer to the near clipping plane (always positive).
   * @param zFar Specifies the distance from the viewer to the far clipping plane (always positive).
   * @returns 4x4 perspective projection matrix
   */
  export function perspective(
    fieldOfView: number,
    aspectRatio: number,
    zNear: number,
    zFar: number
  ): Mat;
}
declare module 'geometry' {
  import { Vec } from 'vector';
  /** @class Geometry */
  export class Geometry {
    vertices: Vec[];
    faces: number[][];
    normals: Vec[];
    texCoords: Vec[];
    constructor(
      vertices: Vec[],
      faces: number[][],
      normals: Vec[],
      texCoords: Vec[]
    );
    /**
     * converts to triangle array
     */
    toTriangles(): number[];
    /**
     * Calculate the surface normal of a triangle
     * @param p1 3d vector of point 1
     * @param p2 3d vector of point 2
     * @param p3 3d vector of point 3
     */
    static calculateSurfaceNormal(p1: Vec, p2: Vec, p3: Vec): Vec;
    /**
     * Create a box geometry with the sizes a * b * c,
     * centered at (0, 0, 0), 2 triangles per side.
     *
     * @name box
     * @param {number} sizeA
     * @param {number} sizeB
     * @param {number} sizeC
     */
    static box(sizeA?: number, sizeB?: number, sizeC?: number): Geometry;
    /**
     * create a cube
     * @param size
     */
    static cube(size?: number): Geometry;
    /**
     * create a plane grid mesh
     * @param x x-coord of the top left corner
     * @param y y-coord of the top left corner
     * @param width width of the plane
     * @param height height of the plane
     * @param rows number of rows
     * @param cols number of columns
     */
    static grid(
      x: number,
      y: number,
      width: number,
      height: number,
      rows: number,
      cols: number
    ): Geometry;
    /**
     * Create sphere geometry
     * @param r radius
     * @param sides number of sides (around the sphere)
     * @param segments number of segments (from top to bottom)
     * @see adapted from https://vorg.github.io/pex/docs/pex-gen/Sphere.html
     */
    static sphere(r?: number, sides?: number, segments?: number): Geometry;
  }
}
declare module 'ella' {
  import { Vec } from 'vector';
  import { Mat, Mat2, Mat3, Mat4 } from 'matrix';
  import { lookAt } from 'lookat';
  import { perspective, frustum, ortho } from 'perspective';
  import { Geometry } from 'geometry';
  export {
    Vec,
    Mat,
    Mat2,
    Mat3,
    Mat4,
    Geometry,
    perspective,
    frustum,
    ortho,
    lookAt,
  };
}
