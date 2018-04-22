const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const paths = require('./paths');

module.exports = {
  entry: './src/client/index.jsx',
  stats: {
    modules: false,
    children: false,
  },
  plugins: [
    new CleanWebpackPlugin(['dist'], { root: paths.root() }),
    new HtmlWebpackPlugin({
      template: paths.client('index.html'),
    }),
  ],
  output: {
    filename: '[name].[hash].js',
    path: paths.dist(),
    publicPath: '/',
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        use: 'babel-loader',
        exclude: /node_modules/,
      },
    ],
  },
};
