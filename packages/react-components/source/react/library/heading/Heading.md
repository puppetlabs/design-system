## Overview

The Heading component is another typographical element. It is related to the [Text component](#/React%20Components/Text), but it covers the text treatments that live outside of the body, small and tiny styles defined in the Text componenet.

### Font families

The following 2 font families are utilized in the Heading component.

- <strong>Calibre</strong>: Titles (hero's), heading (sizes 1-4), and labels
- <strong>Open Sans</strong>: Heading (sizes 5 & 6)

See also: [Text](#/React%20Components/Text) and [Content](#/React%20Components/Content)

## Types

### Primary

The primary (default) header style is in the color Neutral 900 (base), in various weights and sizes.

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

Another option for the header color is Neutral 700 (medium).

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

Another option for the header color is Neutral 600 (subtle), used as the most subtle treatment.

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
