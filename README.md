# Puppet Design System

[![lerna](https://img.shields.io/badge/maintained%20with-lerna-cc00ff.svg)](https://lernajs.io/)

The Puppet Design System, documented at http://designsystem.puppetlabs.net, is
composed of the following:

- Puppet Styleguide: Design specifications
- Puppet React Components: Library of reusable React components
- Puppet React Layouts: Library of reusable React layouts
- Puppet UI Toolkit: A `uikit` CLI for generating apps, components, etc.
- Puppet Design System UI: The website documenting the Design System

## Usage

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
