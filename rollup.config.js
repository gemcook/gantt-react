const fs = require('fs-extra');
const path = require('path');
const resolve = require('rollup-plugin-node-resolve');
const commonjs = require('rollup-plugin-commonjs');
const babel = require('rollup-plugin-babel');
const postcss = require('rollup-plugin-postcss');

const libPath = './lib';
const buildCachePath = './.build-cache';

export default [
  {
    external: ['react', 'react-dom'],
    input: 'src/components/index.ts',
    plugins: [
      {
        name: 'clean lib dir',
        buildStart: async () => {
          const libExists = await fs.pathExists(libPath);
          if (libExists) {
            fs.emptyDirSync(libPath);
          }
        },
        buildEnd: err => {
          if (err) {
            throw err;
          }
        },
      },
      {
        name: 'create chace',
        buildStart: async () => {
          const exists = await fs.pathExists(buildCachePath);

          if (exists) {
            await _renameFilePaths(buildCachePath);
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
];

const _renameFilePaths = async (file, currentPath) => {
  let currentFullPath = '';
  if (currentPath) {
    currentFullPath = currentPath;
  } else {
    currentFullPath = buildCachePath;
  }

  const isDir = await _isDirPath(file);
  if (isDir) {
    const filePaths = await fs.readdir(file);

    for (const filePath of filePaths) {
      const currentFullFilePath = path.join(currentFullPath, filePath);

      const isDir = await _isDirPath(currentFullFilePath);
      if (isDir) {
        await _renameFilePaths(currentFullFilePath, currentFullFilePath);
      } else {
        await _renameFile(currentFullFilePath);
      }
    }
  } else {
    const fullFilePath = path.join(currentFullPath, file);
    await _renameFile(fullFilePath);
  }
};

const _isDirPath = async file => {
  const isExists = await fs.pathExists(file);
  if (isExists) {
    const stat = await fs.stat(file);
    return stat.isDirectory();
  } else {
    return false;
  }
};

const _renameFile = async file => {
  const isExists = await fs.pathExists(file);
  if (isExists) {
    const newFilePath = file.replace(/\.d/g, '');
    fs.rename(file, newFilePath);
  }
};
