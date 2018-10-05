const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const paths = require('./paths');

module.exports = {
  entry: paths.client('index.jsx'),
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
    filename: 'bundles/[name].[hash].js',
    path: paths.dist(),
    publicPath: process.env.ROUTER_BASENAME || '',
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
    modules: [path.resolve(__dirname, '../src/client'), 'node_modules'],
    extensions: ['.js', '.mjs', '.jsx'],
    symlinks: false,
  },
};
