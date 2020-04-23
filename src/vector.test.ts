import { Vec2, Vec3 } from './vector';

describe('2D Vector arithmetics', () => {
  test('Vec2 constructor', () => {
    const vector = new Vec2(1, 2);
    expect(vector.x).toBe(1);
    expect(vector.y).toBe(2);
  });

  test('Vec2 clone', () => {
    const vector = new Vec2(1, 2);
    const copied = vector.clone();
    expect(copied.x).toBe(1);
    expect(copied.y).toBe(2);
  });


  test('Vec2 fromNumber factory', () => {
    const vector = Vec2.fromNumber(3);
    expect(vector.x).toBe(3);
    expect(vector.y).toBe(3);
  });

  test('Vec2 fromArray factory', () => {
    const vector = Vec2.fromArray([3, 5]);
    expect(vector.x).toBe(3);
    expect(vector.y).toBe(5);
  });

  test('Vec2 addition', () => {
    const v1 = new Vec2(1, 2);
    const v2 = new Vec2(3, 5);
    const v3 = v1.add(v2);
    expect(v3.x).toBe(4);
    expect(v3.y).toBe(7);
  });

  test('Vec2 substraction', () => {
    const v1 = new Vec2(1, 2);
    const v2 = new Vec2(3, 5);
    const v3 = v1.sub(v2);
    expect(v3.x).toBe(-2);
    expect(v3.y).toBe(-3);
  });

  test('Vec2 multiplication', () => {
    const v1 = new Vec2(1, 2);
    const v2 = v1.mul(7);
    expect(v2.x).toBe(7);
    expect(v2.y).toBe(14);
  });

  test('Vec2 division', () => {
    const v1 = new Vec2(7, 14);
    const v2 = v1.div(7);
    expect(v2.x).toBe(1);
    expect(v2.y).toBe(2);
  });

  test('Vec2 length', () => {
    const vector = new Vec2(3, 4);
    expect(vector.length).toBe(5);
  });

  test('Vec2 equality', () => {
    const v1 = new Vec2(1, 1);
    const v2 = new Vec2(1, 1);
    expect(v1.equals(v2)).toBe(true);
  });

  test('Vec2 dot product', () => {
    const v1 = new Vec2(2, 3);
    const v2 = new Vec2(5, 7);
    expect(v1.dot(v2)).toBe(31);
  });

  test('Vec2 toArray conversion', () => {
    const v = new Vec2(3, -2);
    expect(v.toArray()).toEqual([3, -2]);
  });

  test('Vec2 toString conversion', () => {
    const vector = new Vec2(3, -2);
    expect(vector.toString()).toBe('(3, -2)');
  });
});

describe('3D Vector arithmetics', () => {
  test('Vec3 constructor', () => {
    const vector = new Vec3(1, 2, 3);
    expect(vector.x).toBe(1);
    expect(vector.y).toBe(2);
    expect(vector.z).toBe(3);
  });

  test('Vec3 constructor with array as argument', () => {
    const vector = Vec3.fromArray([1, 2, 3]);
    expect(vector.x).toBe(1);
    expect(vector.y).toBe(2);
    expect(vector.z).toBe(3);
  });

  test('Vec3 clone', () => {
    const vector = new Vec3(1, 2, 3).clone();
    expect(vector.x).toBe(1);
    expect(vector.y).toBe(2);
    expect(vector.z).toBe(3);
  });

  test('Vec3 constructor with inner Vec2 constructor', () => {
    const vec2 = new Vec2(1, 2);
    const vector = Vec3.fromVec2(vec2, 3);
    expect(vector.x).toBe(1);
    expect(vector.y).toBe(2);
    expect(vector.z).toBe(3);
  });

  test('Vec3 fromNumber factory', () => {
    const vector = Vec3.fromNumber(3);
    expect(vector.x).toBe(3);
    expect(vector.y).toBe(3);
    expect(vector.z).toBe(3);
  });

  test('Vec3.xy', () => {
    const vector = new Vec3(1, 2, 3);
    const xy = vector.xy;
    expect(xy instanceof Vec2).toBe(true);
    expect(xy.x).toBe(1);
    expect(xy.y).toBe(2);
  });

  test('Vec3.xz', () => {
    const vector = new Vec3(1, 2, 3);
    const xz = vector.xz;
    expect(xz instanceof Vec2).toBe(true);
    expect(xz.x).toBe(1);
    expect(xz.y).toBe(3);
  });

  test('Vec3.yx', () => {
    const vector = new Vec3(1, 2, 3);
    const yx = vector.yx;
    expect(yx instanceof Vec2).toBe(true);
    expect(yx.x).toBe(2);
    expect(yx.y).toBe(1);
  });

  test('Vec3.yz', () => {
    const vector = new Vec3(1, 2, 3);
    const yz = vector.yz;
    expect(yz instanceof Vec2).toBe(true);
    expect(yz.x).toBe(2);
    expect(yz.y).toBe(3);
  });

  test('Vec3.zx', () => {
    const vector = new Vec3(1, 2, 3);
    const zx = vector.zx;
    expect(zx instanceof Vec2).toBe(true);
    expect(zx.x).toBe(3);
    expect(zx.y).toBe(1);
  });

  test('Vec3.zy', () => {
    const vector = new Vec3(1, 2, 3);
    const zy = vector.zy;
    expect(zy instanceof Vec2).toBe(true);
    expect(zy.x).toBe(3);
    expect(zy.y).toBe(2);
  });

  test('Vec3 addition', () => {
    const v1 = new Vec3(1, 2, 3);
    const v2 = new Vec3(3, 5, 7);
    const v3 = v1.add(v2);
    expect(v3.x).toBe(4);
    expect(v3.y).toBe(7);
    expect(v3.z).toBe(10);
  });

  test('Vec3 substraction', () => {
    const v1 = new Vec3(1, 2, 3);
    const v2 = new Vec3(3, 5, 7);
    const v3 = v1.sub(v2);
    expect(v3.x).toBe(-2);
    expect(v3.y).toBe(-3);
    expect(v3.z).toBe(-4);
  });

  test('Vec3 multiplication', () => {
    const v1 = new Vec3(1, 2, 3);
    const v2 = v1.mul(7);
    expect(v2.x).toBe(7);
    expect(v2.y).toBe(14);
    expect(v2.z).toBe(21);
  });

  test('Vec3 division', () => {
    const v1 = new Vec3(7, 14, 21);
    const v2 = v1.div(7);
    expect(v2.x).toBe(1);
    expect(v2.y).toBe(2);
    expect(v2.z).toBe(3);
  });

  test('Vec3 length', () => {
    const vector = new Vec3(3, 4, 5);
    expect(vector.length).toBeCloseTo(7.071, 3);
  });

  test('Vec3 normalized', () => {
    const vector = new Vec3(3, 4, 5)
    const expected = new Vec3(0.42, 0.57, 0.71);
    const actual = vector.normalized;
    expect(actual.x).toBeCloseTo(expected.x);
    expect(actual.y).toBeCloseTo(expected.y);
    expect(actual.z).toBeCloseTo(expected.z);
  });

  test('Vec3 equality', () => {
    const v1 = new Vec3(1, 3, 4);
    const v2 = new Vec3(1, 3, 4);
    expect(v1.equals(v2)).toBe(true);
  });

  test('Vec3 dot product', () => {
    const v1 = new Vec3(2, 3, 4);
    const v2 = new Vec3(5, 7, 6);
    expect(v1.dot(v2)).toBe(55);
  });

  test('Vec3 cross product', () => {
    const v1 = new Vec3(2, 3, 4);
    const v2 = new Vec3(5, 7, 6);
    const v3 = new Vec3(-10, 8, -1);
    expect(v1.cross(v2).equals(v3)).toBe(true);
  });

  test('Vec3 toArray conversion', () => {
    const vector = new Vec3(3, -2, 1);
    expect(vector.toArray()).toEqual([3, -2, 1]);
  });

  test('Vec3 toString conversion', () => {
    const vector = new Vec3(3, -2, 1);
    expect(vector.toString()).toBe('(3, -2, 1)');
  });
});


