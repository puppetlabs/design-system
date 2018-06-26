const webpack = require('webpack');
const merge = require('webpack-merge');
const commonConfig = require('./common.webpack.config.js');
const paths = require('./paths');

module.exports = merge(commonConfig, {
  entry: ['webpack-hot-middleware/client', paths.client('index.jsx')],
  mode: 'development',
  devtool: 'cheap-module-source-map',
  plugins: [
    new webpack.NamedModulesPlugin(),
    new webpack.HotModuleReplacementPlugin(),
  ],
  module: {
    rules: [
      {
        test: /\.module\.scss$/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              modules: true,
              importLoaders: 1,
              localIdentName: '[local]--[hash:base64:5]',
              camelCase: true,
            },
          },
          'sass-loader',
        ],
      },
      {
        test: /\.scss$/,
        exclude: /\.module\.scss$/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: { importLoaders: 1 },
          },
          'sass-loader',
        ],
      },
    ],
  },
});
