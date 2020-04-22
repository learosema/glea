export class Vec2 {
  constructor(x, y) {
    if (arguments.length === 0) {
      this.x = this.y = 0;
      return;
    }
    if (arguments.length === 1) {
      if (typeof x === 'number') {
        this.x = this.y = x;
        return;
      }
      if (x instanceof Vec2) {
        this.x = x.x;
        this.y = x.y;
        return;
      }
      if (x instanceof Array) {
        this.x = x[0] || 0;
        this.y = x[1] || 0;
        return;
      }
    }
    if (typeof x === 'number' && typeof y === 'number') {
      this.x = x;
      this.y = y;
      return;
    }
    throw Error('ArgumentError');
  }

  add(otherVec) {
    return new Vec2(this.x + otherVec.x, this.y + otherVec.y);
  }

  sub(otherVec) {
    return new Vec2(this.x - otherVec.x, this.y - otherVec.y);
  }

  mul(value) {
    return new Vec2(this.x * value, this.y * value);
  }

  div(value) {
    return new Vec2(this.x / value, this.y / value);
  }

  dot(otherVec) {
    return this.x * otherVec.x + this.y * otherVec.y;
  }

  equals(otherVec) {
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
  constructor(x, y, z) {
    if (arguments.length === 1) {
      if (typeof x === 'number') {
        this.x = this.y = this.z = x;
        return;
      }
      if (typeof x === 'object') {
        if (x instanceof Vec3) {
          this.x = x.x;
          this.y = x.y;
          this.z = x.z;
          return;
        }
        if (x instanceof Vec2) {
          this.x = x.x;
          this.y = x.y;
          this.z = 0;
          return;
        }
        if (x instanceof Array) {
          this.x = x[0] || 0;
          this.y = x[1] || 0;
          this.z = x[2] || 0;
          return;
        }
      }
      throw Error('ArgumentError');
    }
    if (arguments.length === 2) {
      if (typeof x === 'number' && typeof y === 'number') {
        this.x = x;
        this.y = y;
        this.z = 0;
        return;
      }
      if (x instanceof Vec2 && typeof y === 'number') {
        this.x = x.x;
        this.y = x.y;
        this.z = y;
        return;
      }
      if (typeof x === 'number' && y instanceof Vec2) {
        this.x = x;
        this.y = y.x;
        this.z = y.y;
        return;
      }
      throw Error('ArgumentError');
    }
    if (arguments.length === 3) {
      if (
        typeof x === 'number' &&
        typeof y === 'number' &&
        typeof z === 'number'
      ) {
        this.x = x;
        this.y = y;
        this.z = z;
        return;
      }
      throw Error('ArgumentError');
    }
  }

  get r() {
    return this.x;
  }

  set r(value) {
    this.x = value;
  }

  get g() {
    return this.y;
  }

  set g(value) {
    this.y = value;
  }

  get b() {
    return this.z;
  }

  set b(value) {
    this.z = value;
  }

  get xy() {
    return new Vec2(this.x, this.y);
  }

  get yz() {
    return new Vec2(this.y, this.z);
  }

  get xz() {
    return new Vec2(this.x, this.z);
  }

  add(otherVec) {
    return new Vec3(
      this.x + otherVec.x,
      this.y + otherVec.y,
      this.z + otherVec.z
    );
  }

  sub(otherVec) {
    return new Vec3(
      this.x - otherVec.x,
      this.y - otherVec.y,
      this.z - otherVec.z
    );
  }

  mul(value) {
    return new Vec3(this.x * value, this.y * value, this.z * value);
  }

  div(value) {
    return new Vec3(this.x / value, this.y / value, this.z / value);
  }

  cross(otherVec) {
    return new Vec3(
      this.y * otherVec.z - this.z * otherVec.y,
      this.z * otherVec.x - this.x * otherVec.z,
      this.x * otherVec.y - this.y * otherVec.x
    );
  }

  dot(otherVec) {
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
    if (arguments.length === 1) {
      if (typeof x === 'number') {
        this.x = x;
        this.y = y;
        this.z = z;
        this.a = a;
        return;
      }
      throw Error('ArgumentError');
    }
    if (arguments.length === 2) {
      if (x instanceof Vec3 && typeof y === 'number') {
        this.x = x.x;
        this.y = x.y;
        this.z = x.z;
        this.a = y;
        return;
      }
      throw Error('ArgumentError');
    }
    if (arguments.length === 3) {
      if (
        typeof x === 'number' &&
        typeof y === 'number' &&
        typeof z === 'number'
      ) {
        this.x = x;
        this.y = y;
        this.z = z;
        this.a = 0;
        return;
      }
      throw Error('ArgumentError');
    }
    if (arguments.length === 4) {
      if (
        typeof x === 'number' &&
        typeof y === 'number' &&
        typeof z === 'number' &&
        typeof a === 'number'
      ) {
        this.x = x;
        this.y = y;
        this.z = z;
        this.a = a;
        return;
      }
      throw Error('ArgumentError');
    }
    throw Error('ArgumentError');
  }

  get r() {
    return this.x;
  }

  set r(value) {
    this.x = value;
  }

  get g() {
    return this.y;
  }

  set g(value) {
    this.y = value;
  }

  get b() {
    return this.z;
  }

  set b(value) {
    this.z = value;
  }

  get rgb() {
    return new Vec3(this.x, this.y, this.z);
  }

  get xyz() {
    return new Vec3(this.x, this.y, this.z);
  }

  get zyx() {
    return new Vec3(this.z, this.y, this.x);
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
}
