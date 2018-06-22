const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
  title: 'Puppet React Components',
  theme: {
    link: '#269CFF',
    name: '#269CFF',
  },
  components: 'source/react/library/**/*.js',
  ignore: [
    '**/portalable.js',
    '**/Portal.js',
    '**/togglable.js',
    '**/Saving.js',
    '**/FadeInAndOut.js',
    '**/**/index.js',
    '**/icon/icons.js',
    '**/table/Column.js',
    '**/table/ColumnInput.js',
    '**/table/ColumnSelect.js',
    '**/table/ColumnHeader.js',
    '**/table/ColumnCheckbox.js',
  ],
  require: [
    path.join(__dirname, 'styleguideSetup.js'),
    path.join(__dirname, 'source/scss/library/ui.scss'),
  ],
  webpackConfig: {
    module: {
      rules: [
        {
          test: /\.scss$/,
          exclude: /node_modules/,
          use: ExtractTextPlugin.extract(['css-loader', 'sass-loader']),
        },
        {
          test: /\.js$/,
          exclude: /node_modules\/(?!buble)/,
          use: {
            loader: 'babel-loader',
            options: {
              presets: [
                'es2015',
                'react',
              ],
            },
          },
        },
      ],
    },
    plugins: [
      new ExtractTextPlugin({ filename: 'styleguide.css', allChunks: true }),
    ],
  },
};
