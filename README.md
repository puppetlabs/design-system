# Puppet Design System

[![lerna](https://img.shields.io/badge/maintained%20with-lerna-cc00ff.svg)](https://lerna.js.org/)

The Puppet Design System, documented at http://designsystem.puppetlabs.net, is
composed of the following:

- Puppet Styleguide: Design specifications [packages/design-assets/puppet-styleguide.sketch](packages/design-assets/puppet-styleguide.sketch)
- Puppet React Components: Library of reusable React components [puppetlabs/react-components](https://github.com/puppetlabs/react-components)
- Puppet React Layouts: Library of reusable React layouts [packages/react-layouts](packages/react-layouts)
- Puppet Sass Variables: A set of public Sass variables for color palettes, typography, borders, etc. [packages/sass-variables](packages/sass-variables)
- Puppet UI Toolkit: A `uikit` CLI for generating apps, components, etc. [packages/uikit](packages/uikit)
- Puppet Design System Website: The website documenting the Design System [packages/design-system-website](packages/design-system-website)

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
