const { merge } = require('webpack-merge');
const common = require('./webpack.common.js');
const path = require('path');
const webpack = require('webpack');

module.exports = merge(common, {
  mode: 'production',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
    clean: true, // This ensures the output directory is cleaned before each build
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env.ACCESS_TOKEN': JSON.stringify(process.env.ACCESS_TOKEN)
    })
  ]
});