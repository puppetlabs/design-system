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
        test: /\.css$/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              modules: true,
              importLoaders: 1,
              localIdentName: '[path][name]__[local]--[hash:base64:5]',
              camelCase: true,
            },
          },
          'postcss-loader',
        ],
      },
    ],
  },
});
