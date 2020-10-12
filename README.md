# Puppet Design System

The Puppet Design System represents the behaviors, components, principles and visual presentation we share. It is based on our objective to provide consistency, efficiency, and quality experiences to our customers. With it, we scale design across departments, products, platforms, and time zones.

Visit the documentation and living styleguide at <https://puppetlabs.github.io/design-system>.

## Quick start

### Prerequisites

Currently, a POSIX environment like macOS or Linux is required for development. (For Windows, you can use [Windows Subsystem for Linux](https://docs.microsoft.com/en-us/windows/wsl/).) You must install the version of Node specified in [`.nvmrc`](.nvmrc). We recommend using [nvm](https://github.com/nvm-sh/nvm) (Node Version Manager), which allows you to `nvm install` the specified version and `nvm use` the specified version in the current shell (or `nvm alias default` to use the specified version in all new shells).

### Local sandbox

The primary development environment uses [Styleguidist](https://react-styleguidist.js.org) (which is what is also hosted at <https://puppet.style>). You can run it locally to view the docs and play around with components using live editable code:

```sh
git clone git@github.com:puppetlabs/design-system.git && cd design-system
npm install
npm start
```

### With an existing app

To add the main package, `@puppet/react-components`, to an existing project:

```sh
npm install @puppet/react-components
```

### New app from scratch

To try out the design system from scratch, generate a new project with uikit:

```sh
npm install -g @puppet/uikit
uikit generate project my-project
```

### Add components

```html
import { Button } from '@puppet/react-components';
<Button>Hello world!</Button>
```

### Use common styles

To use public Sass variables, add `@puppet/sass-variables` to your project:

```sh
npm install @puppet/sass-variables
```

Reference the [public variables](packages/sass-variables) from your Sass files:

```scss
@import '~@puppet/sass-variables/index';
.my-text {
  color: $puppet-amber;
}
```

Note: See the [Getting Started](getting-started.md) guide for a longer walkthrough with examples of using the uikit, React components, Sass variables, and other packages.

## Packages

The Puppet Design System includes:

- Puppet React Components: Library of reusable React components [packages/react-components](packages/react-components)
- Puppet React Layouts: Library of reusable React layouts like login screens [packages/react-layouts](packages/react-layouts)
- Puppet Sass Variables: A set of public Sass variables for color palettes, typography, borders, etc. [packages/sass-variables](packages/sass-variables)
- Puppet UI Toolkit: A `uikit` CLI for generating apps, components, etc. [packages/uikit](packages/uikit)
- Puppet Design System Website: The website documenting the Design System [packages/design-system-website](packages/design-system-website)

## Contribute

The Puppet Design System is a cross-functional team effort across Puppet with shared ownership where contributions are welcome and encouraged. Read more in [CONTRIBUTING.md](CONTRIBUTING.md).

## Feedback

We are continuing to iterate on the Puppet Design System and appreciate your feedback and questions. Feel free to create an issue, pull request, or contact <puppet-design-system@puppet.com>. Puppet employees can follow along in Slack ([#team-design-system](https://puppet.slack.com/messages/CFFECRQAY)) or Jira ([PDS](https://tickets.puppetlabs.com/secure/RapidBoard.jspa?projectKey=PDS&rapidView=1018&view=planning)).


## Release Notes

See the changelog for each package, like react-components' [CHANGELOG.md](CHANGELOG.md).
