# Puppet UI Toolkit

A toolkit for all aspects of ui development at Puppet

## Installation

### Prerequisites

Install a recent version of Node.js (including npm), typically the latest LTS version, e.g. `brew install node@8`.

Set up npm to use [Artifactory](https://artifactory.delivery.puppetlabs.net) for packages with a scope of `@puppet` like uikit:

```
npm config set @puppet:registry https://artifactory.delivery.puppetlabs.net/artifactory/api/npm/npm__local/
```

### Global via Artifactory

Install uikit globally to make the `uikit` command available in your shell.

```
npm i -g @puppet/uikit
```

### Local for development

If you want to develop in this project but still want access to the scripts globally, clone this repo then run

```
npm link
```

Any script run with `uikit <command>` will access the most recent code in your repo.

## Generators

The uikit includes a script for generating arbitrary boilerplate through template files. Available templates:

- **Project**: `uikit generate project my-project`
  Generates a puppet react project.
- **Component**: `uikit generate component MyComponent`
  Generates component boilerplate, including a test and scss file.
- **Method**: `uikit generate method myMethod`
  Generates utility method boilerplate

#### Specifying a directory:

By default the script will generate the template in the current working directory. Optionally you may specify a path to another directory with the `--directory` (`-d`) option:

```
uikit generate <template> <name> -d <path to directory>
```

#### Scss modules

Passing a `--modules=true` or `-m` option will generate code with scss module support

## Contributing

### Filing issues

uikit and [react-components](https://github.com/puppetlabs/react-components) use the Product Design System project in Jira for tracking tickets: <https://tickets.puppetlabs.com/browse/PDS>

### Adding a generator

The uikit generator script will execute a command of the form `uikit generate <template> <name>` if there is a matching template in `/templates` and the specified template is 'registered' as a valid cli option.

To create a new generator template:

1.  Add the name of your template to `TEMPLATE_OPTIONS` in `bin/uikit.js`.
2.  Create a directory with your desired template files. If a file in your template has the `.handlebars` extension, the generator script will compile it as a handlebars template, stripping the `.handlebars` extension from the filename. The handlebars template will have access to the following variables:

- `name`: An object with name variants derived from the cli argument:
  - `name.caps`: Capitalized name (e.g. `MyComponent`)
  - `name.camel`: Camelcased name (e.g. `myComponent`)
  - `name.dash`: Dashcased name (e.g. `my-component`)

In addition, the filename itself of `.handlebars` files will be compiled as a handlebars template. This is useful if you want to generate named files such as `MyComponent.jsx`.

3. Optionally, add a `.uikitrc.js` file to the template directory. The file should optionally export a `preGenerate` and `postGenerate` action, each passed the destination directory of the resulting templated output.

```
module.exports = {
  preGenerate({ dest }) {
    ...
  },
  postGenerate({ dest }) {
    ...
  },
}
```
