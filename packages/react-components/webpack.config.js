const webpack = require('webpack');
const path = require('path');
const nodeExternals = require('webpack-node-externals');
const { type } = require('os');

const env = process.env.NODE_ENV || 'development';
let plugins;

// We want to manually specify these plugins, because using mode: production
// includes uglify which we don't want. https://webpack.js.org/concepts/mode/#mode-production
if (env === 'production') {
  plugins = [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('production'),
    }),
    new webpack.optimize.ModuleConcatenationPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
  ];
} else {
  plugins = [
    new webpack.NamedModulesPlugin(),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('development'),
    }),
  ];
}

module.exports = {
  mode: 'none', // We don't want this feature. See above.
  entry: {
    library: './source/index.js',
  },
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: '[name].js',
    library: {
      name: 'react-components',
      type: 'umd',
    },
    clean: true,
  },
  externals: [
    nodeExternals({
      modulesDir: path.resolve(__dirname, '../../node_modules'),
    }),
    nodeExternals({ modulesDir: path.resolve(__dirname, 'node_modules') }),
  ],
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: 'babel-loader',
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/,
        type: 'asset/resource',
        generator: {
          filename: 'assets/[name].[hash][ext]',
        },
      },
    ],
  },
  plugins,
};
