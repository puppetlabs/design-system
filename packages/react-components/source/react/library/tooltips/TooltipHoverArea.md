_Note: Aria attributes to be set on Tooltip and TooltipHoverArea components post-1.0_

## Overview

Use tooltips to provide instructional or contextual information beyond what fits in short descriptions. Tooltips fall under two length categories. Short tooltips are one line and their width is determined by the length of content they contain. Long tooltips have a specified width and vary in height to accommodate their content. By default, tooltips are viewed on-hover, but long tooltips have a variation where they’re invoked with a click and need to be explicitly dismissed. Use the long variation if the tooltip contains a link. It is recommended you apply style and classes to TooltipHoverArea, not the children. Because this component is a wrapper, any styles or classes passed to TootipHoverArea will be passed to the children when it is disabled to ensure continuity.

### Microcopy

- Use complete sentences with appropriate capitalization and punctuation.
- Be concise. Use short words and sentences, and don’t explain more than the user needs to know to complete the task at hand. - If necessary, link to docs for more information.

### Example: Basic tooltip

```jsx
const Button = require('../button/Button.js').default;

<TooltipHoverArea tooltip="I'm a happy tooltip!" anchor="bottom">
  <Button>I'm a happy button!</Button>
</TooltipHoverArea>;
```

### Example: A `TooltipHoverArea` in a scrolling container

```jsx
const Button = require('../button/Button.js').default;

const parentStyle = {
  maxHeight: '200px',
  overflow: 'scroll',
};

const childStyle = {
  padding: '40px',
  height: '300px',
  backgroundColor: 'gray',
};

<div style={parentStyle}>
  <div style={childStyle}>
    <TooltipHoverArea tooltip="I'm a happy tooltip!" anchor="right">
      <Button>I'm a happy button!</Button>
    </TooltipHoverArea>
  </div>
</div>;
```

### Example: Enable/Disable `TooltipHoverArea`

```jsx
const Button = require('../button/Button.js').default;
const { useState } = require('react');

const [modalIsEnabled, setEnabled] = useState(true);

<div>
  <TooltipHoverArea
    enabled={modalIsEnabled}
    tooltip="I'm a happy tooltip!"
    anchor="right"
  >
    <Button onClick={() => setEnabled(!modalIsEnabled)}>
      {`Click me to ${modalIsEnabled ? 'disable' : 'enable'} tooltip`}
    </Button>
  </TooltipHoverArea>
</div>;
```
