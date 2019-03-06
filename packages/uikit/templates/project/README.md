# Puppet starter ui

## Installation

`npm install`

## Developing locally

Run `npm start` to boot up a development server. It will automatically hot-reload on file changes.

## Build static asset bundles:

`npm run build`

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
uikit generate component <ComponentName>
```

or to create utility methods with

```
uikit generate method <methodName>
```
