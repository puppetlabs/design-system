const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const config = {
  mode: 'none',
  devServer: {
    publicPath: '/build/',
    historyApiFallback: true,
    quiet: false,
    noInfo: false,
    inline: true,
    lazy: false,
  },
  entry: {
    styleguide: [
      path.join(__dirname, 'styleguide/js/app.js'),
    ],
  },
  output: {
    path: path.join(__dirname, 'build'),
    filename: '[name].js',
  },
  module: {
    rules: [
      {
        test: /\.scss$/,
        exclude: /node_modules/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: ['css-loader', 'sass-loader'],
        }),
      },
      {
        test: /\.js$/,
        exclude: [
          /node_modules/,
        ],
        use: {
          loader: 'babel-loader',
        },
      },
    ],
  },
  plugins: [
    new ExtractTextPlugin('styleguide.css'),
  ],
};

module.exports = config;
