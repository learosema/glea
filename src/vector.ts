export class Vec2 {
  constructor(public x: number, public y: number) {}

  static fromArray(arr: [number, number]) {
    return new Vec2(arr[0], arr[1]);
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

  static fromArray(data: [number, number, number]) {
    return new Vec3(data[0], data[1], data[2]);
  }

  static fromNumber(n: number) {
    return new Vec3(n, n, n);
  }

  static fromVec2(vec2: Vec2, z: number = 0) {
    return new Vec3(vec2.x, vec2.y, z);
  }

  get xy() {
    return new Vec2(this.x, this.y);
  }

  get xz() {
    return new Vec2(this.x, this.z);
  }

  get yx() {
    return new Vec2(this.y, this.x);
  }

  get yz() {
    return new Vec2(this.y, this.z);
  }

  get zx() {
    return new Vec2(this.z, this.x);
  }

  get zy() {
    return new Vec2(this.z, this.y);
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

  static fromArray(data: [number, number, number, number]) {
    return new Vec4(data[0], data[1], data[2], data[3]);
  }

  static fromNumber(n: number) {
    return new Vec4(n, n, n, n);
  }

  get xyz() {
    return new Vec3(this.x, this.y, this.z);
  }

  get zyx() {
    return new Vec3(this.z, this.y, this.x);
  }

  get zxy() {
    return new Vec3(this.z, this.x, this.y);
  }

  get xy() {
    return new Vec2(this.x, this.y);
  }

  get xz() {
    return new Vec2(this.x, this.z);
  }

  get yz() {
    return new Vec2(this.y, this.z);
  }

  get yx() {
    return new Vec2(this.y, this.x);
  }

  get zx() {
    return new Vec2(this.z, this.x);
  }

  get zy() {
    return new Vec2(this.z, this.y);
  }

  clone() {
    return new Vec4(this.x, this.y, this.z, this.a);
  }
}
