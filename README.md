# Puppet React Components

Puppet React Components is a collection of general purpose, reusable React
components, and their associated styles. Components here are primairly used by
the Puppet Insights team, but are designed to be consumed by other teams and
products.

We welcome contributions and have put together a process for contributing.
Please refer to our [CONTRIBUTING.md](CONTRIBUTING.md) for details on
setting up your development environment, opening a Pull Request, and requesting
reviews.

## Installation

UI Components is distributed on [Artifactory](https://confluence.puppetlabs.com/display/SRE/Artifactory+Basics).

You can install UI components with the following command:

`npm install @puppet/react-components`

If you run into issues while installing, please double check that you're either
on the corporate WiFI or VPN.

## Consuming React Components

React Components now utilizes Calibre and Open Sans. In order for Calibre to load you will need
to process the react-components scss with Webpack. This has currently been tested with webpack 4 using css-loader, sass-loader, file-loader, resolve-url-loader, and mini-css-extract-plugin. The following is an example configuration for a consuming application:

```javascript
const common = {
  mode: 'none',
  context: path.join(__dirname, '/source/react'),
  entry: ['./main.js'],
  output: {
    path: path.join(__dirname, '/build'),
    publicPath: '/',
    filename: 'application.js',
  },
  resolve: {
    symlinks: false,
    extensions: ['.js', '.jsx', '.json'],
  },
  module: {
    rules: [
      {
        test: /\.scss$/,
        exclude: /node_modules/,
        use: [
          { loader: MiniCssExtractPlugin.loader },
          { loader: 'css-loader' },
          { loader: 'resolve-url-loader' },
          { loader: 'sass-loader', options: { sourceMap: true } },
        ],
      },
      {
        test: /\.js$/,
        use: 'babel-loader',
      },
      {
        test: /\.(eot|svg|ttf|woff|woff2|png|jpg)$/,
        use: 'file-loader',
      },
    ],
  },
  node: {
    fs: 'empty',
  },
};
```

## Contributing

Please see our [CONTRIBUTING.md](CONTRIBUTING.md) for details on
setting up your development environment, opening a Pull Request, and requesting
reviews.

## FAQ

Q: Which browser versions do we support?
A: Down to IE11.
