# Puppet Design System React Layouts

Puppet React Layouts is a collection of full pages and other reusable layouts approved as part of the Puppet Design System.

## Installation

This library is distributed as an npm package on [Artifactory](https://confluence.puppetlabs.com/display/SRE/Artifactory+Basics). As such, you should point to the Artifactory registry for `@puppet` scoped packages by adding and committing the following to an `.npmrc` file in your project.

```sh
echo "@puppet:registry=https://artifactory.delivery.puppetlabs.net/artifactory/api/npm/npm__local/" >> .npmrc
```

You can then install `react-layouts` in your project with the following command:

```sh
npm install @puppet/react-layouts
```

If you run into issues while installing, please double check that you're either
on the corporate WiFi or VPN.

## Setup

### Webpack (without Create React App)

React Components utilizes Calibre and Open Sans. In order for Calibre to load, you will need to process the react-layouts scss with Webpack. This has currently been tested with webpack 4 using css-loader, sass-loader, file-loader, resolve-url-loader, and mini-css-extract-plugin. The following is an example configuration for a consuming application:

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
const rewireResolveUrlLoader = require('@puppet/react-layouts/config/rewire-resolve-url-loader.js');
module.exports = function override(config, env) {
  config = rewireResolveUrlLoader(config, env);
  return config;
};
```

#### Contributing with CRA

If you want to `npm link` or `yarn link` react-layouts in a CRA app, you may need to disable CRA's `ModuleScopePlugin` because `resolve-url-loader` will output an absolute path to the react-layouts. This can be accomplished with an included rewire:

```js
// config-overrides.js
const rewireRemoveModuleScopePlugin = require('@puppet/react-layouts/config/rewire-remove-module-scope-plugin.js');
module.exports = function override(config, env) {
  config = rewireRemoveModuleScopePlugin(config, env);
  return config;
};
```

## Using layouts

The full set of react layouts are exported from the project root and can be imported as such:

```
import { Login } from '@puppet/react-layouts';

...

const MyProductLogin = ({ t, history }) => {
  // Pulling corresponding keys from login.json
  const localeStrings = mapObjIndexed(
    (value, key) => t(key),
    Login.defaultProps.localeStrings,
  );

  // Replace with server call
  const onSubmit = async values => {
    await new Promise(res => setTimeout(res, 1000));

    console.log(`Logged in with email ${values.email}`);

    history.push('/');
  };

  // Repace with custom error handling
  const mapErrorToMessage = e => {
    console.log(e);

    // This should also be translated, but the messaging will depend on the platform
    return 'Invalid email or password, please try again';
  };

  return (
    <Login
      product="Product"
      onSubmit={onSubmit}
      mapErrorToMessage={mapErrorToMessage}
      renderResetPasswordAs={Link}
      resetPasswordProps={{ to: '/auth/forgot-password' }}
      localeStrings={localeStrings}
    />
  );
};

export default withTranslation('login')(withRouter(Login));
```

## Using Scss

React layouts scss depends on react-components scss. To use, place the following lines at the top of your scss hierarchy:

```
@import '~@puppet/react-components/source/scss/library/ui';
@import '~@puppet/react-layouts/src/index';
```

## Developing locally

`npm install`


## Build static asset bundles:

`npm run build`

## Run layouts styleguide:

`npm start`

## Other Actions

- `npm run serve`: Serve the production bundles
- `npm test`: Run all tests with jest
- `npm run test:watch`: Run tests in watch mode
- `npm run test:coverage`: Run tests with coverage reporting
- `npm run lint`: Lint everything
- `npm run format`: Run auto code formatting

## Puppet Uikit generator:

This ui was built in accordance with the patterns established in the [puppet uikit generator](https://github.com/puppetlabs/uikit). You may find it useful to create component boilerplate with

```
uikit generate component <ComponentName> -d src/client/components
```

or to create utility methods with

```
uikit generate method <methodName> -s src/client/methods
```

## FAQ

Q: Which browser versions do we support?
A: Down to IE11.
