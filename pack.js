/* eslint-disable @typescript-eslint/no-var-requires */
const { default: pack } = require('packx');
const argv = require('yargs').argv;
const path = require('path');

const isBuild = !!argv.build;

pack(!isBuild, {
  entry: {
    index: `./demo/index`,
  },
  output: {
    path: path.resolve(__dirname, 'docs'),
    publicPath: '',
  },
  devServer: {
    port: 9200,
  },
  resolve: {
    alias: {
      'w-touch': path.resolve(__dirname, './src'),
    },
  },
});
