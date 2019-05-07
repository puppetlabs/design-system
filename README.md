# Puppet Design System

[![lerna](https://img.shields.io/badge/maintained%20with-lerna-cc00ff.svg)](https://lerna.js.org/)

The Puppet Design System, documented at http://designsystem.puppetlabs.net, is
composed of the following:

- Puppet Styleguide: Design specifications [packages/design-assets/puppet-styleguide.sketch](packages/design-assets/puppet-styleguide.sketch)
- Puppet React Components: Library of reusable React components [puppetlabs/react-components](https://github.com/puppetlabs/react-components) Note: `@puppet/react-components` still lives under its own repository, but will eventually be migrated here.
- Puppet React Layouts: Library of reusable React layouts [packages/react-layouts](packages/react-layouts)
- Puppet Sass Variables: A set of public Sass variables for color palettes, typography, borders, etc. [packages/sass-variables](packages/sass-variables)
- Puppet UI Toolkit: A `uikit` CLI for generating apps, components, etc. [packages/uikit](packages/uikit)
- Puppet Design System Website: The website documenting the Design System [packages/design-system-website](packages/design-system-website)

## Consuming npm packages

The packages in this monorepo are published to Artifactory, so the consuming project should have an `.npmrc` file to set the registry for the `@puppet` scope:

```
@puppet:registry=https://artifactory.delivery.puppetlabs.net/artifactory/api/npm/npm__local/
```

Once your project points to Artifactory, you can install one or more packages, e.g.:

```sh
npm install @puppet/sass-variables @puppet/layouts
```

Then follow each package's own README.md instructions to consume components, e.g.:

```js
import { Login } from '@puppet/react-layouts';
```

## Contributing

The following command installs all dependencies as well as linking local packages together, hoisting duplicate dependencies up to the top directory to reduce install time:

```sh
npm run bootstrap
```

You can also run `npm link` in a particular package subfolder and `npm link @puppet/<package-name>`, like normal, for local development when consuming one of these packages in another project. See each individual package's own README.md; some have `npm run watch` commands to rebuild on change.

Create a new package by using uikit:

```sh
cd packages && npx uikit generate library hello-world
```

## Testing

You can run `npm test` in a package subfolder or `npm test` in the top folder to test all packages.

## Publishing

This project currently uses Lerna's independent mode, so the following command will prompt you to select a new version for any packages that have changed since the last version tags. Warning: this command results in a git push to your `origin` remote.

```sh
npm run publish
```

If `origin` was not puppetlabs/design-system, push the "Publish" commit that created, along with version tags, to the upstream repo:

```sh
git push --follow-tags git@github.com:puppetlabs/design-system.git master
```

## Lerna commands

- `npx lerna [command]`:
    - `npx lerna add <pkg> [globs..]`: Add a single dependency to matched
      packages
    - `npx lerna bootstrap`: Link local packages together and install remaining
      package dependencies
    - `npx lerna changed`: List local packages that have changed since the last
      tagged release [aliases: updated]
    - `npx lerna clean`: Remove the node_modules directory from all packages
    - `npx lerna create <name> [loc]`: Create a new lerna-managed package
    - `npx lerna diff [pkgName]`: Diff all packages or a single package since
      the last release
    - `npx lerna exec [cmd] [args..]`: Execute an arbitrary command in each
      package
    - `npx lerna import <dir>`: Import a package into the monorepo with commit
      history
    - `npx lerna init`: Create a new Lerna repo or upgrade an existing repo to
      the current version of Lerna.
    - `npx lerna link`: Symlink together all packages that are dependencies of
      each other
    - `npx lerna list`: List local packages [aliases: ls, la, ll]
    - `npx lerna publish [bump]`: Publish packages in the current project.
    - `npx lerna run <script>`: Run an npm script in each package that contains
      that script
    - `npx lerna version [bump]`: Bump version of packages changed since the
      last release.
