## Overview

The Link component encapsulates link styling but allows rendering of custom HTML elements.

Links drill into item details (for example, about a specific node). Apply text links to body content elements and body-small content elements, but not to titles or headings. The application of a link does not change the underlying type style, except by the addition of color and an underline.

For links that drill into item details:

- Use the most clearly identifiable piece of information about the item being drilled into; for example, the node name or event time stamp.
- Use capitalization appropriate to the item that the link is named after.

Consider these 3 states for links: hover, focused and pressed (similar to [Button](#/React%20Components/Button) states).

## Types

### Primary Links

Primary inline links are blue (B500), to differentiate from the text around them. There are two sizes for inline links: The default size, and a small size.

```jsx
<Link as="a" href="http://google.com" target="_blank">
  Primary Link
</Link>
```

### Secondary Links

Secondary links use the color of the text around them. In order to meet WCAG AA 2.0 standards, the initial state must be underlined. Hover, focus, and pressed states are the same as blue inline links.

```jsx
<Link type="secondary" as="a" href="http://google.com" target="_blank">
  Secondary Link
</Link>
```

## Variations

### Link as a Button

This variation is a link that acts like a [Button](#/React%20Components/Button), in that they carry out a specified action when clicked. These are styled the same as primary links.

```jsx
import Button from '../button';

<Link as={Button} onClick={() => console.log('Clicked link as button')}>
  Link as Button
</Link>;
```

# Related

- [Button](#/React%20Components/Button)
- [Text](#/React%20Components/Text)
