# Reflect Components

Reflect Components is our collection of reusable React components and their
associated styles. Components from here are primarily used in two places:
[Reflect App](https://github.com/reflect/reflect-app) (our user facing app
hosted at https://app.reflect.io) and
[Reflect UI](https://github.com/reflect/reflect-ui), the library our end users
use to embed Reflect views into their apps.

## Setup

We use Node.js and npm scripts for our build tooling. We recommend node 6 or
higher. To begin, run

```
make setup
```

This will install the necessary dependencies.

To see the components in an isolated context, we have a small app we call our
Styleguide. It's build using
[React Styleguidist](https://github.com/styleguidist/react-styleguidist) and
the contents are sourced from the `docs/` directory in this repo. After running
the previous command, you're good to boot up the styleguide:

```
npm start
```

This will start the styleguide at http://localhost:6060. It's still a work in
progress, so some components have not been documented yet. Please feel free to
[add them](https://github.com/styleguidist/react-styleguidist/blob/master/docs/Documenting.md)!
