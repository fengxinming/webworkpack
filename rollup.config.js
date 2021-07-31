import buble from '@rollup/plugin-buble';
import nodeResolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import { terser } from 'rollup-plugin-terser';
import empty from 'rollup-plugin-empty';
import copy from 'rollup-plugin-copy';
import camelCase from 'lodash/camelCase';
import pkg from './package.json';
const moduleName = pkg.name.slice(7);

export default {
  input: 'src/index.js',
  plugins: [
    empty({
      silent: false,
      dir: 'dist'
    }),
    nodeResolve(),
    commonjs(),
    buble(),
    terser({
      include: /^.+\.min\.js$/
    }),
    copy({
      hook: 'writeBundle',
      targets: [
        { src: ['README.md', 'package.json'], dest: 'dist' }
      ]
    })
  ],
  output: [{
    file: 'dist/cjs.js',
    format: 'cjs',
    exports: 'auto'
  }, {
    file: 'dist/esm.js',
    format: 'esm'
  }, {
    file: 'dist/index.js',
    format: 'umd',
    name: camelCase(moduleName),
    exports: 'auto'
  }, {
    file: 'dist/index.min.js',
    format: 'umd',
    name: camelCase(moduleName),
    exports: 'auto'
  }]
};
