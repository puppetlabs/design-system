## Overview

Badges are persistent informational components. They give the user context for what they’re looking at, providing metadata or additional info on elements in the ui. Badges can have inherent meaning conveyed by color, but must be understandable based solely on the string of text that they contain for accessibility. The component defaults to the bold, neutral colored square badge, which can be changed to suit the desired meaning or effect.

## Type

### Default Badges

```jsx
<Badge type="danger">Danger</Badge>
<Badge type="info">Info</Badge>
<Badge>Neutral (default)</Badge>
<Badge type="success">Success</Badge>
<Badge type="warning">Warning</Badge>
```

### Pill badges

```jsx
<Badge pill type="danger">12</Badge>
<Badge pill type="info">24</Badge>
<Badge pill>36</Badge>
<Badge pill type="success">48</Badge>
<Badge pill type="warning">60</Badge>
```

## Variations

### Subtle badges

```jsx
<Badge weight="subtle" type="danger">Danger</Badge>
<Badge weight="subtle" type="info">Info</Badge>
<Badge weight="subtle">Neutral (default)</Badge>
<Badge weight="subtle" type="success">Success</Badge>
<Badge weight="subtle" type="warning">Warning</Badge>
```

```jsx
<Badge pill weight="subtle" type="danger">12</Badge>
<Badge pill weight="subtle" type="info">24</Badge>
<Badge pill weight="subtle">36</Badge>
<Badge pill weight="subtle" type="success">48</Badge>
<Badge pill weight="subtle" type="warning">60</Badge>
```
