const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
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
    new CleanWebpackPlugin(['styleguide-dist'], { root: paths.root() }),
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
        exclude: [/\.(js|jsx|mjs|html|json|scss)$/],
        loader: 'file-loader',
        options: {
          name: 'assets/[name].[hash].[ext]',
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
