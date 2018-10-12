const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
const config = require('./webpack.config.js');

config.plugins = [new BundleAnalyzerPlugin()];

module.exports = config;
