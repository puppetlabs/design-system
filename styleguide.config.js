const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
  title: 'Reflect Components style guide',
  theme: {
    link: '#269CFF',
    name: '#269CFF',
  },
  components: 'source/react/library/**/*.js',
  require: [
    path.join(__dirname, 'source/scss/library/ui.scss'),
  ],
  webpackConfig: {
    module: {
      loaders: [{
        test: /\.scss$/,
        exclude: /node_modules/,
        loaders: ExtractTextPlugin.extract('css-loader!sass-loader'),
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: require.resolve('babel-loader'),
        query: {
          presets: [
            require.resolve('babel-preset-es2015'),
            require.resolve('babel-preset-react'),
          ],
        },
      }],
    },
    plugins: [
      new ExtractTextPlugin({ filename: 'styleguide.css', allChunks: true }),
    ],
  },
};
