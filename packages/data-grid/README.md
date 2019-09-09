# data-grid

## Usage

Add the package to your project:

```sh
npm install @puppet/data-grid
```

Import the Sass styles (e.g. in your index.scss):

```scss
@import '~@puppet/data-grid/src/index';
```

Import and use the react component:

```js
import { DataGridTableComponent } from '@puppet/data-grid';
```

## Actions

- `npm install`: Install dependencies of package
- `npm run build`: Build static asset bundles
- `npm run watch`: Rebuild on file changes and output the production build
- `npm run watch:dev`: Rebuild on file changes and output a development build (e.g. retaining `debugger` statements)
- `npm test`: Run all tests with jest
- `npm run test:watch`: Run tests in watch mode
- `npm run test:coverage`: Run tests with coverage reporting
- `npm run lint`: Lint everything
- `npm run format`: Run auto code formatting

## Puppet uikit generator

This package was built in accordance with the patterns established in the [uikit](https://github.com/puppetlabs/uikit). You may find it useful to create component boilerplate with:

```
uikit generate component <ComponentName> -d src/client/components
```

or to create utility methods with

```
uikit generate method <methodName> -s src/client/methods
```
