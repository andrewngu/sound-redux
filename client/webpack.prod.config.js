const path = require('path');
const webpack = require('webpack');
const ignore = new webpack.IgnorePlugin(/\.svg$/);
const nodeModulesDir = path.resolve(__dirname, 'node_modules');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: {
    main: './scripts/main.js',
    vendor: [
      'lodash',
      'moment',
      'normalizr',
      'react',
      'redux',
      'soundcloud',
    ],
  },
  output: {
    filename: '[name].js',
    path: path.join(__dirname, 'server/public/js'),
  },
  module: {
    loaders: [
      { test: /\.js$/, loader: 'babel?' + JSON.stringify({presets: ['react', 'es2015', 'stage-0']}), exclude: [nodeModulesDir] },
      { test: /\.scss$/, loader: ExtractTextPlugin.extract('style', 'css!postcss!sass') },
    ],
  },
  plugins: [
    ignore,
    new ExtractTextPlugin('../css/main.css'),
    new webpack.optimize.CommonsChunkPlugin('vendor', 'vendor.js'),
    new HtmlWebpackPlugin({
      filename: '../index.html',
      template: './server/html/index.html',
    }),
  ],
};
