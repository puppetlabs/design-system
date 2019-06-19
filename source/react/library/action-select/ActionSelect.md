The ActionSelect component allows users to execute actions from a dropdown menu list appearing below a button element. It can be rendered with the full set of stylistic options available to the button component. It supports both imperative actions handled with click events and navigation actions with anchor tags.

### Basic use

Actions are specified by entries in an `actions` array prop. In most cases, action callbacks should be specified with the `onClick` property of each action item. If the action involves navigation, an anchor tag or custom link component with appropriate props (`href` or `to`) can be rendered with the `as` prop. Each action can optionally include an icon.

```jsx
const actions = [
  { id: 'one', icon: 'pencil', label: 'Do thing one', onClick() { console.log('Thing one'); } },
  { id: 'two', icon: 'send', label: 'Do thing two', onClick() { console.log('Thing two'); } },
  { id: 'three', as: 'a', href: 'https://www.google.com', target: "_blank", label: 'Open link', icon: 'link' },
];

const style = { display: 'inline-block', margin: 10 };

<div>
  <ActionSelect
    actions={actions}
    label="Choose an Action"
    style={style}
  />
  <ActionSelect
    type="secondary"
    actions={actions}
    label="Choose an Action"
    style={style}
  />
  <ActionSelect
    type="tertiary"
    actions={actions}
    label="Choose an Action"
    style={style}
  />
</div>
```

### Icon ActionSelect

A common variant will use an icon (often the `kebab` icon) instead of button text.

```jsx
const actions = [
  { id: 'one', icon: 'pencil', label: 'Do thing one', onClick() { console.log('Thing one'); } },
  { id: 'two', icon: 'send', label: 'Do thing two', onClick() { console.log('Thing two'); } },
  { id: 'three', as: 'a', href: 'https://www.google.com', target: "_blank", label: 'Open link', icon: 'link' },
];

const style = { display: 'inline-block', margin: 10 };

<div>
  <ActionSelect
    actions={actions}
    icon="kebab"
    style={style}
  />
  <ActionSelect
    type="secondary"
    actions={actions}
    icon="kebab"
    style={style}
  />
  <ActionSelect
    type="tertiary"
    actions={actions}
    icon="kebab"
    style={style}
  />
  <ActionSelect
    type="transparent"
    actions={actions}
    icon="kebab"
    style={style}
  />
</div>
```

### Menu Anchor

The `anchor` prop can be used to specify the corner at which the dropdown menu list should be anchored to the button target. This is most useful with icon ActionSelects because the width of the dropdown menu list will exceed the width of the button target, but may also be useful if standard ActionSelects are rendered near the bottom of a content area.

```jsx
const actions = [
  { id: 'one', icon: 'pencil', label: 'Do thing one', onClick() { console.log('Thing one'); } },
  { id: 'two', icon: 'send', label: 'Do thing two', onClick() { console.log('Thing two'); } },
  { id: 'three', as: 'a', href: 'https://www.google.com', target: "_blank", label: 'Open link', icon: 'link' },
];

const style = { display: 'inline-block', margin: 10 };

<div>
  <ActionSelect
    actions={actions}
    type="tertiary"
    icon="chevron-down"
    style={style}
  />
  <ActionSelect
    anchor="top left"
    actions={actions}
    type="tertiary"
    icon="chevron-up"
    style={style}
  />
  <ActionSelect
    anchor="top right"
    actions={actions}
    type="tertiary"
    icon="chevron-up"
    style={style}
  />
  <ActionSelect
    anchor="bottom right"
    actions={actions}
    type="tertiary"
    icon="chevron-down"
    style={style}
  />
</div>
```
