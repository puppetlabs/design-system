_Note: Aria attributes to be set on Tooltip and TooltipHoverArea components post-1.0_

```
const Button = require('../button/Button.js').default;

<TooltipHoverArea tooltip="I'm a happy tooltip!" anchor="bottom" >
  <Button>I'm a happy button!</Button>
</TooltipHoverArea>
```

A `TooltipHoverArea` in a scrolling container:

```
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

<div style={ parentStyle }>
  <div style={ childStyle } >
    <TooltipHoverArea tooltip="I'm a happy tooltip!" anchor="right" >
      <Button>I'm a happy button!</Button>
    </TooltipHoverArea>
  </div>
</div>
```
