const autoprefixer = require('autoprefixer');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const OfflinePlugin = require('offline-plugin');
const path = require('path');
const webpack = require('webpack');

module.exports = {
  context: path.resolve('client/src/'),
  entry: {
    main: './index.jsx',
    vendor: [
      'babel-polyfill',
      'camelize',
      'isomorphic-fetch',
      'js-cookie',
      'lodash.merge',
      'moment',
      'normalizr',
      'offline-plugin/runtime',
      'path-to-regexp',
      'prop-types',
      'react',
      'react-dom',
      'react-redux',
      'redux',
      'redux-thunk',
      'reselect',
      'soundcloud',
    ],
  },
  output: {
    filename: 'js/[name].js',
    path: path.resolve('dist/public/'),
  },
  resolve: {
    extensions: ['.js', '.jsx'],
  },
  module: {
    loaders: [
      {
        test: /\.(js|jsx)$/,
        loaders: ['babel-loader'],
        exclude: /node_modules/,
      },
      {
        test: /\.scss$/,
        loader: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [
            { loader: 'css-loader' },
            {
              loader: 'postcss-loader',
              options: {
                plugins: () => [autoprefixer({ browsers: ['> 1%', 'IE >= 10'] })],
              },
            },
            { loader: 'sass-loader' },
          ],
        }),
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({ template: '../public/index.html' }),
    new ExtractTextPlugin('css/main.css'),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('production'),
    }),
    new webpack.IgnorePlugin(/\.svg$/),
    new webpack.optimize.CommonsChunkPlugin({ name: 'vendor', filename: 'js/vendor.js' }),
    new webpack.optimize.UglifyJsPlugin({
      parallel: {
        cache: true,
        workers: 2,
      },
    }),
    new OfflinePlugin({}),
  ],
};
