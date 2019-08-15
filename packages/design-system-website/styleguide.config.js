const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
  title: 'Puppet Design System',
  theme: {
    link: '#269CFF',
    name: '#269CFF',
  },
  styles: {
    Ribbon: {
      root: {
        top: '-20px',
        right: '-20px',
      },
      link: {
        background: '#ffae1a',
      },
    },
  },
  pagePerSection: true,
  skipComponentsWithoutExample: true,

  sections: [
    {
      name: 'Puppet Design System',
      content: 'README.md',
    },
    {
      name: 'Data Grid Package',
      description: 'Hello world!',
      components: '../data-grid-table-component/src/**/*.{js,jsx}',
      ignore: [],
    },
    // The below section gets hidden when `skipComponentsWithoutExample` is true
    {
      name: 'Hello world',
      description: 'Hello world!',
    },
    {
      name: 'React Components',
      sectionDepth: 1,
      components: '../react-components/source/react/**/*.{js,jsx}',
      ignore: [
        '**/**/index.js',
        '**/alert/IconButton.js',
        '**/FadeInAndOut.js',
        '**/breadcrumb/Section.js',
        '**/breadcrumb/Separator.js',
        '**/card/CardActionSelect.js',
        '**/card/CardTitle.js',
        '**/card/Section.js',
        '**/dropdown/DropdownLabel.js',
        '**/filters/**',
        '**/form/FormFlyout.js',
        '**/form/FormSection.js',
        '**/grid/Column.js',
        '**/grid/Row.js',
        '**/modal/ModalActions.js',
        '**/modal/ModalTitle.js',
        '**/popover/PopoverContent.js',
        '**/select/SelectItem.js',
        '**/select/SelectTarget.js',
        '**/sidebar/helper.js',
        '**/sidebar/SidebarAccordion.js',
        '**/sidebar/SidebarFooter.js',
        '**/sidebar/SidebarHeader.js',
        '**/sidebar/SidebarItem.js',
        '**/sidebar/SidebarNavigation.js',
        '**/sidebar/SidebarSection.js',
        '**/icon/icons.js',
        '**/icon/constants.js',
        '**/tabs/Tab.js',
        '**/tabs/getPanelId.js',
        '**/tabs/getTabId.js',
        '**/tabs/Panel.js',
        '**/table/Column.js',
        '**/table/ColumnInput.js',
        '**/table/ColumnSelect.js',
        '**/table/ColumnHeader.js',
        '**/table/ColumnCheckbox.js',
        '**/logo/logos.js',
        '**/breadcrumb/BreadcrumbSection.js',
        '**/tooltips/Tooltip.js',
      ],
    },
    // {
    //   name: 'React Layouts',
    //   description: 'This is a test of the emergency broadcasting system',
    //   components: '../react-layouts/src/auth/**/*.{js,jsx}',
    //   ignore: ['**/**/index.js', '**/*.test.{js,jsx}'],
    // },
  ],
  getComponentPathLine(componentPath) {
    const name = path.basename(componentPath, '.js');
    const dir = path.dirname(componentPath);
    const packageName = dir.split('/')[1];
    return `import { ${name} } from '@puppet/${packageName}';`;
  },
  ribbon: {
    url: 'https://github.com/puppetlabs/design-system',
    text: 'GitHub',
  },
  require: [
    path.join(__dirname, 'styleguide.scss'),
    path.join(__dirname, '../react-components/source/scss/library/ui.scss'),
  ],
  styleguideDir: 'dist',
  webpackConfig: {
    module: {
      rules: [
        {
          test: /\.scss$/,
          exclude: /node_modules/,
          use: ExtractTextPlugin.extract([
            'css-loader',
            'resolve-url-loader',
            { loader: 'sass-loader', options: { sourceMap: true } },
          ]),
        },
        {
          test: /\.jsx?$/,
          exclude: /node_modules\/(?!buble)/,
          use: {
            loader: 'babel-loader',
            options: {
              presets: [
                [
                  '@babel/preset-env',
                  {
                    useBuiltIns: 'usage',
                    corejs: '3.0.1',
                    modules: false,
                  },
                ],
                '@babel/preset-react',
              ],
              plugins: ['@babel/plugin-proposal-class-properties'],

              env: {
                development: {
                  plugins: ['react-hot-loader/babel'],
                },
              },
            },
          },
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
