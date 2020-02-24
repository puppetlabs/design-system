# Contributing to the Puppet Design System

The Puppet Design System is a cross-functional team effort across Puppet with shared ownership where contributions are encouraged. Though designed for and maintained by Puppet, outside PRs are welcome. A good place to start is by visiting [#team-design-system](https://puppet.slack.com/messages/CFFECRQAY) in Puppet's internal Slack or contacting <puppet-design-system@puppet.com>.

## Install

Clone the design-system monorepo:

```sh
git clone git@github.com:puppetlabs/design-system.git && cd design-system
```

We recommend the latest LTS version of Node.js. Run `npm install` in the root of the design-system to install all package dependencies (which uses [Lerna](https://lerna.js.org/) to link local packages together and hoist duplicate dependencies up to the top directory to reduce install time):

```sh
npm install
```

## Sandbox

You can develop components locally without a separate consuming application with the help of [Styleguidist](https://react-styleguidist.js.org), which provides an isolated React component development environment as a living style guide:

```sh
npm start
```

## Local development

To develop locally using a separate app that consumes a design-system package:

1. Run `npx lerna run link` (which will run `npm link` in consumable packages).
2. Run `npm link @puppet/<package-name>` in the consuming app.
3. Run `npx lerna run --parallel watch` to rebuild packages on change ( or just `npm run watch` in the desired package).

## Testing

Run `npm test` in the top folder to test all packages, or `npm test` in the desired package. You can also run `npm lint` to check for code formatting errors or `npm format` to attempt to automatically fix them.

## Pull requests

Put up a PR for the design-system repo that follows these guidelines:

- Granularity: Make commits of logical units (ideally with each commit passing tests, and formatting and refactoring in separate commits).
- Commit summary: The first line should be no more than 72 characters (with any extra details or motivation in the commit body).
- Tense: Use the imperative present tense (e.g. "Add feature", not "Added feature") to describe what changed from the consumer's perspective in the commit summary.
- Changelog: Add a line about your change to the package's CHANGELOG.md file.

| <img src="https://imgs.xkcd.com/comics/git_commit.png" alt="xkcd comic about commit messages"/> |
| ------------- |
| <p align="center">Don't do this</p> |

See more guidelines for contributors and maintainers in the [Principles, Patterns, and Guidelines](principles-patterns-guidelines.md) doc.

## Publishing

New versions are currently released by maintainers using `npm run publish`. Please collaborate with the team to release a new version. (Note: This process will likely be replaced with automated releases on push to master.)

This project currently uses Lerna's independent mode, so the following command will prompt you to select a new version for any packages that have changed since the last version tags. WARNING: this command results in a git push to your `origin` remote.

```sh
npm run publish
```

If `origin` was not puppetlabs/design-system, push the "Publish" commit the above command created, along with version tags, to the upstream repo:

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
