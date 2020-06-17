## Overview

The text component is a foundational element that provides an encapsulated way to use typography, consistent with design system rules. Together the `size` and `color` props determine the rendered typographical variant.

### Font family

The Text component uses the **Open Sans** font.

Our products use three font families, with their various weights and sizes, to communicate clearly with our users. Don’t introduce new typographic styles to our products without consulting the UX team. Each font faimly is intended for a different set of use cases:

- <strong>Open Sans</strong> is for body copy and general UI elements and content.
- <strong>Calibre</strong> is for headings, titles, navigation, visualizations, and other primary elements.
- <strong>Inconsolata</strong> is for code samples.

If Open Sans isn't right for your use case, consider whether one of these alternatives would be more appropriate than overriding the font family of the Heading component:

- use the [Heading](#/React%20Components/Heading) component to render headings in Calibre,
- use the [Code](#/React%20Components/Code) component to render code in Inconsolata,
- use the [Content](#/React%20Components/Content) component to automatically format arbitrary markup using all three fonts as appropriate, or
- write styles for your own component using the sass mixins defined in the `@puppet/sass-variables` package's `_typography` partial as needed.

See the [Typography](#/Foundations/Typography) page for more guidance on font families and font use.

### Size

Size is controlled with the `size` property. The default size is `regular`; other options are `large`, `medium`, `small`, and `tiny`.

All sizes use a regular weight (400), except `tiny`, which is semibold (600 weight). For bold text (700 weight), use `<strong>` tags inside your `Text` element.

- The default `regular` size is appropriate for most body text.
- The `medium` and `large` sizes are appropriate for use near headings that may dwarf smaller body font sizes, and for intro paragraphs that should attract the reader's attention.
- The `small` size is appropriate for some labels and card content.
- The `tiny` size should be used sparingly.

```jsx
import Code from '../code';
import Link from '../link';

<div>
  <Text size="large">
    <strong>Large:</strong> The <Code size='large'>five</Code> boxing <Link href="#" size='large'>wizards</Link> jump quickly.
  </Text>
  <Text size="medium">
    <strong>Medium:</strong> The <Code size='medium'>five</Code> boxing <Link href="#" size='medium'>wizards</Link> jump quickly.
  </Text>
  <Text size="regular">
    <strong>Regular (default):</strong> The <Code>five</Code> boxing <Link href="#">wizards</Link> jump quickly.
  </Text>
  <Text size="small">
    <strong>Small:</strong> The <Code size='small'>five</Code> boxing <Link href="#" size='small'>wizards</Link> jump quickly.
  </Text>
  <Text size="tiny">
    <strong>Tiny:</strong> The <Code size='tiny'>five</Code> boxing <Link href="#" size='tiny'>wizards</Link> jump quickly.
  </Text>
</div>;
```

### Text colors

Take into account expected behavior and accessibility guidelines when using text colors.

#### Neutral colors

Neutral colors are used for the majority of text. They are defined as Base (default), Medium, and Subtle.

```jsx
<Text><strong>Base</strong> (Neutral 900): This is the darkest and the most commonly used.</Text>
<Text color="medium"><strong>Medium</strong> (Neutral 700): This is used to reduce emphasis on text.</Text>
<Text color="subtle"><strong>Subtle</strong> (Neutral 600): This further reduces emphasis and is reserved for asides and supplemental information. Use for heading styles Heading 5 and larger.</Text>
```

#### Stoplight colors

Our "stoplight" colors are reserved to apply meaning, or state, within a given context. Use these for the text component (Body, Small, Tiny). They are defined as Success, Danger, and Warning.

```jsx
<Text color="success"><strong>Success</strong> (Green 700): Used to communicate a successful operation or general approval.</Text>
<Text color="danger"><strong>Danger</strong> (Yellow 600): This communicates a dangerous, irrecoverable action or failure of some kind.</Text>
<Text color="warning"><strong>Warning</strong> (Red 600): This is used to call attention to specific information or to provide a warning. Can also be used to convey an unknown state IF that could be problematic for the user.</Text>
```

## Related

- [Color](#/React%20Components/Colors)
- [Content](#/React%20Components/Content)
- [Heading](#/React%20Components/Heading)
- [Link](#/React%20Components/Link)
- [Code](#/React%20Components/Code)
