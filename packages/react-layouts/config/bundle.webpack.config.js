const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const nodeExternals = require('webpack-node-externals');
const path = require('path');
const paths = require('./paths');

module.exports = {
  entry: {
    index: paths.src('index.js'),
    css: paths.src('index.scss'),
    Confirmation: paths.src('auth/Confirmation/index.js'),
    ForgotPassword: paths.src('auth/ForgotPassword/index.js'),
    ForgotPasswordSent: paths.src('auth/ForgotPasswordSent/index.js'),
    Login: paths.src('auth/Login/index.js'),
    ResetPassword: paths.src('auth/ResetPassword/index.js'),
    ResetPasswordSuccess: paths.src('auth/ResetPasswordSuccess/index.js'),
  },
  mode: 'production',
  target: 'node',
  devtool: 'source-map',
  plugins: [
    new CleanWebpackPlugin(),
    new MiniCssExtractPlugin({
      filename: 'react-layouts.css',
      chunkFilename: '[id].[hash].css',
    }),
  ],
  stats: {
    modules: false,
    children: false,
  },
  output: {
    filename: '[name].js',
    chunkFilename: '[chunkhash].js',
    library: 'react-layouts',
    libraryTarget: 'umd',
    path: paths.dist(),
    publicPath: './',
  },
  optimization: {
    splitChunks: {
      chunks: 'all',
      minSize: 0,
    },
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
