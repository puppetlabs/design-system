```
const Button = require('../buttons/Button.js').default;
const target = <Button>Default Popover</Button>;

<Popover target={ target }>
  I am a popover
</Popover>
```

Bottom right popover

```
const Button = require('../buttons/Button.js').default;
const target = <Button>Bottom right popover</Button>;

<Popover target={ target } anchor="bottom right">
  I am a popover
</Popover>
```

Top left popover

```
const Button = require('../buttons/Button.js').default;
const target = <Button>Left top popover</Button>;

<Popover target={ target } anchor="left top">
  I am a popover
</Popover>
```

Top right popover

```
const Button = require('../buttons/Button.js').default;
const target = <Button>Right top popover</Button>;

<Popover target={ target } anchor="right top">
  I am a popover
</Popover>
```

Dark popover

```
const Button = require('../buttons/Button.js').default;
const target = <Button>Dark popover</Button>;

<Popover dark target={ target }>
  I am a dark popover
</Popover>
```
