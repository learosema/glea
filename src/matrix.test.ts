import { Mat, Mat2 } from './matrix';

describe('generic matrix arithmetics', () => {
  test('2x3 matrix initialization', () => {
    const m = new Mat('2x3', 1, 2, 3, 4, 5, 6);
    expect(m.numRows).toBe(2);
    expect(m.numCols).toBe(3);
    expect(m.valueAt(0, 0)).toBe(1);
    expect(m.valueAt(1, 0)).toBe(2);
    expect(m.valueAt(0, 1)).toBe(3);
    expect(m.valueAt(1, 1)).toBe(4);
    expect(m.valueAt(0, 2)).toBe(5);
    expect(m.valueAt(1, 2)).toBe(6);
  });

  test('3x2 matrix rowAt and colAt', () => {
    const m = new Mat('3x2', 1, 2, 3, 4, 5, 6);
    expect(m.colAt(0)).toEqual([1, 2, 3]);
    expect(m.colAt(1)).toEqual([4, 5, 6]);

    expect(m.rowAt(0)).toEqual([1, 4]);
    expect(m.rowAt(1)).toEqual([2, 5]);
    expect(m.rowAt(2)).toEqual([3, 6]);
  });

  test('3x2 matrix equiality', () => {
    const a = new Mat('3x2', 1, 2, 3, 4, 5, 6);
    const b = new Mat('3x2', 1, 2, 3, 4, 5, 6);
    const c = new Mat('2x3', 1, 2, 3, 4, 5, 6);
    expect(a.equals(b)).toBeTruthy();
    expect(!a.equals(c)).toBeTruthy();
  });

  test('3x2 matrix addition', () => {
    const a = new Mat('3x2', 1, 2, 3, 4, 5, 6);
    const b = new Mat('3x2', 10, 20, 30, 40, 50, 60);
    const c = a.add(b);
    expect(c.colAt(0)).toEqual([11, 22, 33]);
    expect(c.colAt(1)).toEqual([44, 55, 66]);
  });

  test('3x2 matrix substraction', () => {
    const a = new Mat('3x2', 10, 20, 30, 40, 50, 60);
    const b = new Mat('3x2', 1, 2, 3, 4, 5, 6);
    const c = a.sub(b);
    expect(c.colAt(0)).toEqual([9, 18, 27]);
    expect(c.colAt(1)).toEqual([36, 45, 54]);
  });

  test('2x3 * 3x2 matrix multiplication', () => {
    const a = new Mat('3x2', 1, 2, 3, 4, 5, 6);

    const b = new Mat('2x3', 7, 8, -4, -2, -3, -5);
    //
    //      7 -4   -3
    //      8 -2   -5
    // 1 4 39 -12 -23
    // 2 5 54 -18 -31
    // 3 6 69 -24 -39
    const c = a.mul(b);
    expect(c.numCols).toBe(3);
    expect(c.numRows).toBe(3);

    expect(c.toArray()).toEqual([39, 54, 69, -12, -18, -24, -23, -31, -39]);
    //
    //           1   4
    //           2   5
    //           3   6
    // 7 -4 -3 -10 -10
    // 8 -2 -5 -11  -8
    const d = b.mul(a);
    expect(d.numCols).toBe(2);
    expect(d.numRows).toBe(2);
    expect(d.toArray()).toEqual([-10, -11, -10, -8]);
  });
});

describe('2x2 matrix arithmetics', () => {
  test('Mat2 identity', () => {
    const m = Mat2.identity();
    expect(m.valueAt(0, 0)).toBe(1);
    expect(m.valueAt(1, 1)).toBe(1);
    expect(m.valueAt(1, 0)).toBe(0);
    expect(m.valueAt(0, 1)).toBe(0);
  });

  test('Mat2 rowAt and colAt', () => {
    // prettier-ignore
    const mat = new Mat2(
      1, 2, // column 1
      3, 4  // column 2
    );
    const row = mat.rowAt(1);
    expect(row).toEqual([2, 4]);

    const col = mat.colAt(1);
    expect(col).toEqual([3, 4]);
  });

  test('Mat2 determinant', () => {
    const mat = new Mat2(1, 2, 3, 4);
    expect(mat.determinant()).toBe(-2);
  });

  test('Mat2 multiplication with identity matrix', () => {
    const a = new Mat2(2, 3, 5, 7);
    const b = Mat2.identity();
    const c = a.mul(b);
    expect(a.equals(c)).toBeTruthy();
  });

  test('Mat2 multiplication', () => {
    const a = new Mat2(2, 3, 5, 7);
    const b = new Mat2(-1, 4, 6, 8);
    const c = a.mul(b);
    //    -1 6  a = -1 * 2 + 4 * 5 = 18
    //     4 8  b =  2 * 6 + 5 * 8 = 52
    // 2 5 a b  c = -1 * 3 + 7 * 4 = 25
    // 3 7 c d  d =  3 * 6 + 7 * 8 = 74
    const d = new Mat2(18, 25, 52, 74);
    expect(c.equals(d)).toBeTruthy();
  });

  test('Mat2 toString()', () => {
    const a = new Mat2(2, 3, 5, 7);
    expect(a.toString()).toBe('mat2(2, 3, 5, 7)');
  });
});
