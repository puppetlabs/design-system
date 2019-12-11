## Overview

Puppet products use a family of buttons, with each button intended for a different purpose. Buttons are different from links. They carry out a specified action when clicked, such as submitting a form, adding content to a list, or initiating edit functionality. Avoid using them to provide navigation.

### Microcopy

- When providing a label for a button, use an imperative verb and a noun, for example: Add group. The verb-plus-noun construction increases usability and eliminates ambiguity for localization.
- Rarely, just the imperative verb is ok (Apply, Add, Remove) if the context is crystal clear.
- Use sentence-case capitalization: Capitalize the first word, and lowercase all other words except proper nouns.

### States and interaction

Buttons provide built in support for hover, active, and focused interactions. All buttons also provide loading and disabled states as needed.

## Types

### Primary

Use a primary action button for the single most important action on the page — the action which initiates a workflow (e.g. Add node, Create report, etc.), moves the user forward in a workflow (e.g. next, submit, continue, run, etc.), or resolves a workflow (e.g. delete, apply, commit, etc.).

A primary action button should be used sparingly: no more than 1 primary action per page or instance (e.g. within a modal).

```jsx
const buttonStyle = { margin: 2 };

<div>
  <Button style={buttonStyle}>Primary</Button>
  <Button style={buttonStyle} icon="pencil">
    Primary with icon
  </Button>
  <Button loading style={buttonStyle}>
    Primary
  </Button>
  <Button disabled style={buttonStyle}>
    Primary
  </Button>
</div>;
```

### Secondary

Use this button for actions that are important, but hierarchically less important than the primary action. Use it for the predominant action on the page when there is no primary action.

```jsx
const buttonStyle = { margin: 2 };

<div>
  <Button type="secondary" style={buttonStyle}>
    Secondary
  </Button>
  <Button type="secondary" style={buttonStyle} icon="pencil">
    Secondary with icon
  </Button>
  <Button type="secondary" loading style={buttonStyle}>
    Secondary
  </Button>
  <Button type="secondary" disabled style={buttonStyle}>
    Secondary
  </Button>
</div>;
```

### Tertiary

This button type is for less important actions that a user might take on a page, for example, for micro-workflows such as applying a filter or confirming a change.

```jsx
const buttonStyle = { margin: 2 };

<div>
  <Button type="tertiary" style={buttonStyle}>
    Tertiary
  </Button>
  <Button type="tertiary" icon="pencil" style={buttonStyle}>
    Tertiary with icon
  </Button>
  <Button type="tertiary" loading style={buttonStyle}>
    Tertiary
  </Button>
  <Button type="tertiary" disabled style={buttonStyle}>
    Tertiary
  </Button>
</div>;
```

### Transparent

Use this button when the design is dense or getting cluttered, or for low-level actions when the hierarchy is deep. For example, transparent buttons are effective in toolbars, or for actions inside a table cell.

```jsx
const buttonStyle = { margin: 2 };

<div>
  <Button type="transparent" style={buttonStyle}>
    Transparent
  </Button>
  <Button type="transparent" icon="pencil" style={buttonStyle}>
    Transparent with icon
  </Button>
  <Button type="transparent" loading style={buttonStyle}>
    Transparent
  </Button>
  <Button type="transparent" disabled style={buttonStyle}>
    Transparent
  </Button>
</div>;
```

### Danger

Use a red button to indicate a dangerous or destructive action. Always provide descriptive text, and get wording advice from a writer.

```jsx
const buttonStyle = { margin: 2 };

<div>
  <Button type="danger" style={buttonStyle}>
    Danger
  </Button>
  <Button type="danger" icon="trash" style={buttonStyle}>
    Danger with icon
  </Button>
  <Button type="danger" loading style={buttonStyle}>
    Danger
  </Button>
  <Button type="danger" disabled style={buttonStyle}>
    Danger
  </Button>
</div>;
```

#### Danger subtle

For actions with less severe implications, or when many destructive actions are visible, use the subtle style.

```jsx
const buttonStyle = { margin: 2 };

<div>
  <Button type="danger" weight="subtle" style={buttonStyle}>
    Danger subtle
  </Button>
  <Button type="danger" weight="subtle" style={buttonStyle} icon="trash">
    Danger subtle with icon
  </Button>
  <Button type="danger" weight="subtle" loading style={buttonStyle}>
    Danger subtle
  </Button>
  <Button type="danger" weight="subtle" disabled style={buttonStyle}>
    Danger subtle
  </Button>
</div>;
```

### Text button

The lowest level button in the visual hierarchy. Similar in appearance to links, these are used to reduce visual weight or noise and are reserved for extremely compact use cases.

Example uses include adding content to a text list, providing actions within a menu, or providing card controls. Note that you should use these for actions, not navigations. See the [Link component](#/React%20Components/Link) for more information.

```jsx
const buttonStyle = { margin: 2 };

<div>
  <Button type="text" style={buttonStyle}>
    Text
  </Button>
  <Button type="text" icon="plus" style={buttonStyle}>
    Add option
  </Button>
  <Button type="text" trailingIcon="chevron-down" style={buttonStyle}>
    Select option
  </Button>
</div>;
```

## Variations

### Icon

Use icons to assist in understanding the purpose of a button, or to help distinguish the button from similar actions that lie in close proximity. By default, include words to describe the button as this is much more accessible. Icons are available for use in every button type.

_Note_: Indicating states (danger, success, warning) with icon colors is reserved for specific use cases within alerts and messages. Do not use color on icon buttons arbitrarily.

#### Example: Transparent buttons with only icons

```jsx
const buttonStyle = { margin: 2 };

<div>
  <div>
    <Button type="transparent" icon="pencil" style={buttonStyle} />
    <Button type="transparent" icon="pencil" style={buttonStyle} loading />
    <Button type="transparent" icon="pencil" style={buttonStyle} disabled />
  </div>
</div>;
```

#### Example: Acceptable icons - with and without text

Use an icon by itself when you’re working with smaller spaces and are sure that the meaning of clicking a button is clear enough by its picture. A few icons are common across many applications and are acceptable for use. Solo icon buttons must provide a tooltip with [TooltipHoverArea](#/React%20Components/TooltipHoverArea).

```jsx
const divStyle = { marginBottom: 16 };

<div>
  <div style={divStyle}>
    <Button type="secondary" icon="plus" />
    <Button type="secondary" icon="plus">
      Add
    </Button>
  </div>
  <div style={divStyle}>
    <Button type="secondary" icon="pencil" />
    <Button type="secondary" icon="pencil">
      Attach
    </Button>
  </div>
  <div style={divStyle}>
    <Button type="secondary" icon="area-chart" />
    <Button type="secondary" icon="area-chart">
      Chart
    </Button>
  </div>
  <div style={divStyle}>
    <Button type="secondary" icon="pencil" />
    <Button type="secondary" icon="pencil">
      Edit
    </Button>
  </div>
  <div style={divStyle}>
    <Button type="secondary" icon="question-circle" />
    <Button type="secondary" icon="question-circle">
      Help
    </Button>
  </div>
  <div style={divStyle}>
    <Button type="secondary" icon="hamburger" />
    <Button type="secondary" icon="hamburger">
      Menu
    </Button>
  </div>
  <div style={divStyle}>
    <Button type="secondary" icon="kebab" />
    <Button type="secondary" icon="kebab">
      More
    </Button>
  </div>
  <div style={divStyle}>
    <Button type="secondary" icon="profile" />
    <Button type="secondary" icon="profile">
      Profile
    </Button>
  </div>
  <div style={divStyle}>
    <Button type="secondary" icon="trash" />
    <Button type="secondary" icon="trash">
      Remove
    </Button>
  </div>
  <div style={divStyle}>
    <Button type="secondary" icon="gear" />
    <Button type="secondary" icon="gear">
      Settings
    </Button>
  </div>
  <div style={divStyle}>
    <Button type="secondary" icon="zoom-in" />
    <Button type="secondary" icon="zoom-in">
      Zoom In
    </Button>
  </div>
  <div style={divStyle}>
    <Button type="secondary" icon="zoom-out" />
    <Button type="secondary" icon="zoom-out">
      Zoom Out
    </Button>
  </div>
</div>;
```

### Button as hyperlink

If the design specifies a call-to-action (CTA) button that actually performs navigation, it is important for accessibility and interaction with browser features that the rendered HTML is a normal `<a href="link-to-somewhere">` anchor element. The way to render a Button component as an `a` element is to use react-component's `as` prop pattern, e.g. `<Button as="a" href="http://google.com">`.

```jsx
<Button as="a" href="http://google.com">
  Go to Google
</Button>
```

### Inner focus outline

Add the boolean prop `innerFocus` in cases where a button is inside a container (e.g. toolbar, card) and needs the focus style to use an inner instead of outer outline so it doesn't bleed outside the container.

```jsx
<Button innerFocus>Focus me</Button>
```

## Related

- [ButtonSelect](#/React%20Components/ButtonSelect)
- [ActionSelect](#/React%20Components/ActionSelect)
- [Icon](#/React%20Components/Icon)
- [Loading](#/React%20Components/Loading)
- [Form](#/React%20Components/Form)
- [TooltipHoverArea](#/React%20Components/TooltipHoverArea)
