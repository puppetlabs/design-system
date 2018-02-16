const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');

const root = (...p) => path.resolve(__dirname, '..', ...p);

const paths = {
  root,
  client: (...p) => root('src', 'client', ...p),
  server: (...p) => root('src', 'server', ...p),
  dist: (...p) => root('dist', ...p),
};

module.exports = {
  entry: './src/client/index.jsx',
  plugins: [
    new CleanWebpackPlugin(['dist'], { root: paths.root() }),
    new HtmlWebpackPlugin({
      template: paths.client('index.html'),
    }),
  ],
  output: {
    filename: 'bundle.js',
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
      {
        test: /\.css$/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: { modules: true, importLoaders: 1 },
          },
          'postcss-loader',
        ],
      },
    ],
  },
};
