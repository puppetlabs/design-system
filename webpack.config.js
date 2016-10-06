const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
  devServer: {
    publicPath: '/build/',
    colors: true,
    quiet: false,
    noInfo: false,
    inline: true,
    lazy: false,
  },
  watch: true,
  entry: {
    app: [
      'webpack-dev-server/client?http://localhost:8080',
      './source/react/app.js',
    ],
  },
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: 'bundle.js',
  },
  module: {
    loaders: [{
      test: /\.scss$/,
      exclude: /node_modules/,
      loaders: ExtractTextPlugin.extract('css!sass'),
    },
    {
      test: /\.js$/,
      exclude: /node_modules/,
      loader: require.resolve('babel-loader'),
      query: {
        presets: [
          require.resolve('babel-preset-es2015'),
          require.resolve('babel-preset-react'),
        ],
      },
    }],
  },
  plugins: [
    new ExtractTextPlugin({ filename: 'bundle.css', allChunks: true }),
  ],
};
