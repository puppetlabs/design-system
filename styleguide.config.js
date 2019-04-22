const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
  title: 'Puppet React Components',
  theme: {
    link: '#269CFF',
    name: '#269CFF',
  },
  components: 'source/react/library/**/*.js',
  styleguideComponents: {
    ReactComponent: path.join(
      __dirname,
      'source/react/styleguide/components/ReactComponent',
    ),
  },
  ignore: [
    '**/portal.js',
    '**/togglable.js',
    '**/Saving.js',
    '**/FadeInAndOut.js',
    '**/**/index.js',
    '**/accordion/AccordionItem.js',
    '**/breadcrumb/Section.js',
    '**/breadcrumb/Separator.js',
    '**/card/ActionsMenu.js',
    '**/card/ActionsSearch.js',
    '**/card/Header.js',
    '**/card/Section.js',
    '**/dropdown/DropdownLabel.js',
    '**/filters/FilterItem.js',
    '**/filters/List.js',
    '**/filters/ListItem.js',
    '**/form/FormFlyout.js',
    '**/form/FormSection.js',
    '**/grid/Column.js',
    '**/grid/Row.js',
    '**/popover/PopoverContent.js',
    '**/select/SelectItem.js',
    '**/sidebar/helper.js',
    '**/sidebar/SidebarAccordion.js',
    '**/sidebar/SidebarFooter.js',
    '**/sidebar/SidebarHeader.js',
    '**/sidebar/SidebarItem.js',
    '**/sidebar/SidebarNavigation.js',
    '**/sidebar/SidebarSection.js',
    '**/icon/icons.js',
    '**/icon/constants.js',
    '**/table/Column.js',
    '**/table/ColumnInput.js',
    '**/table/ColumnSelect.js',
    '**/table/ColumnHeader.js',
    '**/table/ColumnCheckbox.js',
    '**/logo/logos.js',
  ],
  require: [
    path.join(__dirname, 'source/scss/styleguide.scss'),
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
