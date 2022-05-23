# Contributing to the Puppet Design System

The Puppet Design System is a cross-functional team effort across Puppet with shared ownership where contributions are encouraged. Though designed for and maintained by Puppet, outside PRs are welcome. A good place to start is by visiting [#team-design-system](https://puppet.slack.com/messages/CFFECRQAY) in Puppet's internal Slack or contacting <puppet-design-system@puppet.com>.

- [Install](#install)
- [Run website locally](#run-website-locally)
- [Local development with consuming app](#local-development-with-consuming-app)
- [Testing](#testing)
- [Pull requests and publishing](#pull-requests-and-publishing)

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

## Commit guidelines

- Granularity: Make commits of logical units (ideally with each commit passing tests, and formatting and refactoring in separate commits).
- Commit summary: The first line should be no more than 72 characters (with any extra details or motivation in the commit body).
- Tense: Use the imperative present tense (e.g. "Add feature", not "Added feature") to describe what changed from the consumer's perspective in the commit summary.

| <img src="https://imgs.xkcd.com/comics/git_commit.png" alt="xkcd comic about commit messages"/> |
| ------------- |
| <p align="center">Don't do this</p> |

See more guidelines for contributors and maintainers in the [Principles, Patterns, and Guidelines](principles-patterns-guidelines.md) doc.

## Pull requests and publishing

Once you have made a change and verified that it works locally including in the Styleguidist website, put up a PR. The author should own seeking review and merging/publishing. Publishing packages to npm is automated with Relay when a PR is merged to `main` or `releases/alpha` if Lerna detects a new version in a package's `package.json` that doesn't yet exist on npm.

1. **Branch**: Create a PR from your branch. Note that we usually push the branch directly to this repository rather than a fork.
    - Target the `main` branch (the default branch) if the change should be published upon merge.
    - Target the `releases/alpha` branch if it includes a breaking change.
    - Target a feature branch if the change shouldn't be released yet. For example, a "feature" or "integration" branch can be used if you want to batch up multiple changes into a single release, which would then need to be followed up with another PR from that branch to `main` for a release.
2. **Changelog**: Add a line about your change to the package's CHANGELOG.md.
    - Add a heading with the release date. Note that you may use "Unreleased" if it's not going to be released yet.
    - Add context and be specific about the change by prefixing the change with the component affected and referencing props by name.
3. **Version**: Update the version to be published, following [semver](https://semver.org/) for patch, minor, and major versions. Note that alpha versions also follow semver, in the form `6.0.0-alpha.3`.
    - Increment the version in the appropriate `package.json` files, e.g. [packages/react-components/package.json](packages/react-components/package.json).
    - Also increment the version in the corresponding `package-lock.json` files. When updating a single package, this is most easily done by simply manually incrementing the `version` field in the `package-lock.json` file to match, but can also be done by running `npm install`, though you may have to run `git clean -dfX` first to force them to update.
    - Note: Other packages in this project that depend on the incremented package may also need to be udpated to point to the new version, otherwise, you could end up with multiple versions due to the use of lockfiles.
4. **Review**: Get a +1 on the PR. Feel free to ping people to find a reviewer. The [design-system-codeowners](https://github.com/orgs/puppetlabs/teams/design-system-codeowners/members) team should be able to help.
5. **Merge**: Merge the PR. Merging to `main` or `releases/alpha` will trigger a Relay workflow that runs the `npm run release` command.
6. **Notification**: Wait for a successful notification in the #alerts-design-system Slack channel, which could take a half hour or so.
7. **Verify**: Verify the new version got published, e.g. by checking [https://www.npmjs.com/package/@puppet/react-components](https://www.npmjs.com/package/@puppet/react-components).
