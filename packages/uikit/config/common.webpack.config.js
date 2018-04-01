const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const { map } = require('ramda');

const paths = map(p => path.resolve.bind(null, __dirname, '..', p), {
  root: '',
  client: 'src/client',
  server: 'src/server',
  dist: 'dist',
});

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
    publicPath: '',
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
