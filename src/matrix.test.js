import { describe, test } from './test-framework/test';
import { arrayEquals } from './test-framework/array-utils';
import { Mat, Mat2 } from './matrix';

describe('generic matrix arithmetics', () => {
  test('2x3 matrix initialization', (assert) => {
    const m = new Mat('2x3', 1, 2, 3, 4, 5, 6);
    assert(m.numRows === 2, 'numRows === 2');
    assert(m.numCols === 3, 'numCols === 3');
    assert(m.valueAt(0, 0) === 1, 'm00 = 1');
    assert(m.valueAt(1, 0) === 2, 'm10 = 2');
    assert(m.valueAt(0, 1) === 3, 'm01 = 3');
    assert(m.valueAt(1, 1) === 4, 'm11 = 4');
    assert(m.valueAt(0, 2) === 5, 'm02 = 5');
    assert(m.valueAt(1, 2) === 6, 'm12 = 6');
  });

  test('3x2 matrix rowAt and colAt', (assert) => {
    const m = new Mat('3x2', 1, 2, 3, 4, 5, 6);
    assert(
      arrayEquals(m.colAt(0), [1, 2, 3]),
      '1st col of ' + m + ' equals [1, 2, 3]'
    );
    assert(
      arrayEquals(m.colAt(1), [4, 5, 6]),
      '2nd col of ' + m + ' equals [4, 5, 6]'
    );
    assert(
      arrayEquals(m.rowAt(0), [1, 4]),
      '1st row of ' + m + ' equals [1, 4]'
    );
    assert(
      arrayEquals(m.rowAt(1), [2, 5]),
      '2nd row of ' + m + ' equals [2, 5]'
    );
    assert(
      arrayEquals(m.rowAt(2), [3, 6]),
      '3rd row of ' + m + ' equals [3, 6]'
    );
  });

  test('3x2 matrix equiality', (assert) => {
    const a = new Mat('3x2', 1, 2, 3, 4, 5, 6);
    const b = new Mat('3x2', 1, 2, 3, 4, 5, 6);
    const c = new Mat('2x3', 1, 2, 3, 4, 5, 6);
    assert(a.equals(b), 'a equals b');
    assert(!a.equals(c), 'a not equals c');
  });

  test('3x2 matrix addition', (assert) => {
    const a = new Mat('3x2', 1, 2, 3, 4, 5, 6);
    const b = new Mat('3x2', 10, 20, 30, 40, 50, 60);
    const c = a.add(b);
    assert(
      arrayEquals(c.colAt(0), [11, 22, 33]),
      '1st col of ' + c + ' equals [11, 22, 33]'
    );
    assert(
      arrayEquals(c.colAt(1), [44, 55, 66]),
      '2nd col of ' + c + ' equals [44, 55, 66]'
    );
  });

  test('3x2 matrix substraction', (assert) => {
    const a = new Mat('3x2', 10, 20, 30, 40, 50, 60);
    const b = new Mat('3x2', 1, 2, 3, 4, 5, 6);
    const c = a.sub(b);
    assert(
      arrayEquals(c.colAt(0), [9, 18, 27]),
      '1st col of ' + c + ' equals [9, 18, 27]'
    );
    assert(
      arrayEquals(c.colAt(1), [36, 45, 54]),
      '2nd col of ' + c + ' equals [36, 45, 54]'
    );
  });

  test('2x3 * 3x2 matrix multiplication', (assert) => {
    const a = new Mat('3x2', 1, 2, 3, 4, 5, 6);

    const b = new Mat('2x3', 7, 8, -4, -2, -3, -5);
    //
    //      7 -4   -3
    //      8 -2   -5
    // 1 4 39 -12 -23
    // 2 5 54 -18 -31
    // 3 6 69 -24 -39
    const c = a.mul(b);
    assert(c.numCols === 3, 'result matrix has 3 columns');
    assert(c.numRows === 3, 'result matrix has 3 rows');
    assert(
      arrayEquals(c.toArray(), [39, 54, 69, -12, -18, -24, -23, -31, -39]),
      'Matrix multiplication test'
    );
    //
    //           1   4
    //           2   5
    //           3   6
    // 7 -4 -3 -10 -10
    // 8 -2 -5 -11  -8
    const d = b.mul(a);
    assert(d.numCols === 2, 'result matrix has 2 columns');
    assert(d.numRows === 2, 'result matrix has 2 columns');
    assert(
      arrayEquals(d.toArray(), [-10, -11, -10, -8]),
      'Matrix multiplication test 2'
    );
  });
});

describe('2x2 matrix arithmetics', () => {
  test('Mat2 identity', (assert) => {
    const m = Mat2.identity();
    assert(m.valueAt(0, 0) === 1, 'm00 = 1');
    assert(m.valueAt(1, 1) === 1, 'm11 = 1');
    assert(m.valueAt(1, 0) === 0, 'm10 = 0');
    assert(m.valueAt(0, 1) === 0, 'm01 = 0');
  });

  test('Mat2 rowAt and colAt', (assert) => {
    const mat = new Mat2(
      1,
      2, // column 1
      3,
      4 // column 2
    );
    const row = mat.rowAt(1);
    assert(
      arrayEquals(row, [2, 4]),
      'second row of mat2(1, 2, 3, 4) equals [2, 4]'
    );
    const col = mat.colAt(1);
    assert(
      arrayEquals(col, [3, 4]),
      'second col of mat2(1, 2, 3, 4) equals [3, 4]'
    );
  });

  test('Mat2 determinant', (assert) => {
    const mat = new Mat2(1, 2, 3, 4);
    assert(mat.determinant() === -2, 'Determinant of mat2(1,2,3,4) equals -2');
  });

  test('Mat2 multiplication with identity matrix', (assert) => {
    const a = new Mat2(2, 3, 5, 7);
    const b = Mat2.identity();
    const c = a.mul(b);
    assert(a.equals(c), 'martix multiplied by identity matrix equals matrix');
  });

  test('Mat2 multiplication', (assert) => {
    const a = new Mat2(2, 3, 5, 7);
    const b = new Mat2(-1, 4, 6, 8);
    const c = a.mul(b);
    //    -1 6  a = -1 * 2 + 4 * 5 = 18
    //     4 8  b =  2 * 6 + 5 * 8 = 52
    // 2 5 a b  c = -1 * 3 + 7 * 4 = 25
    // 3 7 c d  d =  3 * 6 + 7 * 8 = 74
    const d = new Mat2(18, 25, 52, 74);
    assert(c.equals(d), 'matrix multiplication test');
  });

  test('Mat2 toString()', (assert) => {
    const a = new Mat2(2, 3, 5, 7);
    assert(a.toString() === 'mat2(2, 3, 5, 7)', 'toString test.');
  });
});
