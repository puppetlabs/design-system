## Overview

The text component is a foundational element that provides an encapsulated way to use typography, consistent with design system rules. Together the `size` and `color` props determine the rendered typographical variant.

Our products use three font families, with their various weights and sizes, to communicate clearly with our users. Don’t introduce new typographic styles to our products without consulting the UX team.

### Font families

The following 3 font families are utilized in a variety of styles. The use cases for these are outlined below.

- <strong>Calibre</strong>: Headings, titles, navigation, visualizations, and other primary elements (See [Heading](#/React%20Components/Heading))
- <strong>Open Sans</strong>: Body copy and general UI elements and content (like this `Text` component)
- <strong>Inconsolata</strong>: Code samples (See [Code](#/React%20Components/Code))

See also: [Heading](#/React%20Components/Heading), [Code](#/React%20Components/Code) and [Content](#/React%20Components/Content)

## Types

### Primary

The primary (default) text is categorized as Body text, used for page content.

- Font Family: Open Sans
- Font weight: 400 Regular
- Size / line height: 14px / 20px

```jsx
<Text>Default text size</Text>
```

## Variations

### Text sizes

Most text should have a size of medium, the default, but small and tiny are also options.

```jsx
<Text><strong>Medium:</strong> Body text is the most common size.</Text>
<Text size="small"><strong>Small:</strong> Small text is used in some places like card content.</Text>
<Text size="tiny"><strong>Tiny:</strong> Tiny text is rarely used.</Text>
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
