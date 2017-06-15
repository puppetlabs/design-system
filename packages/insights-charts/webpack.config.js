const path = require('path');

module.exports = {
  entry: {
    library: './source/js/ReflectCharts.js',
  },
  output: {
    path: path.join(__dirname, 'build'),
    filename: '[name].js',
    libraryTarget: 'commonjs2',
  },
  externals: {
    moment: {
      commonjs2: 'moment',
    },
  },
  module: {
    rules: [{
      test: /\.js$/,
      include: [
        path.join(__dirname, 'source/js'),
      ],
      use: {
        loader: 'babel-loader',
        options: {
          presets: [
            [ 'es2015', { modules: false } ],
          ],
        },
      },
    }],
  },
};
