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

## Styleguide

The Reflect Components styleguide allows us to see and test components in an
isolated context. It's built using [React Styleguidist](https://github.com/styleguidist/react-styleguidist)
and the contents are sourced from the `docs/` directory in this repo.

After installing your dependencies, you're good to boot up the styleguide:

```
npm start
```

This will start the styleguide at http://localhost:6060. It's still a work in
progress, so some components have not been documented yet. Please feel free to
[add them](https://github.com/styleguidist/react-styleguidist/blob/master/docs/Documenting.md)!

### Legacy styleguide

We're currently working on porting our components over to our new Styleguide.
In the interim, it may be necessary to run the old one: You can do so with
the following command:

```
./node_modules/.bin/webpack-dev-server --config webpack.dev.config.js
```

This will start a server at port 8080 which will refresh when you make
updates to any of the components.

## Developing with other projects

As all of our frontend projects are npm modules, we can use [npm link](https://docs.npmjs.com/cli/link)
to symlink them into eachother when doing local development. This allows us to
make changes in one project (e.g. reflect-components) then instantly see those
changes in another project, such as ReflectUI or Reflect App.

### Symlinking into a project

First, symlink `reflect-components`:

```
npm link
```

This will build reflect-components and symlink it to a place where it's
globally accessible to other local projects.

Next, symlink it into another project, using the full module name. This
can be done from within the `reflect-ui` directory, for example.

```
npm link @reflect/reflect-components
```

### Watching for changes

As you make changes in `reflect-components`, you'll probably want your
changes to be build so you can see them in other projects. This command
will do that, rebuilding every time you make a change:

```
npm run watch
```

## Linting

We use ESLint and enforce it during CI. The following command will lint your
files:

```
npm run lint
```

We recommend using [Syntastic](https://github.com/vim-syntastic/syntastic) for
vim or [linter-eslint](https://github.com/AtomLinter/linter-eslint) for Atom.

## Releasing

Reflect Components is distributed via [npm](https://www.npmjs.com/package/@reflect/reflect-components).
Upon merge to master, our CI process releases a new version to the registry.
Please update the CHANGELOG.md file before merging your pull requests to master.
