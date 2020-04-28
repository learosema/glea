export declare class Vec2 {
  x: number;
  y: number;
  constructor(x: number, y: number);
  /**
   * Create 2D vector from Array
   * @param arr array of numbers
   */
  static fromArray(arr: number[]): Vec2;
  /**
   * Create vector with x = y = n
   * @param n
   */
  static fromNumber(n: number): Vec2;
  /**
   * clone vector
   */
  clone(): Vec2;
  /**
   * add vector
   * @param otherVec addend
   * @returns addition result
   */
  add(otherVec: Vec2): Vec2;
  /**
   * substract vector
   * @param otherVec subtrahend
   * @returns subtraction result
   */
  sub(otherVec: Vec2): Vec2;
  /**
   * multiply vector with scalar
   * @param value scalar
   * @returns multiplication result
   */
  mul(value: number): Vec2;
  /**
   * divide vector with scalar
   * @param value scalar
   * @returns division result
   */
  div(value: number): Vec2;
  /**
   * dot product
   * @param otherVec
   */
  dot(otherVec: Vec2): number;
  /**
   * Check for equality
   * @param otherVec
   * @returns true if equal
   */
  equals(otherVec: Vec2): boolean;
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
}
export declare class Vec3 {
  x: number;
  y: number;
  z: number;
  constructor(x: number, y: number, z: number);
  /**
   * create vector from array
   * @param data Array containing [x, y, z]
   */
  static fromArray(data: number[]): Vec3;
  /**
   * create vector from number, using x = y = z = n
   * @param n
   */
  static fromNumber(n: number): Vec3;
  /**
   * create 3D vector from 2D vector and an optional number
   * @param vec2
   * @param z
   */
  static fromVec2(vec2: Vec2, z?: number): Vec3;
  /**
   * clone vector
   */
  clone(): Vec3;
  /**
   * add vector
   * @param otherVec addend
   * @returns new Vec3 instance containing the addition result
   */
  add(otherVec: Vec3): Vec3;
  /**
   * sub vector
   * @param otherVec subtrahend
   * @returns new Vec3 instance containing the subtraction result
   */
  sub(otherVec: Vec3): Vec3;
  /**
   * multiply vector
   * @param value factor
   * @returns new Vec3 instance containing the multiplication result
   */
  mul(value: number): Vec3;
  /**
   * divide vactor
   * @param value factor
   * @returns new Vec3 instance containing the division result
   */
  div(value: number): Vec3;
  /**
   * cross product
   * @param otherVec
   * @returns new Vec3 instance containing cross product
   */
  cross(otherVec: Vec3): Vec3;
  /**
   * dot product
   * @param otherVec
   */
  dot(otherVec: Vec3): number;
  /**
   * get vector length
   */
  get length(): number;
  /**
   * normalized vector,
   * @returns vector normalized to length = 1
   */
  get normalized(): Vec3;
  /**
   * convert to array
   * @returns array containing [x, y, z]
   */
  toArray(): number[];
  /**
   * convert to string
   * @returns string containing `(x, y)`
   */
  toString(): string;
  /**
   * check for equality
   * @param otherVec
   */
  equals(otherVec: Vec3): boolean;
}
export declare class Vec4 {
  x: number;
  y: number;
  z: number;
  a: number;
  constructor(x: number, y: number, z: number, a: number);
  static fromArray(data: number[]): Vec4;
  static fromNumber(n: number): Vec4;
  toArray(): number[];
  clone(): Vec4;
}
