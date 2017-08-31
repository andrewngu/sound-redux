const path = require('path');
const webpack = require('webpack');
const ignore = new webpack.IgnorePlugin(/\.svg$/);
const nodeModulesDir = path.resolve(__dirname, 'node_modules');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

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
    publicPath: 'http://localhost:8080/',
    filename: './server/public/js/[name].js',
  },
  module: {
    loaders: [
      { test: /\.js$/, loader: 'babel?' + JSON.stringify({presets: ['react', 'es2015', 'stage-0']}), exclude: [nodeModulesDir] },
      { test: /\.scss$/, loader: ExtractTextPlugin.extract('style', 'css!postcss!sass') },
    ],
  },
  plugins: [
    ignore,
    new ExtractTextPlugin('./server/public/css/main.css'),
    new webpack.optimize.CommonsChunkPlugin('vendor', './server/public/js/vendor.js'),
  ],
};
