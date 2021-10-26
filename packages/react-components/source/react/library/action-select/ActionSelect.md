## Overview

The ActionSelect component allows users to execute actions from a dropdown menu list appearing below a button element. It can be rendered with the full set of stylistic options available to the button component. It supports both imperative actions handled with click events and navigation actions with anchor tags.

Menus allow a user to select from a list of things. Menus are scrollable if there are enough options to warrant it, and can have simple text options, or can be combined with an icon for quicker comprehension. ActionSelect is used to perform an action that doesn’t result in a direct change to the page, otherwise known as a non-stateful action.

See also: [ButtonSelect](#/React%20Components/ButtonSelect), [Select](#/React%20Components/Select)

## Basic use

Actions are specified by entries in an `actions` array prop. In most cases, action callbacks should be specified with the `onClick` property of each action item. If the action involves navigation, an anchor tag or custom link component with appropriate props (`href` or `to`) can be rendered with the `as` prop. Each action can optionally include an icon.

```jsx
const actions = [
  {
    id: 'one',
    icon: 'pencil',
    label: 'Do thing one',
    onClick() {
      console.log('Thing one');
    },
  },
  {
    id: 'two',
    icon: 'send',
    label: 'Do thing two',
    onClick() {
      console.log('Thing two');
    },
  },
  {
    id: 'three',
    as: 'a',
    href: 'https://www.google.com',
    target: '_blank',
    label: 'Open link',
    icon: 'link',
  },
];

const style = { display: 'inline-block', margin: 10 };

<div>
  <ActionSelect actions={actions} label="Choose an Action" style={style} />
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
</div>;
```

## Variations

### Icon ActionSelect

A common variant will use an icon (often the `kebab` icon) instead of button text.

```jsx
const actions = [
  {
    id: 'one',
    icon: 'pencil',
    label: 'Do thing one',
    onClick() {
      console.log('Thing one');
    },
  },
  {
    id: 'two',
    icon: 'send',
    label: 'Do thing two',
    onClick() {
      console.log('Thing two');
    },
  },
  {
    id: 'three',
    as: 'a',
    href: 'https://www.google.com',
    target: '_blank',
    label: 'Open link',
    icon: 'link',
  },
];

const style = { display: 'inline-block', margin: 10 };

<div>
  <ActionSelect actions={actions} icon="kebab" style={style} />
  <ActionSelect type="secondary" actions={actions} icon="kebab" style={style} />
  <ActionSelect type="tertiary" actions={actions} icon="kebab" style={style} />
  <ActionSelect
    type="transparent"
    actions={actions}
    icon="kebab"
    style={style}
  />
</div>;
```

### Menu Anchor

The `anchor` prop can be used to specify the corner at which the dropdown menu list should be anchored to the button target. This is most useful with icon ActionSelects because the width of the dropdown menu list will exceed the width of the button target, but may also be useful if standard ActionSelects are rendered near the bottom of a content area.

```jsx
const actions = [
  {
    id: 'one',
    icon: 'pencil',
    label: 'Do thing one',
    onClick() {
      console.log('Thing one');
    },
  },
  {
    id: 'two',
    icon: 'send',
    label: 'Do thing two',
    onClick() {
      console.log('Thing two');
    },
  },
  {
    id: 'three',
    as: 'a',
    href: 'https://www.google.com',
    target: '_blank',
    label: 'Open link',
    icon: 'link',
  },
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
</div>;
```

### Custom Width

Use the `width` prop to customize the width of the button.

```jsx
const actions = [
  {
    id: 'one',
    icon: 'pencil',
    label: 'Do thing one',
    onClick() {
      console.log('Thing one');
    },
  },
  {
    id: 'two',
    icon: 'send',
    label: 'Do thing two',
    onClick() {
      console.log('Thing two');
    },
  },
  {
    id: 'three',
    as: 'a',
    href: 'https://www.google.com',
    target: '_blank',
    label: 'Open link',
    icon: 'link',
  },
];

const style = { display: 'inline-block', margin: 10 };

<div>
  <ActionSelect
    actions={actions}
    label="Choose an Action"
    style={style}
    width="200px"
  />
</div>;
```

## Action properties

### Disabled actions

Use the `disabled` object property to disable a row in a dropdown and prevent onClick actions from happening.

```jsx
const actions = [
  {
    id: 'one',
    icon: 'pencil',
    label: 'Do thing one',
    disabled: true,
    onClick() {
      console.log('Thing one');
    },
  },
  {
    id: 'two',
    icon: 'send',
    label: 'Do thing two',
    onClick() {
      console.log('Thing two');
    },
  },
  {
    id: 'three',
    as: 'a',
    href: 'https://www.google.com',
    target: '_blank',
    label: 'Open link',
    icon: 'link',
  },
];

const style = { display: 'inline-block', margin: 10 };

<div>
  <ActionSelect actions={actions} label="Choose an Action" style={style} />
</div>;
```

### Icons

Specify the `icon` prop on each action to display a supported icon to the left of that option, or use the `svg` prop to use a custom icon.

```jsx
const customIcon = {
  viewBox: '0 0 16 16',
  svg: (
    <path
      fill="#818f99"
      fillRule="evenodd"
      d="M8 .2A8 8 0 0 0 5.47 15.79c.4.074.546-.173.546-.385 0-.19-.007-.693-.01-1.36-2.226.483-2.695-1.073-2.695-1.073-.364-.924-.889-1.17-.889-1.17-.726-.496.055-.486.055-.486.803.056 1.226.824 1.226.824.713 1.222 1.872.87 2.328.665.073-.517.279-.87.508-1.07-1.777-.201-3.644-.888-3.644-3.953 0-.874.312-1.588.823-2.147-.082-.202-.357-1.016.078-2.117 0 0 .672-.215 2.2.82A7.662 7.662 0 0 1 8 4.068c.68.004 1.364.092 2.003.27 1.527-1.035 2.198-.82 2.198-.82.436 1.101.162 1.915.08 2.117.512.56.822 1.273.822 2.147 0 3.073-1.87 3.75-3.653 3.947.287.247.543.735.543 1.482 0 1.069-.01 1.932-.01 2.194 0 .214.144.463.55.385A8 8 0 0 0 8 .2"
    />
  ),
};

const actions = [
  {
    id: 'custom-icon',
    svg: customIcon.svg,
    label: 'GitHub',
    onClick() {
      console.log('GitHub');
    },
  },
  {
    id: 'standard-icon',
    icon: 'question-circle',
    label: 'Other',
    onClick() {
      console.log('Other');
    },
  },
];

const style = { display: 'inline-block', margin: 10 };

<div>
  <ActionSelect
    actions={actions}
    label="Choose a source control"
    style={style}
  />
</div>;
```

## Related

- [ButtonSelect](#/React%20Components/ButtonSelect)
- [Button](#/React%20Components/Button)
- [Card.Action](#/React%20Components/Card)
- [Form.Field](#/React%20Components/FormField)
- [Modal](#/React%20Components/Modal)
- [Select](#/React%20Components/Select)
