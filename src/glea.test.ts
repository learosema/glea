import GLea from './glea';

describe('GLea initialization', () => {
  const frag = 'void main() {}';
  const vert = 'void main() {}';

  const glea = new GLea({
    shaders: [GLea.fragmentShader(frag), GLea.vertexShader(vert)],
  });

  it('should create an instance of GLea', () => {
    expect(glea).toBeInstanceOf(GLea);
  });

  it('should create a default position buffer for you', () => {
    expect(glea.bufferFactory).toBeTruthy();
    expect(glea.bufferFactory.position).toBeTruthy();
  });

  glea.create();

  it('should automagically create a canvas element', () => {
    const canvas = document.querySelector('canvas');
    expect(canvas).not.toBeNull();
  });

  it('should automagically provide a default css style for you', () => {
    const style = document.querySelector('style');
    expect(style).not.toBeNull();
  });
});
