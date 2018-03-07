# Reflect Components

Reflect Components is our collection of reusable React components and their
associated styles. Components from here are primarily used in two places:
[Reflect App](https://github.com/reflect/reflect-app) (our user facing app
hosted at https://app.reflect.io) and
[Reflect UI](https://github.com/reflect/reflect-ui), the library our end users
use to embed Reflect views into their apps.

## Development

We use Node.js and npm scripts for our build tooling. We recommend node 6 or
higher. To begin, run

**To install depencencies:**

```
make setup
```

**To run tests:**

```
npm test
```

**To start the styleguide for local development:**
1. Run `npm start` to start the styleguidist webpack devserver
1. Open the [styleguide](http://localhost:6060) at http://localhost:6060.

The Reflect Components styleguide allows us to see and test components in an
isolated context. It's built using [React Styleguidist](https://github.com/styleguidist/react-styleguidist).
Examples for each component live next to their respective source.


**To build the library as a module and watch for changes:**

1. If you haven't already done so run `npm link` in this directory.
1. Run `npm run watch` to build the package and listen for changes
1. Follow the instructions in `reflect-app` and/or `reflect-ui` depending on where you'd
like to see the updates.

## Releasing

Reflect Components is distributed via [npm](https://www.npmjs.com/package/@reflect/reflect-components).
Upon merge to master, our CI process releases a new version to the registry.
Please update the CHANGELOG.md file before merging your pull requests to master.
