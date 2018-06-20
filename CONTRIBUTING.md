# Contributing to Insights UI Components

Thanks for your interest in contributing! This document outlines how to submit a
bug or request an enhancement, set up your development environment, open a pull
request, and deploy a new version.

## Filing a bug or enhancement

We currently use Github Issues for tracking bugs and enhancements for this
project.

You're encouraged to open an issue before you begin developing your enhancement
or bug fix. This helps us avoid duplicated work, and often serves as a chance
for others to weigh-in.

## Setting up your development environment

We use Node.js and npm scripts for our build tooling. Our CI server runs Node
v8.11.3 LTS, which we recommend you do as well. You can install versions of Node
using [nvm](https://github.com/creationix/nvm).

Once you've installed Node, install the dependencies for this project with:

```
make setup
```

UI Components includes a styleguide that allows us to test components in
isolation. It's built with [React Styleguidist](https://github.com/styleguidist/react-styleguidist),
and content is sourced from a Markdown file living next to each respective
component.

**To start the styleguide for local development:**
1. Run `npm start`.
2. Open the [styleguide](http://localhost:6060) at http://localhost:6060.

**To build the library as a module and watch for changes:**

1. If you haven't already done so, run `npm link` in this directory.
2. Run `npm run watch` to will build the module, and rebuild on any change.
3. For any project in which UI Components is a dependency, you can UI Components
  to see your changes reflected in the parent. In the parent project, run `npm link @puppet/insights-ui-components`.
  Make sure you're using the same version of Node.js in both projects.

## Testing and linting

We use Mocha, Chai, and Enzyme for testing this project. We use ESLint for
linting our javascript, which has a configuration based of [Airbnb's](https://www.npmjs.com/package/eslint-config-airbnb).
Additionally, we lint our SCSS using StyleLint.

To run tests:

```
npm test
```

To lint Javascript:

```
npm run js-lint
```

To lint Scss:

```
npm run scss-lint
```

## Opening a pull request

You've built a new feature, fixed a bug, or maybe you fixed a typo in this
document. Whatever you're planning on contributing, the next step is to open a
pull request and have your changes changes reviewed.

Before doing so, here's a small checklist to run through:

- [ ] Have I written tests where appropriate?
- [ ] Have my tests and linter passed locally?

If the answer to these is "yes", you're ready to go! Once you've pushed your
branch up to Github, you're ready to open a pull request.

- Open your Pull Request against the development branch.
- Request a review from both Geoff Woodburn ([@woodburndesigns](https://github.com/woodburndesigns))
  and Colby Aley ([@cp](https://github.com/cp)).
- You may be asked to make stylistic changes to align your contribution with
  existing code, add tests, or any other requests.
- Once your pull request has been approved, it's on you to merge it in to the
  development branch.

If you have any questions about this process, please reach out to the
maintainers. Again, thank you for the contribution!

## Releasing a new version

New versions of UI Components are built and published to Artifactory using
[Puppet Pipelines](http://pipelines.puppet.com/). This happens whenever a commit
is pushed to the master branch. Ideally, the only commits to master happen via a
merge from development. That process is outlines below.

### Bumping the minor or major version

By default, pushing to master will release a new version with a bumped patch. As
we follow [semver](https://semver.org/), it's often necessary to bump the minor
or even major version. This can be done by modifying the `version` field in
[package.json](./package.json). For example, if the version is currently
"12.10.6" and you wish to bump to "12.11.0", change the version in the file to
"12.11.0".

## Opening a deployment pull request

Much like contributions, deployments happen via the merging of a pull request
from the development branch to the master branch. The following steps outline
that process:

1. Open a Pull Request from development to master.
2. Title it with `Development (vx.x.x)` indicating that it's a PR from
  Development, and which version will be released.
3. Take a look at the "Files changed", then update the CHANGELOG.md file with
  a summary of the changes. Sometimes this may require looking through the
  commit message or even contacting their authors.
4. Assign the maintainers. (See "Opening a pull request" above)
5. Upon approval please merge the pull request. It's your responsibility to test
  the new version once it's been deployed and check for regressions.

Thanks!
