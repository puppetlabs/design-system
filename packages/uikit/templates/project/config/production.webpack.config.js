const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const merge = require('webpack-merge');
const commonConfig = require('./common.webpack.config.js');

module.exports = merge(commonConfig, {
  mode: 'production',
  devtool: 'source-map',
  plugins: [
    new MiniCssExtractPlugin({
      filename: 'bundles/[name].[hash].css',
      chunkFilename: '[id].[hash].css',
    }),
  ],
  module: {
    rules: [
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
              minimize: true,
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
            options: { importLoaders: 2, minimize: true },
          },
          'postcss-loader',
          'resolve-url-loader',
          { loader: 'sass-loader', options: { sourceMap: true } },
        ],
      },
    ],
  },
});
