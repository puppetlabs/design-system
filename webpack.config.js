const webpack = require('webpack');
const path = require('path');

const env = process.env.NODE_ENV || 'development';

module.exports = {
  mode: env,
  entry: {
    library: './source/index.js',
  },
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: '[name].js',
    libraryTarget: 'commonjs2',
  },
  externals: {
    react: {
      commonjs: 'react',
    },
    'react-dom': {
      commonjs: 'react-dom',
    },
    moment: {
      commonjs: 'moment',
    },
    'moment-timezone': {
      commonjs: 'moment-timezone',
    },
  },
  module: {
    rules: [{
      test: /\.js$/,
      exclude: /node_modules/,
      use: {
        loader: 'babel-loader',
        options: {
          presets: [
            'es2015',
            'react',
          ],
        },
      },
    }],
  },
  plugins: [
    new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
  ],
};
