const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const paths = require('./paths');

module.exports = {
  stats: {
    modules: false,
    children: false,
  },
  plugins: [
    new CopyWebpackPlugin([
      { from: paths.client('locales'), to: paths.styleguideDist('locales') },
    ]),
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      template: paths.client('index.html'),
    }),
  ],
  output: {
    filename: 'bundles/[name].[hash].js',
    path: paths.styleguideDist(),
    publicPath: '/',
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx|mjs)$/,
        use: 'babel-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/,
        type: 'asset/resource',
        generator: {
          filename: 'assets/[name].[hash][ext]',
        },
      },
    ],
  },
  resolve: {
    modules: [
      path.resolve(__dirname, '../styleguide/client'),
      path.resolve(__dirname, '../src'),
      'node_modules',
    ],
    extensions: ['.js', '.mjs', '.jsx'],
    symlinks: false,
  },
};
