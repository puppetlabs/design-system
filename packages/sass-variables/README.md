# Puppet Sass Variables

Puppet Sass Variables is a set of public Sass variables corresponding to Puppet Design System color palettes, typography, borders, and spacing.

## sass-variables

To use public Sass variables, add `@puppet/sass-variables` to your project:

```sh
npm install @puppet/sass-variables
```

Reference the public variables from your Sass files:

```scss
@use '~@puppet/sass-variables' as *;

.my-text {
  color: $puppet-amber;
}
```

```scss
@use '~@puppet/sass-variables' as *;

.my-class {
  @include puppet-type-body(subtle);

  background-color: $puppet-n200;
  border: $puppet-common-border;
}
```

See the Sass files for a complete list of common variables and mixins (e.g. [\_common.scss](_common.scss), [\_typography.scss](_typography.scss), and color [\_palettes.scss](_palettes.scss) )
