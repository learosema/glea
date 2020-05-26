import typescript from '@rollup/plugin-typescript';

export default {
  input: 'src/glea.ts',
  output: [
    {
      file: 'dist/glea.js',
      format: 'es',
    },
    {
      file: 'dist/glea.umd.js',
      format: 'umd',
      name: 'GLea',
    },
  ],
  plugins: [typescript()],
};
