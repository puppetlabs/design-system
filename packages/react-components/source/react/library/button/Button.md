Puppet products use a family of buttons, with each button intended for a different purpose.

### Primary

Used for the single most important action on any given page, generally defined as the action which moves  the user forward in a workflow (e.g. next, submit, continue, run, etc.) or resolves a workflow (e.g. delete, apply, commit, etc.). A primary action button should be used sparingly: no more than 1 primary action per page  or instance.

```jsx
const buttonStyle = { margin: 5 };

<div>
  <Button style={buttonStyle}>Primary</Button>
  <Button loading style={buttonStyle}>
    Primary
  </Button>
  <Button disabled style={buttonStyle}>
    Primary
  </Button>
</div>;
```

### Secondary

Used to be ghost button. This button is used to show as hierarchically less important than the primary action, or the predominant action on the page when no action is deemed of primary importance.

```jsx
const buttonStyle = { margin: 5 };

<div>
  <Button type="secondary" style={buttonStyle}>
    Secondary
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

Used to be “Secondary action button”. The most commonly used button. It showcases actions that a user might take on any given page which are not the single most important action; this might include micro-workflows such as applying a filter, confirming a change, etc.

```jsx
const buttonStyle = { margin: 5 };

<div>
  <Button type="tertiary" style={buttonStyle}>
    Tertiary
  </Button>
  <Button type="tertiary" loading style={buttonStyle}>
    Tertiary
  </Button>
  <Button type="tertiary" disabled style={buttonStyle}>
    Tertiary
  </Button>
</div>;
```

### Danger

To indicate a dangerous or destructive action, we utilize a red button. This button should always come with descriptive text so as not to rely solely on a color for meaning. For actions of lesser implications, use the subtle version.

#### Bold

```jsx
const buttonStyle = { margin: 5 };

<div>
  <Button type="danger" style={buttonStyle}>
    Danger Bold
  </Button>
  <Button type="danger" loading style={buttonStyle}>
    Danger Bold
  </Button>
  <Button type="danger" disabled style={buttonStyle}>
    Danger Bold
  </Button>
</div>;
```

#### Subtle

```jsx
const buttonStyle = { margin: 5 };

<div>
  <Button type="danger" weight="subtle" style={buttonStyle}>
    Danger Subtle
  </Button>
  <Button type="danger" weight="subtle" loading style={buttonStyle}>
    Danger Subtle
  </Button>
  <Button type="danger" weight="subtle" disabled style={buttonStyle}>
    Danger Subtle
  </Button>
</div>;
```

### Icon button

When working with a small amount of real estate, icon buttons can be used when the designer is sure that the icon used is clear enough with its action. Because of clarity issues, icon buttons should be used only when no other interface element is appropriate (e.g. Edit, Add, Settings, Profile, More, Trash, Close/Remove, Show/Hide, Expand/Collapse, Full screen, Help, Information, Link, Attach, Notification, Export, Chart). Icon buttons can be used with an additional "transparent" variation for minimalism in place.

```jsx
const buttonStyle = { margin: 2 };

<div>
  <div>
    <Button icon="pencil" style={buttonStyle} />
    <Button icon="pencil" style={buttonStyle} loading />
    <Button icon="pencil" style={buttonStyle} disabled />
  </div>
  <div>
    <Button type="secondary" style={buttonStyle} icon="pencil" />
    <Button type="secondary" style={buttonStyle} icon="pencil" loading />
    <Button type="secondary" style={buttonStyle} icon="pencil" disabled />
  </div>
  <div>
    <Button type="tertiary" style={buttonStyle} icon="pencil" />
    <Button type="tertiary" style={buttonStyle} icon="pencil" loading />
    <Button type="tertiary" style={buttonStyle} icon="pencil" disabled />
  </div>
  <div>
    <Button type="transparent" style={buttonStyle} icon="pencil" />
    <Button type="transparent" style={buttonStyle} icon="pencil" loading />
    <Button type="transparent" style={buttonStyle} icon="pencil" disabled />
  </div>
</div>;
```

### Text button

The lowest level button in the visual hierarchy. These are so far most often used at the bottom of a menu, or for card controls. Designed to work reasonably well inline.

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
