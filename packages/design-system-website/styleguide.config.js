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
  styleguideComponents: {
    ComponentsListRenderer: path.join(
      __dirname,
      'styleguideComponents/ComponentsListRenderer',
    ),
    StyleGuideRenderer: path.join(
      __dirname,
      'styleguideComponents/StyleGuideRenderer',
    ),
    TableOfContentsRenderer: path.join(
      __dirname,
      'styleguideComponents/TableOfContentsRenderer',
    ),
  },

  sections: [
    {
      name: 'Puppet Design System',
      content: 'README.md',
    },
    {
      name: 'Data Grid Package',
      description:
        'The Data Grid package was developed to aid in the structuring of data. By using columns and rows data can be orginized and presented informative way. Unlike the basic table component in the puppet react component libary the data grid component includes more features to help with more complex presentation tasks and to support user interaction with data. ',
      components: '../data-grid-table-component/src/**/*.{js,jsx}',
      ignore: [
        '**/**/ColumnHeader.jsx',
        '**/**/index.jsx',
        '**/**/utils.jsx',
        '**/**/index.js',
      ],
    },
    // The below section gets hidden when `skipComponentsWithoutExample` is true
    {
      name: 'Foundations',
      sectionDepth: 1,
      sections: [
        {
          name: 'Accessibility',
          content: 'foundations/Accessibility.md',
        },
        {
          name: 'Content Writing',
          content: 'foundations/ContentWriting.md',
        },
        {
          name: 'Iconography',
          content: 'foundations/Iconography.md',
        },
        {
          name: 'Typography',
          content: 'foundations/Typography.md',
        },
      ],
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
