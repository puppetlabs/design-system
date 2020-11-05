# Contributing to the Puppet Design System

The Puppet Design System is a cross-functional team effort across Puppet with shared ownership where contributions are encouraged. Though designed for and maintained by Puppet, outside PRs are welcome. A good place to start is by visiting [#team-design-system](https://puppet.slack.com/messages/CFFECRQAY) in Puppet's internal Slack or contacting <puppet-design-system@puppet.com>.

## Install

Clone the design-system monorepo:

```sh
git clone git@github.com:puppetlabs/design-system.git && cd design-system
```

The required version of Node.js can be found in `.nvmrc`. We recommend using [nvm](https://github.com/nvm-sh/nvm) (Node Version Manager) to switch between different versions of [Node](https://nodejs.org). If you have [nvm installed](https://github.com/nvm-sh/nvm#installing-and-updating), run the following command in the design-system directory to get the right version before performing other commands with npm:

```sh
nvm install && nvm use
```

Run `npm install` in the root of the design-system to install all package dependencies (which uses [Lerna](https://lerna.js.org/) to link local packages together and hoist duplicate dependencies up to the top directory to reduce install time):

```sh
npm install
```

## Run website locally

You can run the http://puppet.style website locally in order to develop components in a sandbox without a separate consuming application. It is built with [Styleguidist](https://react-styleguidist.js.org), which provides an isolated React component development environment as well a living style guide:

```sh
npm start
```

## Local development with consuming app

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

Each PR should get a +1 before being merged into `development`. The [design-system-codeowners](https://github.com/orgs/puppetlabs/teams/design-system-codeowners/members) team should be able to help get PRs reviewed.

## Publishing

New versions are currently released by maintainers using `npm run release`. Please collaborate with the team to release a new version. (Note: This process will likely be replaced with automated releases on push to master.)

### Prerequisites

1. Request permissions to the [@puppet org on npm](https://www.npmjs.com/org/puppet). (An existing admin should be able to help.)
2. Log in with your npm account: `npm login`.

### Steps

1. Open a PR from `development` to `master`.
2. Update the `CHANGELOG.md`.
3. Increment the desired packages versions in their `package.json` files, following [semver](https://semver.org/) for patch, minor, and major versions.
4. Update `package-lock.json` files by running `npm install`; you may have to run `git clean -dfX` first to force them to update.
5. Push those changes to `development`, get a +1 on the PR, and merge to `master`.
6. Publish the packages to npm with `npm run release`. (Lerna will find packages with new versions based on `package.json` files.)

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
