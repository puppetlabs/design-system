```
const Button = require('../buttons/Button.js').default;

<TooltipHoverArea tooltip="I'm a happy tooltip!" anchor="bottom" >
  <Button>I'm a happy button!</Button>
</TooltipHoverArea>
```

A `TooltipHoverArea` in a scrolling container:

```
const Button = require('../buttons/Button.js').default;

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
    <TooltipHoverArea tooltip="I'm a happy tooltip!" anchor="bottom" >
      <Button>I'm a happy button!</Button>
    </TooltipHoverArea>
  </div>
</div>
```
