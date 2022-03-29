_Note: Aria attributes to be set on Tooltip and TooltipHoverArea components post-1.0_

## Overview

Use tooltips to provide instructional or contextual information beyond what fits in short descriptions. By default, tooltip text is centered and will wrap if the width it exceeds 200px. If anything other than a string is passed to a tooltip, it will adjust to fit the content. Tooltips will remain open if you hover over them, allowing users to click links or interact with content.

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

const [modalIsDisabled, setDisabled] = useState(false);

<div>
  <TooltipHoverArea
    disabled={modalIsDisabled}
    tooltip="I'm a happy tooltip!"
    anchor="right"
  >
    <Button onClick={() => setDisabled(!modalIsDisabled)}>
      {`Click me to ${!modalIsDisabled ? 'disable' : 'enable'} tooltip`}
    </Button>
  </TooltipHoverArea>
</div>;
```
