const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const { assoc, compose, filter, startsWith, reduce } = require('ramda');

const paths = require('./paths');

const fs = require('fs');

const nodeModules = compose(
  reduce((nm, mod) => assoc(mod, `commonjs ${mod}`, nm), {}),
  filter(mod => !startsWith('.', mod)),
  fs.readdirSync,
)('node_modules');

module.exports = {
  entry: paths.src('index.js'),
  mode: 'production',
  target: 'node',
  devtool: 'source-map',
  plugins: [
    new CleanWebpackPlugin(['dist'], { root: paths.root() }),
    new MiniCssExtractPlugin({
      filename: 'uikit.css',
      chunkFilename: '[id].[hash].css',
    }),
  ],
  stats: {
    modules: false,
    children: false,
  },
  output: {
    filename: 'uikit.js',
    library: 'uikit',
    libraryTarget: 'umd',
    path: paths.dist(),
    publicPath: './',
  },
  externals: nodeModules,
  module: {
    rules: [
      {
        test: /\.(js|jsx|mjs)$/,
        use: 'babel-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.css$/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: {
              modules: true,
              importLoaders: 1,
              localIdentName: '[hash:base64:5]',
              camelCase: true,
            },
          },
          'postcss-loader',
        ],
      },
      {
        exclude: [/\.(js|jsx|mjs)$/, /\.html$/, /\.json$/, /\.css$/],
        loader: 'file-loader',
        options: {
          name: 'assets/[name].[ext]',
        },
      },
    ],
  },
  resolve: {
    extensions: ['.js', '.mjs', '.jsx'],
  },
};
