# Puppet React Components

Puppet React Components is a collection of general-purpose reusable React
components and their associated styles. Components here are currently in
widest use by the Puppet Insights team but are designed to be consumed by other
teams and products.

We welcome contributions and have put together a process for contributing.
Please refer to our [CONTRIBUTING.md](CONTRIBUTING.md) for details on filing a
[PDS](https://tickets.puppetlabs.com/browse/PDS) ticket, setting up your
development environment, opening a Pull Request, and requesting reviews.

## Installation

This library is distributed as an npm package on [Artifactory](https://confluence.puppetlabs.com/display/SRE/Artifactory+Basics).

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

### Create React App

If you are using CRA with [react-app-rewired](https://github.com/timarney/react-app-rewired) (after following their [instructions](https://github.com/timarney/react-app-rewired/blob/master/README.md#how-to-rewire-your-create-react-app-project) for switching from react-scripts to react-app-rewired in package.json), you can use this included rewire instead (after adding `resolve-url-loader` to devDependencies):

```js
// config-overrides.js
const rewireResolveUrlLoader = require('@puppet/react-components/config/rewire-resolve-url-loader.js');
module.exports = function override(config, env) {
  config = rewireResolveUrlLoader(config, env);
  return config;
};
```

#### Contributing with CRA

If you want to `npm link` or `yarn link` react-components in a CRA app, you may need to disable CRA's `ModuleScopePlugin` because `resolve-url-loader` will output an absolute path to the react-components. This can be accomplished with an included rewire:

```js
// config-overrides.js
const rewireRemoveModuleScopePlugin = require('@puppet/react-components/config/rewire-remove-module-scope-plugin.js');
module.exports = function override(config, env) {
  config = rewireRemoveModuleScopePlugin(config, env);
  return config;
};
```

## Contributing

Please see our [CONTRIBUTING.md](CONTRIBUTING.md) for details on
setting up your development environment, opening a Pull Request, and requesting
reviews.

## Styleguide

The Puppet Styleguide is published to http://styleguide.puppetlabs.net

The React components in this repo are intended to correspond to Sketch symbols in the UI library ([design/puppet-ui-library.sketch](design/puppet-ui-library.sketch)) and implementations should follow the Puppet Styleguide ([design/puppet-styleguide.sketch](design/puppet-styleguide.sketch)). An HTML version of the Styleguide is located at [design/styleguide/index.html](design/styleguide/index.html), whose PNGs can be updated by running `./design/update-styleguide.sh`.

## FAQ

Q: Which browser versions do we support?
A: Down to IE11.
