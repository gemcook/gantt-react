const fs = require('fs-extra');
const resolve = require('rollup-plugin-node-resolve');
const commonjs = require('rollup-plugin-commonjs');
const babel = require('rollup-plugin-babel');
const postcss = require('rollup-plugin-postcss');
const typescript = require('rollup-plugin-typescript2');
const cpx = require('cpx');

export default [
  {
    external: ['react', 'react-dom'],
    input: 'src/components/index.ts',
    plugins: [
      {
        name: 'clean lib dir',
        buildStart: async () => {
          const libPath = './lib';
          const exists = await fs.pathExists(libPath);
          if (exists) {
            fs.emptyDirSync(libPath);
          }
        },
        buildEnd: err => {
          if (err) {
            throw err;
          }
        },
      },
      babel({
        runtimeHelpers: true,
        extensions: ['.js', '.jsx', '.ts', '.tsx', '.json'],
        exclude: 'node_modules/**',
        babelrc: false,
        presets: [
          [
            '@babel/preset-env',
            {
              targets: {node: 'current'},
              corejs: 3,
              useBuiltIns: 'usage',
              loose: true,
              modules: false,
            },
          ],
          '@babel/preset-typescript',
          ['@babel/preset-react', {useBuiltIns: true}],
        ],
        plugins: [
          [
            '@babel/plugin-transform-runtime',
            {
              corejs: 3,
            },
          ],
          ['@babel/proposal-class-properties', {loose: true}],
          ['@babel/plugin-proposal-private-methods', {loose: true}],
        ],
      }),
      resolve({
        extensions: ['.js', '.jsx', '.ts', '.tsx', '.json'],
        // Node.js の fs, path 等のモジュールを bundle 対象外にする
        preferBuiltins: false,
      }),
      commonjs({
        include: 'node_modules/**',
        namedExports: {
          'node_modules/@gemcook/utils/lib/index.js': ['collection'],
        },
      }),
      postcss({
        extensions: ['.css', '.scss'],
        extract: 'lib/styles/index.css',
      }),
    ],
    output: {
      file: 'lib/index.js',
      format: 'umd',
      globals: {
        react: 'React',
        'react-dom': 'ReactDOM',
      },
      name: 'GanttReact',
    },
  },
  {
    external: ['react', 'react-dom'],
    input: 'src/components/index.ts',
    plugins: [
      typescript({
        tsconfigOverride: {include: ['src/components']},
        typescript: require('typescript'),
      }),
      {
        name: 'copy dir',
        buildStart: () => {
          cpx.copy('./src/components/**/*.d.ts', './lib/@types');
        },
        buildEnd: err => {
          if (err) {
            throw err;
          }
        },
      },
    ],
    output: {
      file: 'lib/@types/index.js',
      format: 'cjs',
    },
  },
];
