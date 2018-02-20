const commonConfig = require('./common.webpack.config.js');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const merge = require('webpack-merge');

module.exports = merge(commonConfig, {
  plugins: [
    new UglifyJsPlugin(),
    new ExtractTextPlugin('[name].[contentHash].bundle.css'),
  ],
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [
            {
              loader: 'css-loader',
              options: {
                modules: true,
                importLoaders: 1,
                localIdentName: '[hash:base64:5]',
              },
            },
            'postcss-loader',
          ],
        }),
      },
    ],
  },
});
