# Contributing to the Puppet Design System

The Puppet Design System is a cross-functional team effort across Puppet with shared ownership where contributions are encouraged. Though designed for and maintained by Puppet, outside PRs are welcome. A good place to start is by visiting [#team-design-system](https://puppet.slack.com/messages/CFFECRQAY) in Puppet's internal Slack or contacting <puppet-design-system@puppet.com>.

- [Install](#install)
- [Run website locally](#run-website-locally)
- [Local development with consuming app](#local-development-with-consuming-app)
- [Testing](#testing)
- [Pull requests](#pull-requests)
- [Publishing](#publishing)

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

Once you have made a change and verified that it works locally including in the Styleguidist website, put up a PR for the design-system repo.

- **Branch**:
    - Target the `master` branch if the change should be published upon merge. Note that the package versions will also need to be incremented following the [publishing](#publishing) instructions below.
    - Target the `development` branch if the change doesn't need to be published upon merge, e.g. you'd like to do more testing, integration, or batch it up with other changes.
- **Changelog**: Add a line about your change to the package's CHANGELOG.md file.
    - Add a heading with the release date if targeting `master` or "Unreleased" if targeting `development`.
    - Add context and be specific about the change by prefixing the change with the component affected and referencing props by name.
- **Commits**
    - Granularity: Make commits of logical units (ideally with each commit passing tests, and formatting and refactoring in separate commits).
    - Commit summary: The first line should be no more than 72 characters (with any extra details or motivation in the commit body).
    - Tense: Use the imperative present tense (e.g. "Add feature", not "Added feature") to describe what changed from the consumer's perspective in the commit summary.

| <img src="https://imgs.xkcd.com/comics/git_commit.png" alt="xkcd comic about commit messages"/> |
| ------------- |
| <p align="center">Don't do this</p> |

See more guidelines for contributors and maintainers in the [Principles, Patterns, and Guidelines](principles-patterns-guidelines.md) doc.

Each PR should get a +1 before being merged. The [design-system-codeowners](https://github.com/orgs/puppetlabs/teams/design-system-codeowners/members) team should be able to help get PRs reviewed.

## Publishing

Publishing packages to npm is automated with Relay when a PR is merged to `master` if Lerna detects a new version in a package's `package.json` that doesn't yet exist on npm.

1. Create a PR from `development` to `master` if the changes have been queued up on the `development` branch.
1. Verify that the changes are captured in `CHANGELOG.md`, updating the release date if necessary.
1. Increment the version in the appropriate `package.json` files (e.g. [packages/react-components/package.json](packages/react-components/package.json)), following [semver](https://semver.org/) for patch, minor, and major versions.
1. Also increment the version in the corresponding `package-lock.json` files. When updating a single package, this is most easily done by manually incrementing `version` in the `package-lock.json` file to match, but can also be done by running `npm install`, though you may have to run `git clean -dfX` first to force them to update.
1. Merge the PR to master, which will trigger a Relay workflow that runs the `npm run release` command.
1. Wait for a successful notification in the #team-design-system Slack channel, which could take a half hour or so.
1. Verify the new version got published, e.g. by checking [https://www.npmjs.com/package/@puppet/react-components](https://www.npmjs.com/package/@puppet/react-components)
