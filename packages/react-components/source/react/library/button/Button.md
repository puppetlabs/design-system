## Overview

<small class="rsg--pathline-29">Sketch symbol: puppet-ui-library / Button</small>

Puppet products use a family of buttons, with each button intended for a different purpose. Buttons are different from links. They carry out a specified action when clicked, such as submitting a form, adding content to a list, or initiating edit functionality. Avoid using them to provide navigation.

### Microcopy

* When providing a label for a button, use an imperative verb and a noun, for example: Add group. The verb-plus-noun construction increases usability and eliminates ambiguity for localization.
* Rarely, just the imperative verb is ok (Apply, Add, Remove) if the context is crystal clear.
* Use sentence-case capitalization: Capitalize the first word, and lowercase all other words except proper nouns.

### States and interaction

Buttons provide built in support for hover, active, and focused interactions. All buttons also provide loading and disabled states as needed.

## Types

### Primary

Use a primary action button for the single most important action on the page — the action which initiates a workflow (e.g. Add node, Create report, etc.), moves the user forward in a workflow (e.g. next, submit, continue, run, etc.), or resolves a workflow (e.g. delete, apply, commit, etc.).

A primary action button should be used sparingly: no more than 1 primary action per page or instance (e.g. within a modal).

```jsx
const buttonStyle = { margin: 4 };

<div>
  <Button style={buttonStyle}>Primary</Button>
  <Button style={buttonStyle} icon="pencil">Primary with icon</Button>
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
const buttonStyle = { margin: 4 };

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
const buttonStyle = { margin: 4 };

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
const buttonStyle = { margin: 4 };

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
const buttonStyle = { margin: 4 };

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
const buttonStyle = { margin: 4 };

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

*Note*: Indicating states (danger, success, warning) with icon colors is reserved for specific use cases within alerts and messages. Do not use color on icon buttons arbitrarily.

#### Example: Transparent buttons with only icons

```jsx
const buttonStyle = { margin: 4 };

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
const buttonStyle = { margin: 4 };

<div>
  <div>
    <Button icon="plus" style={buttonStyle} />
    <Button icon="plus">Add</button>
  </div>
  <div>
    <Button icon="pencil" style={buttonStyle} />
    <Button icon="pencil">Attach</button>
  </div>
  <div>
    <Button icon="area-chart" style={buttonStyle} />
    <Button icon="area-chart">Chart</button>
  </div>
  <div>
    <Button type="transparent" icon="x" style={buttonStyle} />
    <Button type="transparent" icon="x" style={buttonStyle}>Close</button>
  </div>
  <div>
    <Button icon="chevron-up" style={buttonStyle} />
    <Button icon="chevron-up">Collapse</button>
  </div>
  <div>
    <Button icon="pencil" style={buttonStyle} />
    <Button icon="pencil">Edit</button>
  </div>
  <div>
    <Button icon="email" style={buttonStyle} />
    <Button icon="email">Email</button>
  </div>
  <div>
    <Button icon="chevron-right" style={buttonStyle} />
    <Button icon="chevron-right">Expand</button>
  </div>
  <div>
    <Button icon="help" style={buttonStyle} />
    <Button icon="help">Help</button>
  </div>
  <div>
    <Button icon="home" style={buttonStyle} />
    <Button icon="home">Home</button>
  </div>
  <div>
    <Button icon="image" style={buttonStyle} />
    <Button icon="image">Image</button>
  </div>
  <div>
    <Button icon="hamburger" style={buttonStyle} />
    <Button icon="hamburger">Menu</button>
  </div>
  <div>
    <Button icon="kebab" style={buttonStyle} />
    <Button icon="kebab">More</button>
  </div>
  <div>
    <Button icon="profile" style={buttonStyle} />
    <Button icon="profile">Profile</button>
  </div>
  <div>
    <Button icon="trash" style={buttonStyle} />
    <Button icon="trash">Remove</button>
  </div>
  <div>
    <Button icon="gear" style={buttonStyle} />
    <Button icon="gear">Settings</button>
  </div>
  <div>
    <Button icon="zoom-in" style={buttonStyle} />
    <Button icon="zoom-in">Zoom In</button>
  </div>
  <div>
    <Button icon="zoom-out" style={buttonStyle} />
    <Button icon="zoom-out">Zoom Out</button>
  </div>
</div>;
```

## Related
*  [ButtonSelect](#/React%20Components/ButtonSelect)
*  [ActionSelect](#/React%20Components/ActionSelect)
*  [Icon](#/React%20Components/Icon)
*  [Loading](#/React%20Components/Loading)
*  [Form](#/React%20Components/Form)
*  [TooltipHoverArea](#/React%20Components/TooltipHoverArea)
