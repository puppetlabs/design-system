Puppet products use a family of buttons, with each button intended for a different purpose.

### Primary

Used for the single most important action on any given page, generally defined as the action which moves the user forward in a workflow (e.g. next, submit, continue, run, etc.) or resolves a workflow (e.g. delete, apply, commit, etc.). A primary action button should be used sparingly: no more than 1 primary action per page or instance.

```
const buttonStyle = { margin: 5 };

<div>
  <Button style={buttonStyle}>Primary</Button>
  <Button loading style={buttonStyle}>Primary</Button>
  <Button disabled style={buttonStyle}>Primary</Button>
</div>
```

### Secondary

Used to be ghost button. This button is used to show as hierarchically less important than the primary action, or the predominant action on the page when no action is deemed of primary importance.

```
const buttonStyle = { margin: 5 };

<div>
  <Button type="secondary" style={buttonStyle}>Secondary</Button>
  <Button type="secondary" loading style={buttonStyle}>Secondary</Button>
  <Button type="secondary" disabled style={buttonStyle}>Secondary</Button>
</div>
```

### Tertiary

Used to be “Secondary action button”. The most commonly used button. It showcases actions that a user might take on any given page which are not the single most important action; this might include micro-workflows such as applying a filter, confirming a change, etc.

```
const buttonStyle = { margin: 5 };

<div>
  <Button type="tertiary" style={buttonStyle}>Tertiary</Button>
  <Button type="tertiary" loading style={buttonStyle}>Tertiary</Button>
  <Button type="tertiary" disabled style={buttonStyle}>Tertiary</Button>
</div>
```

### Tertiary

To indicate a dangerous or destructive action, we utilize a red button. This button should always come with descriptive text so as not to rely solely on a color for meaning. For actions of lesser implications, use the subtle version.

#### Bold
```
const buttonStyle = { margin: 5 };

<div>
  <Button type="danger" style={buttonStyle}>Danger Bold</Button>
  <Button type="danger" loading style={buttonStyle}>Danger Bold</Button>
  <Button type="danger" disabled style={buttonStyle}>Danger Bold</Button>
</div>
```

#### Subtle
```
const buttonStyle = { margin: 5 };

<div>
  <Button type="danger" weight="subtle" style={buttonStyle}>Danger Subtle</Button>
  <Button type="danger" weight="subtle" loading style={buttonStyle}>Danger Subtle</Button>
  <Button type="danger" weight="subtle" disabled style={buttonStyle}>Danger Subtle</Button>
</div>
```

### Small buttons

Small buttons exist exclusively for use in the dashboard editor. Necessity of small buttons is under review.  

```
const buttonStyle = { margin: 2 };

<div>
  <Button size="small" style={buttonStyle}>Primary</Button>
  <Button size="small" type="secondary" style={buttonStyle}>Secondary</Button>
  <Button size="small" type="tertiary" style={buttonStyle}>Tertiary</Button>
  <Button size="small" type="danger" style={buttonStyle}>Danger Bold</Button>
  <Button size="small" type="danger" weight="subtle" style={buttonStyle}>Danger Subtle</Button>
</div>

```

### Transparent small button

The lowest level button in the visual hierarchy. These are so far most often used at the bottom of a menu, or for card controls.  

```
<Button size="small" type="transparent">Transparent</Button>

```

### Icon button

The lowest level button in the visual hierarchy. These are so far most often used at the bottom of a menu, or for card controls.  

```
<Button icon="pencil" />
<Button icon="chevron-down">Sheeeit</Button>
<Button size="small" icon="pencil" />
<Button size="small" icon="chevron-down">Sheeeit</Button>
<Button size="small" type="transparent" icon="pencil" />
<Button size="small" type="transparent" icon="chevron-down">Sheeeit</Button>

```
