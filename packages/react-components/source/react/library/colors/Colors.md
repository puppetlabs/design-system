## Overview

Puppet's color palettes have various themes that associate a particular color and its tonal range with a particular functional role. Don't introduce new colors into your products without consulting the UX team. To ensure accessibility for the greatest number of users, use the color contrast ratios recommended here.

### Palettes

Each hue is made up of a gradient of colors from light to dark, broken up into individual swatches. We use a numbering scheme of 50 to 950, with 50 representing the lightest shade and 950 representing the darkest. 0 is reserved for white and 1000 for black. 500 represents the base tone from which the rest of the palette is created. These tones are mapped to specific uses, e.g. 50 and 100 are primarily used for light backgrounds, 700 and above for text.

### Interactions

We follow a consistent process for creating interactions. Our base color tone begins at 500. Hover states use a lighter color, typically 400. Pressed or active states are typically 600. 300 is used for focus.

## Brand palette

Puppet's primary brand color is Amber. This particular color should only be used in the context of Puppet logos, or on dark backgrounds, such as the sidebar component.

_Note: Do not use brand colors other than amber. These colors are being revisited as part of our brand refresh._

```jsx
const colors = ['brand-primary', 'brand-secondary'];

<Colors colors={colors} />;
```

## UI palette

Code should always reference the Sass color variable (instead of directly referencing hex values). The variable definitions are located in [\_palettes.scss](https://github.com/puppetlabs/design-system/blob/master/packages/sass-variables/_palettes.scss) in the `sass-variables` package, e.g. `$puppet-black`, `$puppet-n950`, etc.

### Neutral colors

Use the UI palette use neutral colors for product chrome: trim, backgrounds, containers, content zones, and other foundational parts.

```jsx
const colors = [
  'black',
  'n950',
  'n900',
  'n850',
  'n800',
  'n700',
  'n600',
  'n500',
  'n400',
  'n300',
  'n200',
  'n100',
  'n50',
  'white',
];

<Colors colors={colors} />;
```

## Action palette

Use the actions palette for only the most important actions a user can take on a page — often buttons or links. B500 is also used to indicate "on", whenever a component begins as transparent or a neutral color, e.g. the border of input fields change from grey to blue.

### Blues

```jsx
colors = [
  'b900',
  'b800',
  'b700',
  'b600',
  'b500',
  'b400',
  'b300',
  'b200',
  'b100',
  'b50',
];

<Colors colors={colors} />;
```

## Stoplight palette

We use red, yellow, and green to indicate status, similar to a stop light and other traffic signals. We can not rely on color alone to assist all users. Red and green can be hard to distinguish by users afflicted with a common form of color blindness. Because of this always use another method such as icons or text to supplement the status.

### Reds

Use red to indicate destructive actions, errors and failures.

```jsx
colors = [
  'r900',
  'r800',
  'r700',
  'r600',
  'r500',
  'r400',
  'r300',
  'r200',
  'r100',
  'r50',
];

<Colors colors={colors} />;
```

### Yellows

Use yellow to indicate warnings. Yellow is a particularly troublesome color to work with when testing for accessibility. Consult a UX designer when using yellow.

`New rules for yellow are under review. Yellow 600 and above is being considered for deprecation, with specific rules exceptions being made for its use.`

```jsx
colors = [
  'y900',
  'y800',
  'y700',
  'y600',
  'y500',
  'y400',
  'y300',
  'y200',
  'y100',
  'y50',
];

<Colors colors={colors} />;
```

### Greens

Use green to indicate success or to indicate approval actions.

```jsx
colors = [
  'g900',
  'g800',
  'g700',
  'g600',
  'g500',
  'g400',
  'g300',
  'g200',
  'g100',
  'g50',
];

<Colors colors={colors} />;
```

### Purples

Purple is still under consideration for its particular use case. It is being considered to indicate instructions or information.

```jsx
colors = [
  'p900',
  'p800',
  'p700',
  'p600',
  'p500',
  'p400',
  'p300',
  'p200',
  'p100',
  'p50',
];

<Colors colors={colors} />;
```
