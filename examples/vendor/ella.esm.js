class Vec {
  constructor(...values) {
    this.values = values;
  }
  get dim() {
    return this.values.length;
  }
  get x() {
    return this.values[0];
  }
  get y() {
    return this.values[1];
  }
  get z() {
    return this.values[2];
  }
  get w() {
    return this.values[3];
  }
  get xy() {
    return new Vec(this.values[0], this.values[1]);
  }
  get xz() {
    return new Vec(this.values[0], this.values[2]);
  }
  get yz() {
    return new Vec(this.values[1], this.values[2]);
  }
  get xyz() {
    return new Vec(this.values[0], this.values[1], this.values[2]);
  }
  /**
   * Create vector from Array
   * @param arr array of numbers
   */
  static fromArray(arr) {
    return new Vec(...arr);
  }
  /**
   * Create vector with x = y = n
   * @param n the number
   * @param dim the dimension
   */
  static fromNumber(n, dim) {
    return new Vec(...Array(dim).fill(n));
  }
  /**
   * clone vector
   */
  clone() {
    return new Vec(...this.values);
  }
  /**
   * add vector
   * @param otherVec addend
   * @returns addition result
   */
  add(otherVec) {
    return new Vec(...this.values.map((v, idx) => v + otherVec.values[idx]));
  }
  /**
   * subtract vector
   * @param otherVec addend
   * @returns subtraction result
   */
  sub(otherVec) {
    return new Vec(...this.values.map((v, idx) => v - otherVec.values[idx]));
  }
  /**
   * multiply vector with scalar
   * @param value scalar
   * @returns multiplication result
   */
  mul(value) {
    return new Vec(...this.values.map((v) => v * value));
  }
  /**
   * divide vector with scalar
   * @param value scalar
   * @returns multiplication result
   */
  div(value) {
    return new Vec(...this.values.map((x) => x / value));
  }
  /**
   * dot product
   * @param otherVec
   */
  dot(otherVec) {
    return this.values
      .map((x, idx) => x * otherVec.values[idx])
      .reduce((a, b) => a + b);
  }
  /**
   * check for equality
   * @param otherVec
   */
  equals(otherVec) {
    return this.values
      .map((v, idx) => v === otherVec.values[idx])
      .reduce((a, b) => a === b);
  }
  /**
   * Calculate length
   */
  get length() {
    return Math.sqrt(this.values.map((v) => v ** 2).reduce((a, b) => a + b));
  }
  /**
   * Convert to array
   */
  toArray() {
    return this.values.slice(0);
  }
  /**
   * Convert to string, in the form of `(x, y)`
   */
  toString() {
    return `(${this.values.join(', ')})`;
  }
  /**
   * cross product
   * @param otherVec
   * @returns new Vec3 instance containing cross product
   */
  cross(otherVec) {
    if (this.dim !== 3 || otherVec.dim !== 3) {
      throw Error('dimension not supported');
    }
    return new Vec(
      this.y * otherVec.z - this.z * otherVec.y,
      this.z * otherVec.x - this.x * otherVec.z,
      this.x * otherVec.y - this.y * otherVec.x
    );
  }
  /**
   * normalized vector,
   * @returns vector normalized to length = 1
   */
  get normalized() {
    return this.div(this.length);
  }
}

/** @class Mat */
class Mat {
  constructor(values, options) {
    this.values = values;
    if (options) {
      this.numRows = options.numRows;
      this.numCols = options.numCols;
    } else {
      const dimension = Math.sqrt(values.length);
      if (Number.isInteger(dimension)) {
        this.numCols = this.numRows = dimension;
        return;
      }
      throw Error('ArgumentError');
    }
  }
  /**
   * create identity matrix
   * @param dimension dimension of the matrix
   */
  static identity(dimension) {
    if (dimension <= 0 || !Number.isInteger(dimension)) {
      throw Error('ArgumentError');
    }
    return new Mat(
      Array(dimension ** 2)
        .fill(0)
        .map((_, i) => (i % dimension === ((i / dimension) | 0) ? 1 : 0))
    );
  }
  /**
   * Converts a vector with dimension n into a matrix with 1 col and n rows
   * useful for matrix multiplication
   * @param value the input vector
   */
  static fromVector(value) {
    if (value instanceof Vec) {
      return new Mat(value.toArray(), { numRows: value.dim, numCols: 1 });
    }
    throw Error('unsupported type');
  }
  /**
   * Converts a bunch of vectors into a matrix
   */
  static fromVectors(vectors) {
    if (!vectors || vectors.length === 0) {
      throw Error('Argument error.');
    }
    const dimensions = vectors.map((v) => v.dim);
    const dimensionsMatch = dimensions.every((x) => x === dimensions[0]);
    const dimension = dimensions[0];
    if (!dimensionsMatch) {
      throw Error('Dimensions mismatch.');
    }
    const matrix = Array(dimension * vectors.length);
    for (let i = 0; i < vectors.length; i++) {
      for (let j = 0; j < dimension; j++) {
        matrix[i + j * vectors.length] = vectors[i].values[j];
      }
    }
    return new Mat(matrix, { numRows: dimension, numCols: vectors.length });
  }
  /**
   * convert to array
   */
  toArray() {
    return this.values;
  }
  /**
   * get value at a given position
   * @param row row index starting from 0
   * @param column column index starting from 0
   */
  valueAt(row, column) {
    return this.values[column * this.numRows + row];
  }
  /**
   * get column at a given index
   * @param column index of column starting from 0
   * @returns column as an array of numbers
   */
  colAt(column) {
    const { numRows } = this;
    return this.values.slice(column * numRows, column * numRows + numRows);
  }
  /**
   * get row at a given index
   * @param row index of row starting from 0
   * @returns row as an array of numbers
   */
  rowAt(row) {
    const { numRows, numCols } = this;
    return Array(numCols)
      .fill(0)
      .map((_, column) => this.values[column * numRows + row]);
  }
  /**
   * returns transposed matrix
   */
  transpose() {
    const transposedValues = [];
    Array(this.numRows)
      .fill(0)
      .map((_, i) => {
        transposedValues.push(...this.rowAt(i));
      });
    return new Mat(transposedValues, {
      numRows: this.numCols,
      numCols: this.numRows,
    });
  }
  /**
   * check for equality
   * @param otherMatrix matrix to compare
   * @returns true or false
   */
  equals(otherMatrix) {
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
  /**
   * add two matrices
   * @param otherMatrix matrix to add
   * @returns result matrix
   */
  add(otherMatrix) {
    if (
      this.numCols === otherMatrix.numCols &&
      this.numRows === otherMatrix.numRows &&
      this.values.length === otherMatrix.values.length
    ) {
      const newValues = this.values.map(
        (value, i) => value + otherMatrix.values[i]
      );
      return new Mat(newValues, {
        numRows: this.numRows,
        numCols: this.numCols,
      });
    }
    throw Error('ArgumentError');
  }
  /**
   * subtract another matrix
   * @param otherMatrix matrix to subtract
   * @returns result matrix
   */
  sub(otherMatrix) {
    if (
      this.numCols === otherMatrix.numCols &&
      this.numRows === otherMatrix.numRows &&
      this.values.length === otherMatrix.values.length
    ) {
      const newValues = this.values.map(
        (value, i) => value - otherMatrix.values[i]
      );
      return new Mat(newValues, {
        numRows: this.numRows,
        numCols: this.numCols,
      });
    }
    throw Error('ArgumentError');
  }
  /**
   * matrix multiplication
   * @param param can be a matrix, a number or a vector
   * @returns a vector in case of matrix vector multiplication, else a matrix
   * @throws dimension Mismatch if dimensions doesn't match
   */
  mul(param) {
    if (typeof param === 'number') {
      const multipliedValues = this.values.map((value) => value * param);
      return new Mat(multipliedValues, {
        numRows: this.numRows,
        numCols: this.numCols,
      });
    }
    if (param instanceof Vec) {
      if (param.dim !== this.numCols) {
        throw Error('dimension mismatch');
      }
      const m = this.mul(Mat.fromVector(param));
      return new Vec(...m.values);
    }
    if (param instanceof Mat) {
      const mat = param;
      const { numRows } = this;
      const { numCols } = mat;
      const multipliedValues = Array(numRows * numCols)
        .fill(0)
        .map((_, idx) => {
          const y = idx % numRows;
          const x = (idx / numRows) | 0;
          const row = this.rowAt(y);
          const col = mat.colAt(x);
          return row.map((value, i) => value * col[i]).reduce((a, b) => a + b);
        });
      return new Mat(multipliedValues, { numRows, numCols });
    }
    throw Error('ArgumentError');
  }
  /**
   * calculate determinant
   */
  determinant() {
    const { numRows, numCols } = this;
    const v = this.values;
    if (numRows !== numCols) {
      throw Error('ArgumentError');
    }
    if (numRows === 2) {
      return v[0] * v[3] - v[1] * v[2];
    }
    if (numRows === 3) {
      // a0 d1 g2
      // b3 e4 h5
      // c6 f7 i8
      // aei + bfg + cdh
      //-gec - hfa - idb
      return (
        v[0] * v[4] * v[8] +
        v[3] * v[7] * v[2] +
        v[6] * v[1] * v[5] -
        v[2] * v[4] * v[6] -
        v[5] * v[7] * v[0] -
        v[8] * v[1] * v[3]
      );
    }
    throw Error('NotImplementedYet');
  }
  /**
   * convert matrix to string
   * @returns a string containing matROWSxCOLS(comma-separated-values)
   */
  toString() {
    const { numRows, numCols, values } = this;
    return `mat${numRows}x${numCols}(${values.join(', ')})`;
  }
}
const Mat2 = {
  /**
   * create rotation matrix
   * @param angle angle in radians
   */
  rotation(angle) {
    const S = Math.sin(angle);
    const C = Math.cos(angle);
    // prettier-ignore
    return new Mat([
            C, S,
            -S, C
        ]);
  },
  /**
   * create scaling matrix
   * @param sx X-scale factor
   * @param sy Y-scale factor
   */
  scaling(sx, sy) {
    // prettier-ignore
    return new Mat([
            sx, 0,
            0, sy
        ]);
  },
};
const Mat3 = {
  /**
   * create translation matrix
   * @param x translation in x-direction
   * @param y translation in y-direction
   * @returns 3x3 translation matrix
   */
  translation(x, y) {
    // prettier-ignore
    return new Mat([
            1, 0, 0,
            0, 1, 0,
            x, y, 1
        ]);
  },
  /**
   * create scaling matrix
   * @param sx scale X factor
   * @param sy scale Y factor
   * @param sz scale Z factor
   * @returns 3x3 scale matrix
   */
  scaling(sx, sy, sz) {
    // prettier-ignore
    return new Mat([
            sx, 0, 0,
            0, sy, 0,
            0, 0, sz
        ]);
  },
  /**
   * create X-rotation matrix
   * @param angle rotation in radians
   */
  rotX(angle) {
    const { sin, cos } = Math;
    const S = sin(angle);
    const C = cos(angle);
    // prettier-ignore
    return new Mat([
            1, 0, 0,
            0, C, S,
            0, -S, C
        ]);
  },
  /**
   * create Y-rotation matrix
   * @param angle angle in radians
   */
  rotY(angle) {
    const { sin, cos } = Math;
    const S = sin(angle);
    const C = cos(angle);
    // prettier-ignore
    return new Mat([
            C, 0, -S,
            0, 1, 0,
            S, 0, C
        ]);
  },
  /**
   * create Z-rotation matrix
   * @param angle angle in radians
   */
  rotZ(angle) {
    const { sin, cos } = Math;
    const S = sin(angle);
    const C = cos(angle);
    // prettier-ignore
    return new Mat([
            C, S, 0,
            -S, C, 0,
            0, 0, 1
        ]);
  },
};
const Mat4 = {
  /**
   * create 4x4 identity matrix
   */
  identity() {
    // prettier-ignore
    return new Mat([
            1, 0, 0, 0,
            0, 1, 0, 0,
            0, 0, 1, 0,
            0, 0, 0, 1
        ]);
  },
  /**
   * create translation matrix
   * @param x translation in X direction
   * @param y translation in Y direction
   * @param z translation in Z direction
   */
  translation(x, y, z) {
    // prettier-ignore
    return new Mat([
            1, 0, 0, 0,
            0, 1, 0, 0,
            0, 0, 1, 0,
            x, y, z, 1
        ]);
  },
  /**
   * create scaling matrix
   * @param sx X-scale factor
   * @param sy Y-scale factor
   * @param sz Z-scale factor
   */
  scaling(sx, sy, sz) {
    // prettier-ignore
    return new Mat([
            sx, 0, 0, 0,
            0, sy, 0, 0,
            0, 0, sz, 0,
            0, 0, 0, 1
        ]);
  },
  /**
   * create x-rotation matrix
   * @param angle angle in radians
   */
  rotX(angle) {
    const { sin, cos } = Math;
    const S = sin(angle);
    const C = cos(angle);
    // prettier-ignore
    return new Mat([
            1, 0, 0, 0,
            0, C, S, 0,
            0, -S, C, 0,
            0, 0, 0, 1
        ]);
  },
  /**
   * create y-rotation matrix
   * @param angle angle in radians
   */
  rotY(angle) {
    const { sin, cos } = Math;
    const S = sin(angle);
    const C = cos(angle);
    // prettier-ignore
    return new Mat([
            C, 0, -S, 0,
            0, 1, 0, 0,
            S, 0, C, 0,
            0, 0, 0, 1
        ]);
  },
  /**
   * create z-rotation matrix
   * @param angle angle in radians
   */
  rotZ(angle) {
    const { sin, cos } = Math;
    const S = sin(angle);
    const C = cos(angle);
    // prettier-ignore
    return new Mat([
            C, S, 0, 0,
            -S, C, 0, 0,
            0, 0, 1, 0,
            0, 0, 0, 1
        ]);
  },
};

/**
 * Create a view matrix
 * @param eye position of the eye is (where you are)
 * @param center position where you want to look at
 * @param up it's a normalized vector, quite often (0,1,0)
 * @returns view matrix
 * @see https://www.khronos.org/opengl/wiki/GluLookAt_code
 */
function lookAt(eye, center, up) {
  const forward = eye.sub(center).normalized;
  const side = forward.cross(up).normalized;
  const up2 = side.cross(forward);
  // prettier-ignore
  return new Mat([
        side.x, side.y, side.z, 0,
        up2.x, up2.y, up2.z, 0,
        -forward.x, -forward.y, -forward.z, 0,
        0, 0, 0, 1
    ]);
}

/**
 * creates a transformation that produces a parallel projection
 * @param left coordinate for the left vertical clipping planes.
 * @param right coordinate for the right vertical clipping planes.
 * @param bottom coordinate for the bottom horizontal clippling pane.
 * @param top coordinate for the top horizontal clipping pane
 * @param zNear Specify the distances to the nearer and farther depth clipping planes. These values are negative if the plane is to be behind the viewer.
 * @param zFar Specify the distances to the nearer and farther depth clipping planes. These values are negative if the plane is to be behind the viewer.
 * @returns 4x4 orthographic transformation matrix
 * @see https://www.khronos.org/registry/OpenGL-Refpages/gl2.1/xhtml/glOrtho.xml
 */
function ortho(left, right, bottom, top, zNear, zFar) {
  const tx = -(right + left) / (right - left);
  const ty = -(top + bottom) / (top - bottom);
  const tz = -(zFar + zNear) / (zFar - zNear);
  // prettier-ignore
  return new Mat([
        2 / (right - left), 0, 0,
        0, 0, 2 / (top - bottom), 0,
        0, 0, 0, -2 / (zFar - zNear),
        0, tx, ty, tz, 1
    ]);
}
// glFrustum(left, right, bottom, top, zNear, zFar)
/**
 * creates a perspective matrix that produces a perspective projection
 * @param left coordinates for the vertical left clipping pane
 * @param right coordinates for the vertical right clipping pane
 * @param bottom coordinates for the horizontal bottom clipping pane
 * @param top coodinates for the top horizontal clipping pane
 * @param zNear Specify the distances to the near depth clipping plane. Must be positive.
 * @param zFar Specify the distances to the far depth clipping planes. Must be positive.
 * @returns 4x4 perspective projection matrix
 * @see https://www.khronos.org/registry/OpenGL-Refpages/gl2.1/xhtml/glFrustum.xml
 */
function frustum(left, right, bottom, top, zNear, zFar) {
  const t1 = 2 * zNear;
  const t2 = right - left;
  const t3 = top - bottom;
  const t4 = zFar - zNear;
  // prettier-ignore
  return new Mat([t1 / t2, 0, 0, 0,
        0, t1 / t3, 0, 0,
        (right + left) / t2, (top + bottom) / t3, (-zFar - zNear) / t4, -1,
        0, 0, (-t1 * zFar) / t4, 0]);
}
/**
 * creates a perspective projection matrix
 * @param fieldOfView Specifies the field of view angle, in degrees, in the y direction.
 * @param aspectRatio Specifies the aspect ratio that determines the field of view in the x direction. The aspect ratio is the ratio of x (width) to y (height).
 * @param zNear Specifies the distance from the viewer to the near clipping plane (always positive).
 * @param zFar Specifies the distance from the viewer to the far clipping plane (always positive).
 * @returns 4x4 perspective projection matrix
 */
function perspective(fieldOfView, aspectRatio, zNear, zFar) {
  const y = zNear * Math.tan((fieldOfView * Math.PI) / 360);
  const x = y * aspectRatio;
  return frustum(-x, x, -y, y, zNear, zFar);
}

/** @class Geometry */
class Geometry {
  constructor(vertices, faces, normals, texCoords) {
    this.vertices = vertices;
    this.faces = faces;
    this.normals = normals;
    this.texCoords = texCoords;
  }
  /**
   * converts to triangle array
   */
  toTriangles() {
    const { faces, vertices } = this;
    return faces
      .map((face) => {
        if (face.length === 3) {
          return face.map((vertexIndex) => vertices[vertexIndex]);
        }
        if (face.length === 4) {
          const q = face.map((vertexIndex) => vertices[vertexIndex]);
          return [q[0], q[1], q[3], q[3], q[1], q[2]];
        }
        throw Error('not supported');
      })
      .flat()
      .map((v) => v.toArray())
      .flat();
  }
  /**
   * Calculate the surface normal of a triangle
   * @param p1 3d vector of point 1
   * @param p2 3d vector of point 2
   * @param p3 3d vector of point 3
   */
  static calculateSurfaceNormal(p1, p2, p3) {
    const u = p2.sub(p1);
    const v = p3.sub(p1);
    return new Vec(
      u.x * v.z - u.z * v.y,
      u.z * v.x - u.x * v.z,
      u.x * v.y - u.y * v.x
    );
  }
  /**
   * Create a box geometry with the sizes a * b * c,
   * centered at (0, 0, 0), 2 triangles per side.
   *
   * @name box
   * @param {number} sizeA
   * @param {number} sizeB
   * @param {number} sizeC
   */
  static box(sizeA = 1.0, sizeB = 1.0, sizeC = 1.0) {
    const a = sizeA * 0.5;
    const b = sizeB * 0.5;
    const c = sizeC * 0.5;
    const vertices = [
      [-a, -b, -c],
      [a, -b, -c],
      [-a, b, -c],
      [a, b, -c],
      [-a, -b, c],
      [a, -b, c],
      [-a, b, c],
      [a, b, c],
    ].map((v) => new Vec(...v));
    //     0______1
    //   4/|____5/|
    //   |2|____|_|3
    //   |/ ____|/
    //  6       7
    const faces = [
      // back
      [0, 1, 2],
      [2, 1, 3],
      // front
      [5, 4, 7],
      [7, 4, 6],
      // left
      [4, 0, 6],
      [6, 0, 2],
      // right
      [7, 5, 1],
      [1, 7, 3],
      // top
      [1, 0, 5],
      [5, 0, 4],
      // bottom
      [2, 3, 6],
      [6, 3, 7],
    ];
    const normals = faces.map((f) =>
      Geometry.calculateSurfaceNormal(
        vertices[f[0]],
        vertices[f[1]],
        vertices[f[2]]
      )
    );
    return new Geometry(vertices, faces, normals, []);
  }
  /**
   * create a cube
   * @param size
   */
  static cube(size = 1.0) {
    return Geometry.box(size, size, size);
  }
  /**
   * create a plane grid mesh
   * @param x x-coord of the top left corner
   * @param y y-coord of the top left corner
   * @param width width of the plane
   * @param height height of the plane
   * @param rows number of rows
   * @param cols number of columns
   */
  static grid(x, y, width, height, rows, cols) {
    const deltaX = width / cols;
    const deltaY = height / rows;
    const vertices = Array((cols + 1) * (rows + 1))
      .fill(0)
      .map((_, i) => {
        const ix = i % cols;
        const iy = (i / cols) | 0;
        return new Vec(x + ix * deltaX, y + iy * deltaY, 0);
      });
    const faces = Array(rows * cols)
      .fill(0)
      .map((_, i) => {
        const ix = i % cols;
        const iy = (i / cols) | 0;
        const idx = iy * rows + ix;
        return [
          [idx, idx + 1, idx + rows],
          [idx + 1, idx + rows + 1, idx + rows],
        ];
      })
      .flat(1);
    const normals = faces.map((f) =>
      Geometry.calculateSurfaceNormal(
        vertices[f[0]],
        vertices[f[1]],
        vertices[f[2]]
      )
    );
    return new Geometry(vertices, faces, normals, []);
  }
  /**
   * Create sphere geometry
   * @param r radius
   * @param sides number of sides (around the sphere)
   * @param segments number of segments (from top to bottom)
   * @see adapted from https://vorg.github.io/pex/docs/pex-gen/Sphere.html
   */
  static sphere(r = 0.5, sides = 36, segments = 18) {
    const vertices = [];
    const texCoords = [];
    const faces = [];
    const dphi = 360 / sides;
    const dtheta = 180 / segments;
    const evalPos = (theta, phi) => {
      const deg = Math.PI / 180.0;
      var pos = new Vec(
        r * Math.sin(theta * deg) * Math.sin(phi * deg),
        r * Math.cos(theta * deg),
        r * Math.sin(theta * deg) * Math.cos(phi * deg)
      );
      return pos;
    };
    for (let segment = 0; segment <= segments; segment++) {
      const theta = segment * dtheta;
      for (let side = 0; side <= sides; side++) {
        const phi = side * dphi;
        const pos = evalPos(theta, phi);
        const texCoord = new Vec(phi / 360.0, theta / 180.0);
        vertices.push(pos);
        texCoords.push(texCoord);
        if (segment === segments) continue;
        if (side === sides) continue;
        if (segment == 0) {
          // first segment uses triangles
          faces.push([
            segment * (sides + 1) + side,
            (segment + 1) * (sides + 1) + side,
            (segment + 1) * (sides + 1) + side + 1,
          ]);
        } else if (segment == segments - 1) {
          // last segment also uses triangles
          faces.push([
            segment * (sides + 1) + side,
            (segment + 1) * (sides + 1) + side + 1,
            segment * (sides + 1) + side + 1,
          ]);
        } else {
          // A --- B
          // D --- C
          const A = segment * (sides + 1) + side;
          const B = (segment + 1) * (sides + 1) + side;
          const C = (segment + 1) * (sides + 1) + side + 1;
          const D = segment * (sides + 1) + side + 1;
          faces.push([A, B, D]);
          faces.push([B, C, D]);
        }
      }
    }
    const normals = faces.map((f) =>
      Geometry.calculateSurfaceNormal(
        vertices[f[0]],
        vertices[f[1]],
        vertices[f[2]]
      )
    );
    return new Geometry(vertices, faces, normals, texCoords);
  }
}

export {
  Geometry,
  Mat,
  Mat2,
  Mat3,
  Mat4,
  Vec,
  frustum,
  lookAt,
  ortho,
  perspective,
};
