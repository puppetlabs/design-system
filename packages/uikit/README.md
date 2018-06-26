# Puppet UI Toolkit

A toolkit for all aspects of ui development at Puppet

## Background

This repo started as a side project intended to form the basis of a ui toolkit and component library. With the recent addition of the insights team and their existing component library, we've decided to stop development on the component library but ramp up on the peripheral aspects of the uikit. At some point in the future perhaps we will merge these two endeavors.

## Installation

### Global via Artifactory

The uikit is published internally via Artifactory. We recommend installing globally so that you have global access to the scripts:

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
  Generates a puppet react project in the current directory.
- **Component**: `uikit generate component MyComponent`
  Generates component boilerplate, including a test and scss file in the current directory.

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

## Styleguide

This repo also includes code for a Puppet Styleguide to convey design principles and provide sandbox environments for ui components. This project is not currently being actively developed, but it may be picked up again after our component library hardens.

- `npm start`: Start the styleguide dev server. Will be served on `localhost:3456`
- `npm run build`: Build a production bundle of uikit code
- `npm run build:storybook`: Build a production bundle for the styleguide app
- `npm run serve`: Serve the production styleguide bundles
- `npm test`: Run all tests with jest
- `npm run test:watch`: Run tests in watch mode
- `npm run test:coverage`: Run tests with coverage reporting
- `npm run format`: Run auto code formatting
