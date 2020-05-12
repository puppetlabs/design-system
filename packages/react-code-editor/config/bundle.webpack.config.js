const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const nodeExternals = require('webpack-node-externals');
const path = require('path');
const paths = require('./paths');

module.exports = {
  entry: paths.src('index.js'),
  mode: 'production',
  target: 'node',
  devtool: 'source-map',
  plugins: [
    new CleanWebpackPlugin(),
    new MiniCssExtractPlugin({
      filename: 'react-code-editor.css',
      chunkFilename: '[id].[hash].css',
    }),
  ],
  stats: {
    modules: false,
    children: false,
  },
  output: {
    filename: 'react-code-editor.js',
    library: 'react-code-editor',
    libraryTarget: 'umd',
    path: paths.dist(),
    publicPath: './',
  },
  externals: [
    nodeExternals({
      modulesDir: path.resolve(__dirname, '../../../node_modules'),
    }),
    nodeExternals({ modulesDir: path.resolve(__dirname, '../node_modules') }),
  ],
  module: {
    rules: [
      {
        test: /\.(js|jsx|mjs)$/,
        use: 'babel-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.module\.scss$/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: {
              modules: true,
              importLoaders: 2,
              localIdentName: '[hash:base64:5]',
              camelCase: true,
            },
          },
          'postcss-loader',
          'resolve-url-loader',
          { loader: 'sass-loader', options: { sourceMap: true } },
        ],
      },
      {
        test: /\.scss$/,
        exclude: /\.module\.scss$/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: { importLoaders: 2 },
          },
          'postcss-loader',
          'resolve-url-loader',
          { loader: 'sass-loader', options: { sourceMap: true } },
        ],
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
    modules: [path.resolve(__dirname, '../src'), 'node_modules'],
    extensions: ['.js', '.mjs', '.jsx'],
  },
};
