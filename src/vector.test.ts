import { Vec2, Vec3 } from './vector';

describe('2D Vector arithmetics', () => {
  test('Vec2 constructor', (assert) => {
    const vector = new Vec2(1, 2);
    assert(vector.x === 1, 'vector.x equals 1');
    assert(vector.y === 2, 'vector.y equals 2');
  });

  test('Vec2 constructor with invalid args', (assert) => {
    shouldThrow(assert, 'invalid vector should throw an exception.', () => {
      const invalidVector = new Vec2(1, null);
    });
  });

  test('Vec2 constructor with one number as argument', (assert) => {
    const vector = new Vec2(1);
    assert(vector.x === 1, 'vector.x equals 1');
    assert(vector.y === 1, 'vector.y equals 1');
  });

  test('Vec2 constructor from array', (assert) => {
    const vector = new Vec2([1, 2]);
    assert(vector.x === 1, 'vector.x equals 1');
    assert(vector.y === 2, 'vector.y equals 2');
  });

  test('Vec2 addition', (assert) => {
    const v1 = new Vec2(1, 2);
    const v2 = new Vec2(3, 5);
    const v3 = v1.add(v2);
    assert(v3.x === 4, '(1 + 3, 2 + 5).x equals 4');
    assert(v3.y === 7, '(1 + 3, 2 + 5).y equals 7');
  });

  test('Vec2 substraction', (assert) => {
    const v1 = new Vec2(1, 2);
    const v2 = new Vec2(3, 5);
    const v3 = v1.sub(v2);
    assert(v3.x === -2, '(1 - 3, 2 - 5).x equals -2');
    assert(v3.y === -3, '(1 - 3, 2 - 5).y equals -3');
  });

  test('Vec2 multiplication', (assert) => {
    const v1 = new Vec2(1, 2);
    const v2 = v1.mul(7);
    assert(v2.x === 7, '((1, 2) * 7).x equaks 7');
    assert(v2.y === 14, '((1, 2) * 7).y equaks 14');
  });

  test('Vec2 division', (assert) => {
    const v1 = new Vec2(7, 14);
    const v2 = v1.div(7);
    assert(v2.x === 1, '((7, 14) / 7).x equals 1');
    assert(v2.y === 2, '((7, 14) / 7).y equals 2');
  });

  test('Vec2 length', (assert) => {
    const vector = new Vec2(3, 4);
    assert(vector.length === 5, '(3, 4).length equals 5');
  });

  test('Vec2 equality', (assert) => {
    const v1 = new Vec2(1, 1);
    const v2 = new Vec2(1, 1);
    assert(v1.equals(v2), 'v1.equals(v2) equals true');
  });

  test('Vec2 dot product', (assert) => {
    const v1 = new Vec2(2, 3);
    const v2 = new Vec2(5, 7);
    assert(v1.dot(v2) === 31, '(2, 3) dot (5, 7) equals 2 * 5 + 3 * 7 = 31');
  });

  test('Vec2 toArray conversion', (assert) => {
    const v1 = new Vec2(3, -2);
    assert(
      arrayEquals(v1.toArray(), [3, -2]),
      '(3, -2) can be converted to array [3, -2]'
    );
  });

  test('Vec2 toString conversion', (assert) => {
    const vector = new Vec2(3, -2);
    assert(
      vector.toString() === '(3, -2)',
      '(3, -2) can be converted to string'
    );
  });
});

describe('3D Vector arithmetics', () => {
  test('Vec3 constructor', (assert) => {
    const vector = new Vec3(1, 2, 3);
    assert(vector.x === 1, 'vector.x equals 1');
    assert(vector.y === 2, 'vector.y equals 2');
    assert(vector.z === 3, 'vector.z equals 3');
  });

  test('Vec3 constructor with one number as argument', (assert) => {
    const vector = new Vec3(1);
    assert(vector.x === 1, 'vector.x equals 1');
    assert(vector.y === 1, 'vector.y equals 1');
    assert(vector.z === 1, 'vector.z equals 1');
  });

  test('Vec3 constructor with array as argument', (assert) => {
    const vector = new Vec3([1, 2, 3]);
    assert(vector.x === 1, 'vector.x equals 1');
    assert(vector.y === 2, 'vector.y equals 2');
    assert(vector.z === 3, 'vector.z equals 3');
  });

  test('Vec3 constructor with another Vec3 as argument', (assert) => {
    const vector = new Vec3(new Vec3(1, 2, 3));
    assert(vector.x === 1, 'vector.x equals 1');
    assert(vector.y === 2, 'vector.y equals 2');
    assert(vector.z === 3, 'vector.z equals 3');
  });

  test('Vec3 constructor with inner Vec2 constructor', (assert) => {
    const vec2 = new Vec2(1, 2);
    const vector = new Vec3(vec2, 3);
    assert(vector.x === 1, 'vector.x equals 1');
    assert(vector.y === 2, 'vector.y equals 2');
    assert(vector.z === 3, 'vector.z equals 3');
  });

  test('Vec3 constructor with inner Vec2 constructor as second arg', (assert) => {
    const vec2 = new Vec2(1, 2);
    const vector = new Vec3(3, vec2);
    assert(vector.x === 3, 'vector.x equals 3');
    assert(vector.y === 1, 'vector.y equals 1');
    assert(vector.z === 2, 'vector.z equals 2');
  });

  test('Vec3 constructor with invalid args', (assert) => {
    shouldThrow(assert, 'Should throw an exception', () => {
      const vector = new Vec3(1, null, null);
    });
  });

  test('Vec3 addition', (assert) => {
    const v1 = new Vec3(1, 2, 3);
    const v2 = new Vec3(3, 5, 7);
    const v3 = v1.add(v2);
    assert(v3.x === 4, '(1 + 3, 2 + 5, 3 + 7).x equals 4');
    assert(v3.y === 7, '(1 + 3, 2 + 5, 3 + 7).y equals 7');
    assert(v3.z === 10, '(1 + 3, 2 + 5, 3 + 7).z equals 10');
  });

  test('Vec3 substraction', (assert) => {
    const v1 = new Vec3(1, 2, 3);
    const v2 = new Vec3(3, 5, 7);
    const v3 = v1.sub(v2);
    assert(v3.x === -2, '(1 - 3, 2 - 5, 3 - 7).x equals -2');
    assert(v3.y === -3, '(1 - 3, 2 - 5, 3 - 7).y equals -3');
    assert(v3.z === -4, '(1 - 3, 2 - 5, 3 - 7).z equals -4');
  });

  test('Vec3 multiplication', (assert) => {
    const v1 = new Vec3(1, 2, 3);
    const v2 = v1.mul(7);
    assert(v2.x === 7, '((1, 2, 3) * 7).x equaks 7');
    assert(v2.y === 14, '((1, 2, 3) * 7).y equaks 14');
    assert(v2.z === 21, '((1, 2, 3) * 7).z equaks 21');
  });

  test('Vec3 division', (assert) => {
    const v1 = new Vec3(7, 14, 21);
    const v2 = v1.div(7);
    assert(v2.x === 1, '((7, 14, 21) / 7).x equals 1');
    assert(v2.y === 2, '((7, 14, 21) / 7).y equals 2');
    assert(v2.z === 3, '((7, 14, 21) / 7).z equals 3');
  });

  test('Vec3 length', (assert) => {
    const delta = (a, b) => Math.abs(a - b);
    const vector = new Vec3(3, 4, 5);
    assert(
      delta(7.071, vector.length) < 0.001,
      '(3, 4, 5).length is about 7.071'
    );
  });

  test('Vec3 equality', (assert) => {
    const v1 = new Vec3(1, 3, 4);
    const v2 = new Vec3(1, 3, 4);
    assert(v1.equals(v2), 'v1.equals(v2) equals true');
  });

  test('Vec3 dot product', (assert) => {
    const v1 = new Vec3(2, 3, 4);
    const v2 = new Vec3(5, 7, 6);
    assert(
      v1.dot(v2) === 55,
      '(2, 3, 4) dot (5, 7, 6) equals 2 * 5 + 3 * 7 + 4 * 6 = 55'
    );
  });

  test('Vec3 cross product', (assert) => {
    const v1 = new Vec3(2, 3, 4);
    const v2 = new Vec3(5, 7, 6);
    const v3 = new Vec3(-10, 8, -1);
    assert(
      v1.cross(v2).equals(v3),
      '(2, 3, 4) cross (5, 7, 6) equals (3 * 6 - 4 * 7, 4 * 5 - 2 * 6, 2 * 7 - 3 * 5)'
    );
  });

  test('Vec3 toArray conversion', (assert) => {
    const vector = new Vec3(3, -2, 1);
    assert(
      arrayEquals(vector.toArray(), [3, -2, 1]),
      '(3, -2, 1) can be converted to array [3, -2, 1]'
    );
  });

  test('Vec3 toString conversion', (assert) => {
    const vector = new Vec3(3, -2, 1);
    assert(
      vector.toString() === '(3, -2, 1)',
      '(3, -2, 1) can be converted to string'
    );
  });
});
