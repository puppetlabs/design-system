The Switch component is a lightly styled wrapper around an html checkbox input. It leaves most auxiliary functionality to the [FormField](#form) wrapper. We recommend that in most cases the Switch is used through the FormField component be used to ensure complete design consistency, but there may be some cases in which a pure Switch element is desired.

Design specification: <a href="http://designsystem.puppetlabs.net/forms" target="_top">designsystem.puppetlabs.net/forms</a>

```jsx
const exampleStyle = { marginRight: 10 };

<div>
  <Switch name="switch-ex-unchecked" label="Unchecked" style={exampleStyle} />
  <Switch name="switch-ex-checked" label="Checked" style={exampleStyle} checked />
  <Switch name="switch-ex-disabled" label="Disabled" style={exampleStyle} checked disabled/>
</div>
```

### Event handling

```jsx
<Switch
  name="foo"
  label="Is this thing on yet?"
  className="test-class"
  checked={ state.checked }
  onChange={ () => { setState({ checked: !state.checked }) } }
/>
```
