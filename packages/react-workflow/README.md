# react-workflow

## Installation

`npm install`

## Build static asset bundles

- `npm run build`

## Other Actions

- `npm run watch`: Rebuild on file changes
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
