# Contributing to the Puppet Design System

The Puppet Design System is a cross-functional team effort across Puppet with shared ownership where contributions are welcome and encouraged. A good place to start is by visiting [#team-design-system](https://puppet.slack.com/messages/CFFECRQAY) in Slack. You can also contact contact <puppet-design-system@puppet.com>.

- See the general [Consumption and Contribution](https://github.com/puppetlabs/design-system/wiki/Consumption-and-Contribution) principles on the wiki.
- See individual CONTRIBUTING.md files for specific packages:
    - react-components: [packages/react-components/CONTRIBUTING.md](packages/react-components/CONTRIBUTING.md)

## Install

Clone the design-system monorepo:

```sh
git clone git@github.com:puppetlabs/design-system.git && cd design-system
```

Run `npm install` in the root of the design-system to install all package dependencies (which uses [Lerna](https://lerna.js.org/) to link local packages together and hoist duplicate dependencies up to the top directory to reduce install time):

```sh
npm install
```

## Sandbox

You can develop components locally without a separate consuming application with the help of [Styleguidist](https://react-styleguidist.js.org), which provides an isolated React component development environment as a living style guide:

```sh
npm start
```

## Local development

To develop locally using a separate app that consumes a design-system package, you can run `npm link` in a particular package subfolder and `npm link @puppet/<package-name>` in the consuming app. See each individual package's own README.md; some have `npm run watch` commands to rebuild on change.

## Testing

You can run `npm test` in a package subfolder or `npm test` in the top folder to test all packages.

## Publishing

This project currently uses Lerna's independent mode, so the following command will prompt you to select a new version for any packages that have changed since the last version tags. WARNING: this command results in a git push to your `origin` remote.

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
