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
    '**/portal.js',
    '**/togglable.js',
    '**/Saving.js',
    '**/FadeInAndOut.js',
    '**/**/index.js',
    '**/accordion/AccordionItem.js',
    '**/breadcrumb/BreadcrumbSection.js',
    '**/breadcrumb/BreadcrumbSeparator.js',
    '**/datepicker/DatePickerWrapper.js',
    '**/icon/icons.js',
    '**/table/Column.js',
    '**/table/ColumnInput.js',
    '**/table/ColumnSelect.js',
    '**/table/ColumnHeader.js',
    '**/table/ColumnCheckbox.js',
    '**/card/ActionsMenu.js',
    '**/card/ActionsSearch.js',
    '**/card/Header.js',
    '**/card/Section.js',
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
          use: 'babel-loader',
        },
        {
          test: /\.(eot|svg|ttf|woff|woff2|png|jpg)$/,
          use: 'file-loader',
        },
      ],
    },
    plugins: [
      new ExtractTextPlugin({ filename: 'styleguide.css', allChunks: true }),
    ],
  },
  sortProps: props => props,
};
