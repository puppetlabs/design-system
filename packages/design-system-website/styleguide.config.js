const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
  title: 'Puppet Design System',
  theme: {
    borderRadius: '4px',
    color: {
      codeBackground: '#f2f5f7',
    },
    fontFamily: {
      base: ['Open Sans', 'sans-serif'],
      monospace: ['Inconsolata', 'monospace'],
    },
    fontSize: {
      small: '14px',
      text: '16px',
    },
  },
  styles: {
    Editor: {
      root: {
        fontSize: '16px',
      },
    },
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
  assetsDir: 'public',
  pagePerSection: true,
  skipComponentsWithoutExample: true,
  styleguideComponents: {
    ComponentsListRenderer: path.join(
      __dirname,
      'styleguideComponents/ComponentsListRenderer',
    ),
    Markdown: path.join(__dirname, 'styleguideComponents/Markdown'),
    Pre: path.join(__dirname, 'styleguideComponents/PreRenderer'),
    PlaygroundRenderer: path.join(
      __dirname,
      'styleguideComponents/PlaygroundRenderer',
    ),
    SectionHeadingRenderer: path.join(
      __dirname,
      'styleguideComponents/SectionHeadingRenderer',
    ),
    StyleGuideRenderer: path.join(
      __dirname,
      'styleguideComponents/StyleGuideRenderer',
    ),
    TabButtonRenderer: path.join(
      __dirname,
      'styleguideComponents/TabButtonRenderer',
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
      name: 'Glossary',
      content: 'glossary/README.md',
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
          name: 'Contributing',
          content: 'foundations/Contributing.md',
        },
        {
          name: 'Design',
          content: 'foundations/Design.md',
        },
        {
          name: 'Iconography',
          content: 'foundations/Iconography.md',
        },
        {
          name: 'Responsiveness',
          content: 'foundations/Responsiveness.md',
        },
        {
          name: 'Typography',
          content: 'foundations/Typography.md',
        },
        {
          name: 'UX Design Principles',
          content: 'foundations/DesignPrinciples.md',
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
        '**/alert/AlertActions.js',
        '**/alert/AlertError.js',
        '**/alert/AlertMessage.js',
        '**/breadcrumb/Section.js',
        '**/breadcrumb/Separator.js',
        '**/card/CardAction.js',
        '**/card/CardActionSelect.js',
        '**/card/CardTitle.js',
        '**/card/CardHeader.js',
        '**/card/Section.js',
        '**/dropdown/DropdownLabel.js',
        '**/filters/**',
        '**/form/FormSection.js',
        '**/form/internal',
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
        '**/stepper/StepperStep.js',
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
        '**/toolbar/Actions.js',
        '**/logo/logos.js',
        '**/breadcrumb/BreadcrumbSection.js',
        '**/tag/Search.js',
        '**/menu/Arrow.js',
        '**/menu/Container.js',
        '**/menu/Trigger.js',
        '**/tooltips/Tooltip.js',
      ],
    },
    {
      name: 'React Layouts',
      components: '../react-layouts/src/**/*.{js,jsx}',
      ignore: [
        '**/**/index.js',
        '**/*.test.{js,jsx}',
        '**/Authentication/AuthenticationAction.jsx',
      ],
    },
    {
      name: 'Data Grid',
      components: '../data-grid/src/**/*.{js,jsx}',
      ignore: [
        '**/**/ColumnHeader.jsx',
        '**/**/index.jsx',
        '**/**/utils.jsx',
        '**/**/index.js',
      ],
    },
  ],
  getComponentPathLine(componentPath) {
    const name = path.basename(componentPath).replace(/\.jsx?$/, '');
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
    path.join(__dirname, '../sass-variables/_index.scss'),
    path.join(__dirname, '../react-components/source/scss/library/ui.scss'),
    path.join(__dirname, '../react-layouts/src/index.scss'),
  ],
  styleguideDir: 'dist',
  webpackConfig: {
    module: {
      rules: [
        {
          test: /\.scss$/,
          exclude: /node_modules/,
          use: [
            MiniCssExtractPlugin.loader,
            'css-loader',
            'resolve-url-loader',
            { loader: 'sass-loader', options: { sourceMap: true } },
          ],
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
                    useBuiltIns: 'entry',
                    corejs: '3.38.1',
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
          test: /\.(png|jpe?g|gif|svg)$/,
          type: 'asset',
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
    resolve: {
      modules: [path.resolve(__dirname, 'node_modules')],
      extensions: ['.js', '.mjs', '.jsx'],
      symlinks: false,
      fallback: {
        assert: require.resolve('assert'),
        crypto: false,
      },
    },
    plugins: [new MiniCssExtractPlugin({ filename: 'styleguide.css' })],
  },
  // Disable sorting component props
  sortProps: (props) => props,
};
