The action menu component allows execution of a set of actions in a dropdown menu rendered below a button element. They can be rendered with the full set of stylistic options available to the button component. It supports both imperative actions handled with click events and navigation actions with anchor tags.

### Basic use
```
const actions = [
  { id: 'one', icon: 'pencil', label: 'Do thing one', onClick() { console.log('Thing one'); } },
  { id: 'two', icon: 'send', label: 'Do thing two', onClick() { console.log('Thing two'); } },
  { id: 'three', as: 'a', href: 'https://www.google.com', target: "_blank", label: 'Open link', icon: 'link' },
];

const style = { display: 'inline-block', margin: 10 };

<div>
  <ActionMenu
    id="action-menu-one"
    actions={actions}
    label="Choose an Action"
    style={style}
  />
  <ActionMenu
    id="action-menu-two"
    type="secondary"
    actions={actions}
    label="Choose an Action"
    style={style}
  />
  <ActionMenu
    id="action-menu-three"
    type="tertiary"
    actions={actions}
    label="Choose an Action"
    style={style}
  />
</div>
```

### Icon Buttons and anchor targets

```
const actions = [
  { id: 'one', icon: 'pencil', label: 'Do thing one', onClick() { console.log('Thing one'); } },
  { id: 'two', icon: 'send', label: 'Do thing two', onClick() { console.log('Thing two'); } },
  { id: 'three', as: 'a', href: 'https://www.google.com', target: "_blank", label: 'Open link', icon: 'link' },
];

const style = { display: 'inline-block', margin: 10 };

<div>
  <ActionMenu
    id="action-menu-four"
    actions={actions}
    icon="kebab"
    style={style}
  />
  <ActionMenu
    id="action-menu-five"
    anchor="top left"
    type="tertiary"
    actions={actions}
    icon="kebab"
    style={style}
  />
  <ActionMenu
    id="action-menu-six"
    anchor="bottom right"
    type="transparent"
    actions={actions}
    icon="kebab"
    style={style}
  />
</div>
```
