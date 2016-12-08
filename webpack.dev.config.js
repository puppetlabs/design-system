const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
  devServer: {
    publicPath: '/build/',
    historyApiFallback: true,
    colors: true,
    quiet: false,
    noInfo: false,
    inline: true,
    lazy: false,
  },
  entry: {
    styleguide: [
      './source/react/app.js',
    ],
  },
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: '[name].js',
  },
  module: {
    loaders: [{
      test: /\.scss$/,
      exclude: /node_modules/,
      loaders: ExtractTextPlugin.extract('css-loader!sass-loader'),
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
    new ExtractTextPlugin({ filename: 'styleguide.css', allChunks: true }),
  ],
};
