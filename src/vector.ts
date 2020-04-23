export class Vec2 {
  constructor(public x: number, public y: number) {}

  static fromArray(arr: number[]) {
    return new Vec2(arr[0] || 0, arr[1] || 0);
  }

  static fromNumber(n: number) {
    return new Vec2(n, n);
  }

  clone() {
    return new Vec2(this.x, this.y);
  }

  add(otherVec: Vec2) {
    return new Vec2(this.x + otherVec.x, this.y + otherVec.y);
  }

  sub(otherVec: Vec2) {
    return new Vec2(this.x - otherVec.x, this.y - otherVec.y);
  }

  mul(value: number) {
    return new Vec2(this.x * value, this.y * value);
  }

  div(value: number) {
    return new Vec2(this.x / value, this.y / value);
  }

  dot(otherVec: Vec2) {
    return this.x * otherVec.x + this.y * otherVec.y;
  }

  equals(otherVec: Vec2) {
    return this.x === otherVec.x && this.y === otherVec.y;
  }

  get length() {
    return Math.sqrt(this.x ** 2 + this.y ** 2);
  }

  toArray() {
    return [this.x, this.y];
  }

  toString() {
    return `(${this.x}, ${this.y})`;
  }
}

export class Vec3 {
  constructor(public x: number, public y: number, public z: number) {}

  static fromArray(data: number[]) {
    return new Vec3(data[0] || 0, data[1] || 0, data[2] || 0);
  }

  static fromNumber(n: number) {
    return new Vec3(n, n, n);
  }

  static fromVec2(vec2: Vec2, z: number = 0) {
    return new Vec3(vec2.x, vec2.y, z);
  }

  clone() {
    return new Vec3(this.x, this.y, this.z);
  }

  add(otherVec: Vec3) {
    return new Vec3(
      this.x + otherVec.x,
      this.y + otherVec.y,
      this.z + otherVec.z
    );
  }

  sub(otherVec: Vec3) {
    return new Vec3(
      this.x - otherVec.x,
      this.y - otherVec.y,
      this.z - otherVec.z
    );
  }

  mul(value: number) {
    return new Vec3(this.x * value, this.y * value, this.z * value);
  }

  div(value: number) {
    return new Vec3(this.x / value, this.y / value, this.z / value);
  }

  cross(otherVec: Vec3) {
    return new Vec3(
      this.y * otherVec.z - this.z * otherVec.y,
      this.z * otherVec.x - this.x * otherVec.z,
      this.x * otherVec.y - this.y * otherVec.x
    );
  }

  dot(otherVec: Vec3) {
    return this.x * otherVec.x + this.y * otherVec.y + this.z * otherVec.z;
  }

  get length() {
    return Math.sqrt(this.x ** 2 + this.y ** 2 + this.z ** 2);
  }

  get normalized() {
    return this.div(this.length);
  }

  toArray() {
    return [this.x, this.y, this.z];
  }

  toString() {
    return `(${this.x}, ${this.y}, ${this.z})`;
  }

  equals(otherVec: Vec3) {
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
