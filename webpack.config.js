var path = require('path');
const webpack = require('webpack');
var SRC_DIR = path.join(__dirname, './client/src');
var DIST_DIR = path.join(__dirname, './client/dist');
require('dotenv').config();

const common = {
  mode: 'production',  
  externals: {
    // define newrelic as an external library
    // http://webpack.github.io/docs/configuration.html#externals
    newrelic: true
  },
  module: {
    rules: [{
      test: /\.jsx?/,
      include: SRC_DIR,
      loader: 'babel-loader',
      query: {
        presets: ['react', 'es2015'],
      }
    },
    {
      test: /\.css$/,
      loader: 'style-loader!css-loader',
    },
  ]}
};

const client = {
  entry: `${SRC_DIR}/index.js`,
  output: {
    filename: 'app.js',
    path: DIST_DIR
  },
};

const server = {
  entry: `${SRC_DIR}/components/Review.jsx`,
  target: 'node',
  output: {
    filename: 'app-server.js',
    path: DIST_DIR,
    libraryTarget: 'commonjs-module',
  },
};

module.exports = [
  Object.assign({}, common, client),
  Object.assign({}, common, server)
];