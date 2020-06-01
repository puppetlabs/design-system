## Overview

The Heading component is another typographical element. It is related to the [Text component](#/React%20Components/Text), but it covers the text treatments that live outside of the body, small and tiny styles defined in the Text componenet.

### Font family

The Heading component uses the **Calibre** font.

Our products use three font families, with their various weights and sizes, to communicate clearly with our users. Don’t introduce new typographic styles to our products without consulting the UX team. Each font faimly is intended for a different set of use cases:

- <strong>Calibre</strong> is for headings, titles, navigation, visualizations, and other primary elements.
- <strong>Open Sans</strong> is for body copy and general UI elements and content.
- <strong>Inconsolata</strong> is for code samples.

If Calibre isn't right for your use case, consider whether one of these alternatives would be more appropriate than overriding the font family of the Heading component:

- use the [Text](#/React%20Components/Text) component to render general text in Open Sans,
- use the [Code](#/React%20Components/Code) component to render code in Inconsolata,
- use the [Content](#/React%20Components/Content) component to automatically format arbitrary markup using all three fonts as appropriate, or
- write styles for your own component using the sass mixins defined in the `@puppet/sass-variables` package's `_typography` partial as needed.

See the [Typography](#/Foundations/Typography) page for more guidance on font families and font use.

## Types

### Primary

The primary (default) header style is in the color Neutral 900, in various weights and sizes.

```jsx
<Heading as="h1" hero>Hero</Heading>
<Heading as="h1">Heading 1</Heading>
<Heading as="h2">Heading 2</Heading>
<Heading as="h3">Heading 3</Heading>
<Heading as="h4">Heading 4</Heading>
<Heading as="h5">Heading 5</Heading>
<Heading as="h6">Heading 6</Heading>
<Heading label>Label</Heading>
```

### Secondary

Another option for the header color is Neutral 700 (`medium`).

```jsx
<Heading as="h1" color="medium" hero>Hero</Heading>
<Heading as="h1" color="medium">Heading 1</Heading>
<Heading as="h2" color="medium">Heading 2</Heading>
<Heading as="h3" color="medium">Heading 3</Heading>
<Heading as="h4" color="medium">Heading 4</Heading>
<Heading as="h5" color="medium">Heading 5</Heading>
<Heading as="h6" color="medium">Heading 6</Heading>
<Heading label color="medium">Label</Heading>
```

Another option for the header color is Neutral 600 (`subtle`), used as the most subtle treatment.

```jsx
<Heading as="h1" color="subtle" hero>Hero</Heading>
<Heading as="h1" color="subtle">Heading 1</Heading>
<Heading as="h2" color="subtle">Heading 2</Heading>
<Heading as="h3" color="subtle">Heading 3</Heading>
<Heading as="h4" color="subtle">Heading 4</Heading>
<Heading as="h5" color="subtle">Heading 5</Heading>
<Heading as="h6" color="subtle">Heading 6</Heading>
<Heading label color="subtle">Label</Heading>
```

## Related

- [Colors](#/React%20Components/Colors)
- [Content](#/React%20Components/Content)
- [Text](#/React%20Components/Text)
