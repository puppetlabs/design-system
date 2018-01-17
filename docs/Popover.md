```
const Button = require('../source/react/library/Button.js').default;
const target = <Button label="Default Popover" />;

<Popover target={ target }>
  I am a popover
</Popover>
```

Bottom right popover
```
const Button = require('../source/react/library/Button.js').default;
const target = <Button label="Bottom right popover" />;

<Popover target={ target } anchor="bottom right">
  I am a popover
</Popover>
```

Top left popover
```
const Button = require('../source/react/library/Button.js').default;
const target = <Button label="Left top popover" />;

<Popover target={ target } anchor="left top">
  I am a popover
</Popover>
```

Top right popover
```
const Button = require('../source/react/library/Button.js').default;
const target = <Button label="Right top popover" />;

<Popover target={ target } anchor="right top">
  I am a popover
</Popover>
```