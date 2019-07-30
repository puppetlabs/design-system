# A resource for creating user interfaces based on brand, UX, and dev principles

The Puppet Design System is a resource for creating user interfaces based on brand, UX, and dev principles that can be used to improve consistency, efficiency, and scale. It is a shared set of behaviors, patterns, styles, components, and standards and standards we use to create a unified experience across products and prevent fragmentation as we scale design across products, platforms, and time zones.

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

## Contribute

The Puppet Design System is a cross-functional team effort across Puppet with shared ownership where contributions are welcome and encouraged. Find out more about this PDS contribution model and process: [Contribution guidelines](https://github.com/puppetlabs/design-system/blob/master/CONTRIBUTING.md)

## Feedback

We are continuing to iterate on the PDS, and appreciate your feedback and questions. Say hi Slack in the [#team-design-system](https://puppet.slack.com/messages/CFFECRQAY) channel, contact <puppet-design-system@puppet.com> or [report an issue](https://tickets.puppetlabs.com/secure/CreateIssueDetails!init.jspa?pid=16902&issuetype=1&priority=6) in Jira (the "PDS" project).

## Release Notes

See the changelog for each package, like react-components' [CHANGELOG.md](https://github.com/puppetlabs/design-system/blob/master/packages/react-components/CHANGELOG.md).
