export declare class Mat {
  values: number[];
  numRows: number;
  numCols: number;
  constructor(...values: (string | number)[]);
  toArray(): (string | number)[];
  static fromArray(values: (string | number)[]): Mat;
  valueAt(row: number, column: number): number;
  colAt(column: number): number[];
  rowAt(row: number): number[];
  equals(otherMatrix: Mat): boolean;
  add(otherMatrix: Mat): Mat;
  sub(otherMatrix: Mat): Mat;
  mul(param: Mat | number): Mat;
  toString(): string;
}
export declare class Mat2 extends Mat {
  constructor(...values: number[]);
  toArray(): number[];
  static fromArray(values: number[]): Mat2;
  /**
   * create identity matrix
   */
  static identity(): Mat2;
  /**
   * create rotation matrix
   * @param angle angle in radians
   */
  static rotation(angle: number): Mat2;
  static scaling(sx: number, sy: number): Mat2;
  determinant(): number;
  toString(): string;
}
export declare class Mat3 extends Mat {
  constructor(...values: number[]);
  /**
   * convert to array
   */
  toArray(): number[];
  /**
   * create from array
   * @param values array of values
   */
  static fromArray(values: number[]): Mat4;
  /**
   * create identity matrix
   */
  static identity(): Mat3;
  /**
   * create translation matrix
   * @param x translation in x-direction
   * @param y translation in y-direction
   * @returns 3x3 translation matrix
   */
  static translation(x: number, y: number): Mat3;
  /**
   * create scaling matrix
   * @param sx
   * @param sy
   * @param sz
   * @returns 3x3 scale matrix
   */
  static scaling(sx: number, sy: number, sz: number): Mat3;
  static rotX(angle: number): Mat3;
  static rotY(angle: number): Mat3;
  static rotZ(angle: number): Mat4;
}
export declare class Mat4 extends Mat {
  constructor(...values: number[]);
  toArray(): number[];
  static fromArray(values: number[]): Mat4;
  static identity(): Mat4;
  static translation(x: number, y: number, z: number): Mat4;
  static scaling(sx: number, sy: number, sz: number): Mat4;
  static rotX(angle: number): Mat4;
  static rotY(angle: number): Mat4;
  static rotZ(angle: number): Mat4;
}
