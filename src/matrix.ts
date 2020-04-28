export class Mat {
  values: number[];
  numRows: number;
  numCols: number;

  constructor(...values: (string | number)[]) {
    const MxN =
      typeof values[0] === 'string' && /^\d+x\d+$/.test(values[0])
        ? values[0].split('x').map((num) => parseInt(num, 10))
        : null;
    this.values = (MxN !== null ? values.slice(1) : values) as number[];
    if (MxN !== null && MxN[0] > 0 && MxN[1] > 0) {
      this.numRows = MxN[0];
      this.numCols = MxN[1];
    } else {
      const dimension = Math.sqrt(values.length);
      if (Number.isInteger(dimension)) {
        this.numCols = this.numRows = dimension;
        return;
      }
      throw Error('ArgumentError');
    }
  }

  toArray() {
    const { numRows, numCols, values } = this;
    if (numCols !== numRows) {
      return [`${numRows}x${numCols}`, ...values];
    }
    return this.values;
  }

  static fromArray(values: (string | number)[]) {
    return new Mat(...values);
  }

  valueAt(row: number, column: number) {
    return this.values[column * this.numRows + row];
  }

  colAt(column: number) {
    const { numRows } = this;
    return this.values.slice(column * numRows, column * numRows + numRows);
  }

  rowAt(row: number) {
    const { numRows, numCols } = this;
    return Array(numCols)
      .fill(0)
      .map((_, column) => this.values[column * numRows + row]);
  }

  equals(otherMatrix: Mat) {
    if (
      this.values.length !== otherMatrix.values.length ||
      this.numCols !== otherMatrix.numCols ||
      this.numRows !== otherMatrix.numRows
    ) {
      return false;
    }
    for (let i = 0; i < this.values.length; i++) {
      if (this.values[i] !== otherMatrix.values[i]) {
        return false;
      }
    }
    return true;
  }

  add(otherMatrix: Mat) {
    if (
      this.numCols === otherMatrix.numCols &&
      this.numRows === otherMatrix.numRows &&
      this.values.length === otherMatrix.values.length
    ) {
      const newValues: (string | number)[] = this.values.map(
        (value, i) => value + otherMatrix.values[i]
      );
      if (this.numRows !== this.numCols) {
        newValues.unshift(`${this.numRows}x${this.numCols}`);
      }
      return Mat.fromArray(newValues);
    }
    throw Error('ArgumentError');
  }

  sub(otherMatrix: Mat) {
    if (
      this.numCols === otherMatrix.numCols &&
      this.numRows === otherMatrix.numRows &&
      this.values.length === otherMatrix.values.length
    ) {
      const newValues: (string | number)[] = this.values.map(
        (value, i) => value - otherMatrix.values[i]
      );
      if (this.numRows !== this.numCols) {
        newValues.unshift(`${this.numRows}x${this.numCols}`);
      }
      return Mat.fromArray(newValues);
    }
    throw Error('ArgumentError');
  }

  mul(param: Mat | number) {
    if (typeof param === 'number') {
      const multipliedValues: (string | number)[] = this.values.map(
        (value) => value * param
      );
      if (this.numRows !== this.numCols) {
        multipliedValues.unshift(`${this.numRows}x${this.numCols}`);
      }
      return Mat.fromArray(multipliedValues);
    }
    if (param instanceof Mat) {
      const mat = param;
      const { numRows } = this;
      const { numCols } = mat;
      const multipliedValues: (string | number)[] = Array<string | number>(
        numRows * numCols
      )
        .fill(0)
        .map((_, idx) => {
          const y = idx % numRows;
          const x = (idx / numCols) | 0;
          const row = this.rowAt(y);
          const col = mat.colAt(x);
          return row.map((value, i) => value * col[i]).reduce((a, b) => a + b);
        });
      if (numRows !== numCols) {
        multipliedValues.unshift(`${numRows}x${numCols}`);
      }
      return Mat.fromArray(multipliedValues);
    }
    throw Error('ArgumentError');
  }

  toString() {
    const { numRows, numCols, values } = this;
    return `mat${numRows}x${numCols}(${values.join(', ')})`;
  }
}

export class Mat2 extends Mat {
  constructor(...values: number[]) {
    if (values.length !== 4) {
      throw Error('invalid argument');
    }
    super(...values);
    this.numRows = 2;
    this.numCols = 2;
  }

  toArray() {
    return this.values;
  }

  static fromArray(values: number[]) {
    return new Mat2(...values);
  }

  /**
   * create identity matrix
   */
  static identity() {
    // prettier-ignore
    return new Mat2(
      1, 0, // column1
      0, 1  // column2
    );
  }

  /**
   * create rotation matrix
   * @param angle angle in radians
   */
  static rotation(angle: number) {
    const S = Math.sin(angle);
    const C = Math.cos(angle);
    // prettier-ignore
    return new Mat2(
       C, S, 
      -S, C
    );
  }

  static scaling(sx: number, sy: number) {
    // prettier-ignore
    return new Mat2(
      sx, 0, 
      0, sy
    );
  }

  determinant() {
    const { values } = this;
    return values[0] * values[3] - values[1] * values[2];
  }

  toString() {
    return `mat2(${this.values.join(', ')})`;
  }
}

export class Mat3 extends Mat {
  constructor(...values: number[]) {
    if (values.length !== 9) {
      throw Error('invalid argument');
    }
    super(...values);
    this.numCols = 3;
    this.numRows = 3;
  }

  /**
   * convert to array
   */
  toArray() {
    return this.values;
  }

  /**
   * create from array
   * @param values array of values
   */
  static fromArray(values: number[]) {
    return new Mat4(...values);
  }

  /**
   * create identity matrix
   */
  static identity() {
    // prettier-ignore
    return new Mat3(
      1, 0, 0, 
      0, 1, 0,
      0, 0, 1
    );
  }

  /**
   * create translation matrix
   * @param x translation in x-direction
   * @param y translation in y-direction
   * @returns 3x3 translation matrix
   */
  static translation(x: number, y: number) {
    // prettier-ignore
    return new Mat3(
      1, 0, 0,
      0, 1, 0,
      x, y, 1
    );
  }

  /**
   * create scaling matrix
   * @param sx
   * @param sy
   * @param sz
   * @returns 3x3 scale matrix
   */
  static scaling(sx: number, sy: number, sz: number): Mat3 {
    // prettier-ignore
    return new Mat3(
      sx,  0,  0, 
       0, sy,  0, 
       0,  0, sz
    );
  }

  static rotX(angle: number) {
    const { sin, cos } = Math;
    const S = sin(angle);
    const C = cos(angle);
    // prettier-ignore
    return new Mat3(
      1, 0, 0,
      0, C, S,
      0,-S, C
    );
  }

  static rotY(angle: number) {
    const { sin, cos } = Math;
    const S = sin(angle);
    const C = cos(angle);
    // prettier-ignore
    return new Mat3(
      C, 0,-S,
      0, 1, 0,
      S, 0, C
    );
  }

  static rotZ(angle: number) {
    const { sin, cos } = Math;
    const S = sin(angle);
    const C = cos(angle);
    // prettier-ignore
    return new Mat4(
      C, S, 0,
	   -S, C, 0,
	    0, 0, 1
    );
  }
}

export class Mat4 extends Mat {
  constructor(...values: number[]) {
    // input is like in glsl mat4:
    // column0: row 0, row 1, row 2, row 3
    // column1: row 0, row 1, row 2, row 3
    // column2: row 0, row 1, row 2, row 3
    // column3: row 0, row 1, row 2, row 3
    if (values.length !== 16) {
      throw Error('invalid argument');
    }
    super(...values);
    this.numCols = 4;
    this.numRows = 4;
  }

  toArray() {
    return this.values;
  }

  static fromArray(values: number[]) {
    return new Mat4(...values);
  }

  static identity() {
    // prettier-ignore
    return new Mat4(
      1, 0, 0, 0,
      0, 1, 0, 0,
      0, 0, 1, 0,
      0, 0, 0, 1);
  }

  static translation(x: number, y: number, z: number) {
    // prettier-ignore
    return new Mat4(
      1, 0, 0, 0,
      0, 1, 0, 0,
      0, 0, 1, 0,
      x, y, z, 1
    );
  }

  static scaling(sx: number, sy: number, sz: number) {
    // prettier-ignore
    return new Mat4(
      sx,  0,  0, 0,
       0, sy,  0, 0,
       0,  0, sz, 0,
       0,  0,  0, 1
    );
  }

  static rotX(angle: number) {
    const { sin, cos } = Math;
    const S = sin(angle);
    const C = cos(angle);
    // prettier-ignore
    return new Mat4(
      1, 0, 0, 0,
      0, C, S, 0,
      0,-S, C, 0,
      0, 0, 0, 1
    );
  }

  static rotY(angle: number) {
    const { sin, cos } = Math;
    const S = sin(angle);
    const C = cos(angle);
    // prettier-ignore
    return new Mat4(
      C, 0,-S, 0,
      0, 1, 0, 0,
      S, 0, C, 0,
      0, 0, 0, 1
    );
  }

  static rotZ(angle: number) {
    const { sin, cos } = Math;
    const S = sin(angle);
    const C = cos(angle);
    // prettier-ignore
    return new Mat4(
      C, S, 0, 0,
	   -S, C, 0, 0,
	    0, 0, 1, 0,
	    0, 0, 0, 1
    );
  }
}
