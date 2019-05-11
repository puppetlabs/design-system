The ActionMenu component allows users to execute actions from a dropdown menu list appearing below a button element. It can be rendered with the full set of stylistic options available to the button component. It supports both imperative actions handled with click events and navigation actions with anchor tags.

### Basic use

Actions are specified by entries in an `actions` array prop. In most cases, action callbacks should be specified with the `onClick` property of each action item. If the action involves navigation, an anchor tag or custom link component with appropriate props (`href` or `to`) specifying the navigation location. Each action can optionally include an icon.
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

### Icon ActionMenu

A common variant will use an icon (often the `kebab` icon) instead of button text.

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
    type="secondary"
    actions={actions}
    icon="kebab"
    style={style}
  />
  <ActionMenu
    id="action-menu-six"
    type="tertiary"
    actions={actions}
    icon="kebab"
    style={style}
  />
  <ActionMenu
    id="action-menu-seven"
    type="transparent"
    actions={actions}
    icon="kebab"
    style={style}
  />
</div>
```

### Menu Anchor

The `anchor` prop can be used to specify the corner at which the dropdown menu list should be anchored to the button target. This is most useful with icon ActionMenus because the width of the dropdown menu list will exceed the width of the button target, but may also be useful if standard ActionMenus are rendered near the bottom of a content area.

```
const actions = [
  { id: 'one', icon: 'pencil', label: 'Do thing one', onClick() { console.log('Thing one'); } },
  { id: 'two', icon: 'send', label: 'Do thing two', onClick() { console.log('Thing two'); } },
  { id: 'three', as: 'a', href: 'https://www.google.com', target: "_blank", label: 'Open link', icon: 'link' },
];

const style = { display: 'inline-block', margin: 10 };

<div>
  <ActionMenu
    id="action-menu-eight"
    actions={actions}
    type="tertiary"
    icon="chevron-down"
    style={style}
  />
  <ActionMenu
    id="action-menu-nine"
    anchor="top left"
    actions={actions}
    type="tertiary"
    icon="chevron-up"
    style={style}
  />
  <ActionMenu
    id="action-menu-ten"
    anchor="top right"
    actions={actions}
    type="tertiary"
    icon="chevron-up"
    style={style}
  />
  <ActionMenu
    id="action-menu-eleven"
    anchor="bottom right"
    actions={actions}
    type="tertiary"
    icon="chevron-down"
    style={style}
  />
</div>
```
