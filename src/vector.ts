export class Vec2 {
  constructor(public x: number, public y: number) {}

  /**
   * Create 2D vector from Array
   * @param arr array of numbers
   */
  static fromArray(arr: number[]): Vec2 {
    return new Vec2(arr[0] || 0, arr[1] || 0);
  }

  /**
   * Create vector with x = y = n
   * @param n
   */
  static fromNumber(n: number): Vec2 {
    return new Vec2(n, n);
  }

  /**
   * clone vector
   */
  clone(): Vec2 {
    return new Vec2(this.x, this.y);
  }

  /**
   * add vector
   * @param otherVec addend
   * @returns addition result
   */
  add(otherVec: Vec2): Vec2 {
    return new Vec2(this.x + otherVec.x, this.y + otherVec.y);
  }

  /**
   * substract vector
   * @param otherVec subtrahend
   * @returns subtraction result
   */
  sub(otherVec: Vec2): Vec2 {
    return new Vec2(this.x - otherVec.x, this.y - otherVec.y);
  }

  /**
   * multiply vector with scalar
   * @param value scalar
   * @returns multiplication result
   */
  mul(value: number): Vec2 {
    return new Vec2(this.x * value, this.y * value);
  }

  /**
   * divide vector with scalar
   * @param value scalar
   * @returns division result
   */
  div(value: number): Vec2 {
    return new Vec2(this.x / value, this.y / value);
  }

  /**
   * dot product
   * @param otherVec
   */
  dot(otherVec: Vec2): number {
    return this.x * otherVec.x + this.y * otherVec.y;
  }

  /**
   * Check for equality
   * @param otherVec
   * @returns true if equal
   */
  equals(otherVec: Vec2): boolean {
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
  constructor(public x: number, public y: number, public z: number) {}

  /**
   * create vector from array
   * @param data Array containing [x, y, z]
   */
  static fromArray(data: number[]): Vec3 {
    return new Vec3(data[0] || 0, data[1] || 0, data[2] || 0);
  }

  /**
   * create vector from number, using x = y = z = n
   * @param n
   */
  static fromNumber(n: number): Vec3 {
    return new Vec3(n, n, n);
  }

  /**
   * create 3D vector from 2D vector and an optional number
   * @param vec2
   * @param z
   */
  static fromVec2(vec2: Vec2, z: number = 0): Vec3 {
    return new Vec3(vec2.x, vec2.y, z);
  }

  /**
   * clone vector
   */
  clone(): Vec3 {
    return new Vec3(this.x, this.y, this.z);
  }

  /**
   * add vector
   * @param otherVec addend
   * @returns new Vec3 instance containing the addition result
   */
  add(otherVec: Vec3): Vec3 {
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
  sub(otherVec: Vec3): Vec3 {
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
  mul(value: number): Vec3 {
    return new Vec3(this.x * value, this.y * value, this.z * value);
  }

  /**
   * divide vactor
   * @param value factor
   * @returns new Vec3 instance containing the division result
   */
  div(value: number): Vec3 {
    return new Vec3(this.x / value, this.y / value, this.z / value);
  }

  /**
   * cross product
   * @param otherVec
   * @returns new Vec3 instance containing cross product
   */
  cross(otherVec: Vec3): Vec3 {
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
  dot(otherVec: Vec3): number {
    return this.x * otherVec.x + this.y * otherVec.y + this.z * otherVec.z;
  }

  /**
   * get vector length
   */
  get length(): number {
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
  toArray(): number[] {
    return [this.x, this.y, this.z];
  }

  /**
   * convert to string
   * @returns string containing `(x, y)`
   */
  toString(): string {
    return `(${this.x}, ${this.y}, ${this.z})`;
  }

  /**
   * check for equality
   * @param otherVec
   */
  equals(otherVec: Vec3): boolean {
    return (
      otherVec instanceof Vec3 &&
      this.x === otherVec.x &&
      this.y === otherVec.y &&
      this.z === otherVec.z
    );
  }
}

export class Vec4 {
  constructor(
    public x: number,
    public y: number,
    public z: number,
    public a: number
  ) {}

  static fromArray(data: number[]) {
    return new Vec4(data[0] || 0, data[1] || 0, data[2] || 0, data[3] || 0);
  }

  static fromNumber(n: number) {
    return new Vec4(n, n, n, n);
  }

  toArray() {
    return [this.x, this.y, this.z, this.a];
  }

  clone() {
    return new Vec4(this.x, this.y, this.z, this.a);
  }
}
