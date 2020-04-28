export class Vec2 {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }
  /**
   * Create 2D vector from Array
   * @param arr array of numbers
   */
  static fromArray(arr) {
    return new Vec2(arr[0] || 0, arr[1] || 0);
  }
  /**
   * Create vector with x = y = n
   * @param n
   */
  static fromNumber(n) {
    return new Vec2(n, n);
  }
  /**
   * clone vector
   */
  clone() {
    return new Vec2(this.x, this.y);
  }
  /**
   * add vector
   * @param otherVec addend
   * @returns addition result
   */
  add(otherVec) {
    return new Vec2(this.x + otherVec.x, this.y + otherVec.y);
  }
  /**
   * substract vector
   * @param otherVec subtrahend
   * @returns subtraction result
   */
  sub(otherVec) {
    return new Vec2(this.x - otherVec.x, this.y - otherVec.y);
  }
  /**
   * multiply vector with scalar
   * @param value scalar
   * @returns multiplication result
   */
  mul(value) {
    return new Vec2(this.x * value, this.y * value);
  }
  /**
   * divide vector with scalar
   * @param value scalar
   * @returns division result
   */
  div(value) {
    return new Vec2(this.x / value, this.y / value);
  }
  /**
   * dot product
   * @param otherVec
   */
  dot(otherVec) {
    return this.x * otherVec.x + this.y * otherVec.y;
  }
  /**
   * Check for equality
   * @param otherVec
   * @returns true if equal
   */
  equals(otherVec) {
    return this.x === otherVec.x && this.y === otherVec.y;
  }
  /**
   * Calculate length
   */
  get length() {
    return Math.sqrt(this.x ** 2 + this.y ** 2);
  }
  /**
   * Convert to array
   */
  toArray() {
    return [this.x, this.y];
  }
  /**
   * Convert to string, in the form of `(x, y)`
   */
  toString() {
    return `(${this.x}, ${this.y})`;
  }
}
export class Vec3 {
  constructor(x, y, z) {
    this.x = x;
    this.y = y;
    this.z = z;
  }
  /**
   * create vector from array
   * @param data Array containing [x, y, z]
   */
  static fromArray(data) {
    return new Vec3(data[0] || 0, data[1] || 0, data[2] || 0);
  }
  /**
   * create vector from number, using x = y = z = n
   * @param n
   */
  static fromNumber(n) {
    return new Vec3(n, n, n);
  }
  /**
   * create 3D vector from 2D vector and an optional number
   * @param vec2
   * @param z
   */
  static fromVec2(vec2, z = 0) {
    return new Vec3(vec2.x, vec2.y, z);
  }
  /**
   * clone vector
   */
  clone() {
    return new Vec3(this.x, this.y, this.z);
  }
  /**
   * add vector
   * @param otherVec addend
   * @returns new Vec3 instance containing the addition result
   */
  add(otherVec) {
    return new Vec3(
      this.x + otherVec.x,
      this.y + otherVec.y,
      this.z + otherVec.z
    );
  }
  /**
   * sub vector
   * @param otherVec subtrahend
   * @returns new Vec3 instance containing the subtraction result
   */
  sub(otherVec) {
    return new Vec3(
      this.x - otherVec.x,
      this.y - otherVec.y,
      this.z - otherVec.z
    );
  }
  /**
   * multiply vector
   * @param value factor
   * @returns new Vec3 instance containing the multiplication result
   */
  mul(value) {
    return new Vec3(this.x * value, this.y * value, this.z * value);
  }
  /**
   * divide vactor
   * @param value factor
   * @returns new Vec3 instance containing the division result
   */
  div(value) {
    return new Vec3(this.x / value, this.y / value, this.z / value);
  }
  /**
   * cross product
   * @param otherVec
   * @returns new Vec3 instance containing cross product
   */
  cross(otherVec) {
    return new Vec3(
      this.y * otherVec.z - this.z * otherVec.y,
      this.z * otherVec.x - this.x * otherVec.z,
      this.x * otherVec.y - this.y * otherVec.x
    );
  }
  /**
   * dot product
   * @param otherVec
   */
  dot(otherVec) {
    return this.x * otherVec.x + this.y * otherVec.y + this.z * otherVec.z;
  }
  /**
   * get vector length
   */
  get length() {
    return Math.sqrt(this.x ** 2 + this.y ** 2 + this.z ** 2);
  }
  /**
   * normalized vector,
   * @returns vector normalized to length = 1
   */
  get normalized() {
    return this.div(this.length);
  }
  /**
   * convert to array
   * @returns array containing [x, y, z]
   */
  toArray() {
    return [this.x, this.y, this.z];
  }
  /**
   * convert to string
   * @returns string containing `(x, y)`
   */
  toString() {
    return `(${this.x}, ${this.y}, ${this.z})`;
  }
  /**
   * check for equality
   * @param otherVec
   */
  equals(otherVec) {
    return (
      otherVec instanceof Vec3 &&
      this.x === otherVec.x &&
      this.y === otherVec.y &&
      this.z === otherVec.z
    );
  }
}
export class Vec4 {
  constructor(x, y, z, a) {
    this.x = x;
    this.y = y;
    this.z = z;
    this.a = a;
  }
  static fromArray(data) {
    return new Vec4(data[0] || 0, data[1] || 0, data[2] || 0, data[3] || 0);
  }
  static fromNumber(n) {
    return new Vec4(n, n, n, n);
  }
  toArray() {
    return [this.x, this.y, this.z, this.a];
  }
  clone() {
    return new Vec4(this.x, this.y, this.z, this.a);
  }
}
//# sourceMappingURL=vector.js.map
