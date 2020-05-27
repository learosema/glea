import GLea from './glea';

const frag = 'void main() {}';
const vert = 'void main() {}';

const glea = new GLea({
  shaders: [GLea.fragmentShader(frag), GLea.vertexShader(vert)],
}).create();

describe('GLea initialization', () => {
  it('should create an instance of GLea', () => {
    expect(glea).toBeInstanceOf(GLea);
  });

  it('should create a default position buffer for you', () => {
    expect(glea.bufferFactory).toBeTruthy();
    expect(glea.bufferFactory.position).toBeTruthy();
  });

  it('should automagically create a canvas element', () => {
    const canvas = document.querySelector('canvas');
    expect(canvas).not.toBeNull();
  });

  it('should hold an underlying WebGLRenderingContext', () => {
    expect(glea.gl).toBeInstanceOf(WebGLRenderingContext);
  });

  it('should automagically provide a default css style for you', () => {
    const style = document.querySelector('style');
    expect(style).not.toBeNull();
  });

  it('should carry the canvas with and height', () => {
    const width = glea.width;
    const height = glea.height;
    expect(width).not.toBeNaN();
    expect(height).not.toBeNaN();
  });
});

describe('createTexture helper', () => {
  it('should return a WebGLTexture object', () => {
    const texture = glea.createTexture(0);
    expect(texture).toBeTruthy();
  });
});

describe('uniform helper', () => {
  it('should accept a number', () => {
    expect(() => {
      // prettier-ignore
      glea.uni('val', 1);
    }).not.toThrowError();
  });
});

describe('uniform int helper', () => {
  it('should accept a number', () => {
    expect(() => {
      // prettier-ignore
      glea.uniI('intval', 2);
    }).not.toThrowError();
  });
});

describe('uniform matrix helper', () => {
  it('should accept 2D matrices', () => {
    expect(() => {
      // prettier-ignore
      glea.uniM('matrix2D', [
        1, 0, 
        0, 1
      ]);
    }).not.toThrowError();
  });

  it('should accept 3D matrices', () => {
    expect(() => {
      // prettier-ignore
      glea.uniM('matrix3D', [
        1, 0, 0,
        0, 1, 0,
        0, 0, 1
      ]);
    }).not.toThrowError();
  });

  it('should accept 4D matrices', () => {
    expect(() => {
      // prettier-ignore
      glea.uniM('matrix4D', [
        1, 0, 0, 0,
        0, 1, 0, 0,
        0, 0, 1, 0,
        0, 0, 0, 1
      ]);
    }).not.toThrowError();
  });

  it('should throw an error for anything else than 2D, 3D, 4D matrices', () => {
    expect(() => {
      // prettier-ignore
      glea.uniM('unsupported_matrix', [
        1, 0, 0
      ]);
    }).toThrowError();
  });
});

describe('uniform vector helper', () => {
  it('should accept 2D vectors', () => {
    expect(() => {
      glea.uniV('v2', [1, 2]);
    }).not.toThrowError();
  });

  it('should accept 3D vectors', () => {
    expect(() => {
      glea.uniV('v3', [1, 2, 3]);
    }).not.toThrowError();
  });

  it('should accept 4D vectors', () => {
    expect(() => {
      glea.uniV('v4', [1, 2, 3, 4]);
    }).not.toThrowError();
  });

  it('should throw an error with an array length other than 2,3 or 4.', () => {
    expect(() => {
      glea.uniV('v5', [1]);
    }).toThrowError();
  });
});

describe('uniform int vector helper', () => {
  it('should accept 2D vectors', () => {
    expect(() => {
      glea.uniIV('v2', [1, 2]);
    }).not.toThrowError();
  });

  it('should accept 3D vectors', () => {
    expect(() => {
      glea.uniIV('v3', [1, 2, 3]);
    }).not.toThrowError();
  });

  it('should accept 4D vectors', () => {
    expect(() => {
      glea.uniIV('v4', [1, 2, 3, 4]);
    }).not.toThrowError();
  });

  it('should throw an error with an array length other than 2,3 or 4.', () => {
    expect(() => {
      glea.uniIV('v5', [1]);
    }).toThrowError();
  });
});

describe('clear', () => {
  it('should not throw an error', () => {
    expect(() => {
      glea.clear();
    }).not.toThrowError();
  });
});

describe('updateBuffer', () => {
  it('should not throw an error', () => {
    expect(() => {
      glea.updateBuffer('position');
    }).not.toThrowError();
  });
});
