/* eslint-disable @typescript-eslint/no-var-requires */
const { default: pack } = require('packx');
const path = require('path');

pack(true, {
  entry: {
    index: `./demo/index`,
  },
  output: {
    path: path.resolve(__dirname, 'output'),
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
