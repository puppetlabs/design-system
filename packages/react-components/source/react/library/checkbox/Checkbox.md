The Checkbox component is a lightly styled wrapper around an html checkbox input. It leaves most auxiliary functionality to the [FormField](#form) wrapper. We recommend that in most cases the Checkbox is used through the FormField component be used to ensure complete design consistency, but there may be some cases in which a pure Checkbox element is desired.

### Basic use

```jsx
const exampleStyle = { marginRight: 10 };

<div>
  <Checkbox
    name="checkbox-ex-unchecked"
    label="Unchecked"
    style={exampleStyle}
  />
  <Checkbox
    name="checkbox-ex-checked"
    label="Checked"
    style={exampleStyle}
    checked
  />
  <Checkbox
    name="checkbox-ex-disabled"
    label="Disabled"
    style={exampleStyle}
    checked
    disabled
  />
  <Checkbox name="checkbox-ex-error" label="Error" style={exampleStyle} error />
</div>;
```

### Event handling

```jsx
<Checkbox
  name="checkbox-ex-event-handling"
  label="Checkbox label is also clickable"
  value={state.checked}
  onChange={checked => setState({ checked })}
/>
```
