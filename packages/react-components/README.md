# Puppet React Components

Puppet React Components is a collection of general-purpose reusable React
components and their associated styles.

## Component documentation

Components are documented using React Styleguidist, which provides API docs alongside live editable (in-browser) React components. To view these, clone this repository, install dependencies, and run the Styleguidist server:

- `git clone git@github.com:puppetlabs/design-system.git && cd design-system/packages/react-components`
- `npm install`
- `npm start`
- Open http://localhost:6060.

## Installation

```sh
npm install @puppet/react-components
```

## Setup

### With webpack (without Create React App)

React Components utilizes Calibre and Open Sans. In order for Calibre to load, you will need to process the react-components scss with Webpack. This has currently been tested with webpack 4 using css-loader, sass-loader, file-loader, resolve-url-loader, and mini-css-extract-plugin. The following is an example configuration for a consuming application:

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

### With Create React App (CRA)

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

## Using components

The full set of react components are exported from the project root and can be imported as such:

```
import { Button } from '@puppet/react-components';
const MyComponent = () => <Button>My Button</Button>;
```

## Contributing

Please see our [CONTRIBUTING.md](CONTRIBUTING.md) for details on
setting up your development environment, opening a Pull Request, and requesting
reviews.

## Additional configuration examples

### [Continuous Delivery for PE](https://github.com/puppetlabs/PipelinesInfra)

The following configuration allows CD4PE to rely on `react-components` to provide all its required fonts.

- [webpack.config.js](https://github.com/puppetlabs/PipelinesInfra/blob/d40d8207793f9ae847e8f65595c9e03b7c61c2a0/webpack.config.js)
- [puppetReactComponentsStyles.scss](https://github.com/puppetlabs/PipelinesInfra/blob/d40d8207793f9ae847e8f65595c9e03b7c61c2a0/src/main/js/styles/puppetReactComponentsStyles.scss) imports all the scss from `react-components`.
- [Layout.jsx](https://github.com/puppetlabs/PipelinesInfra/blob/d40d8207793f9ae847e8f65595c9e03b7c61c2a0/src/main/js/containers/Layout.jsx#L25) actually applies this scss to the app.
- Building the app generates all the required font files in CD4PE's [public folder](https://github.com/puppetlabs/PipelinesInfra/tree/d40d8207793f9ae847e8f65595c9e03b7c61c2a0/public).
