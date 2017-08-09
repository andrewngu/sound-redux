const webpack = require('webpack');

var ignore = new webpack.IgnorePlugin(/\.svg$/)

module.exports = {
  plugins: [ignore],
  module: {
    loaders: [
      { test: /\.js$/, loaders: ['react-hot', 'babel?' + JSON.stringify({presets: ['react', 'es2015', 'stage-0']})], exclude: /node_modules/ },
      { test: /\.scss$/, loaders: ['style', 'css', 'postcss', 'sass'] },
    ],
  },
};
