# Puppet Design System

[![lerna](https://img.shields.io/badge/maintained%20with-lerna-cc00ff.svg)](https://lerna.js.org/)

The Puppet Design System is a resource for creating user interfaces based on brand, UX, and dev principles that can be used to improve consistency, efficiency, and scale. It is a shared set of behaviors, patterns, styles, components, and standards we use to create a unified experience across products and prevent fragmentation as we scale design across products, platforms, and time zones.

For background, see [Puppet Design System](https://confluence.puppetlabs.com/display/PDS) on Confluence and the [Big Picture presentation](https://primetime.bluejeans.com/a2m/events/playback/33fcd61c-3ad2-4413-9393-cc216551d61b).

## Get started

To add the main package, `@puppet/react-components`, to an existing project:

```sh
echo "@puppet:registry=https://artifactory.delivery.puppetlabs.net/artifactory/api/npm/npm__local/" > .npmrc
npm install @puppet/react-components
```

To try out the design system from scratch, generate a new project with uikit:

```sh
npm install -g @puppet/uikit --registry=https://artifactory.delivery.puppetlabs.net/artifactory/api/npm/npm/
uikit generate project my-project
```

Then use the components in your pages:

```html
import { Button } from '@puppet/react-components';
<Button>Hello world!</Button>
```

See the [Getting Started](getting-started.md) guide for a walkthrough with examples of using the uikit, React components, Sass variables, and other packages.

## Styling

To use public Sass variables, add `@puppet/sass-variables` to your project:

```sh
npm install @puppet/react-components
```

Reference the [public variables](packages/sass-variables) from your Sass files:

```scss
@import '~@puppet/sass-variables/index';
.my-text {
  color: $puppet-amber;
}
```

## Packages

The Puppet Design System includes:

- Design assets: UI library, Styleguide, logos, icons [packages/design-assets](packages/design-assets)
- Puppet React Components: Library of reusable React components [packages/react-components](packages/react-components)
- Puppet React Layouts: Library of reusable React layouts like login screens [packages/react-layouts](packages/react-layouts)
- Puppet Sass Variables: A set of public Sass variables for color palettes, typography, borders, etc. [packages/sass-variables](packages/sass-variables)
- Puppet UI Toolkit: A `uikit` CLI for generating apps, components, etc. [packages/uikit](packages/uikit)
- Puppet Design System Website: The website documenting the Design System [packages/design-system-website](packages/design-system-website)

## Contribute

The Puppet Design System is a cross-functional team effort across Puppet with shared ownership where contributions are welcome and encouraged. Find out more about this PDS contribution model and process: [Contribution guidelines](CONTRIBUTING.md)

## Feedback

We are continuing to iterate on the PDS, and appreciate your feedback and questions. Say hi Slack in the [#team-design-system](https://puppet.slack.com/messages/CFFECRQAY) channel, contact <puppet-design-system@puppet.com> or [report an issue](https://tickets.puppetlabs.com/secure/CreateIssueDetails!init.jspa?pid=16902&issuetype=1&priority=6) in Jira (the "PDS" project).


## Release Notes

See the changelog for each package, like react-components' [CHANGELOG.md](packages/react-components/CHANGELOG.md).
