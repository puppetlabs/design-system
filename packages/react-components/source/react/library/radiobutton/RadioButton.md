## Overview

The `Radio Button` component is a lightly styled wrapper around an HTML radio input. It leaves most auxiliary functionality to the [`Form.Field`](#/React%20Components/FormField) wrapper. We recommend that in most cases the `Radio Button` is used through the `Form.Field` component to ensure complete design consistency, but there may be some cases in which a pure RadioButton element is desired.

### States and interaction

Radio buttons provide built in support for hover, active, and focused interactions. All radio buttons also provide error and disabled states as needed.

```jsx
const exampleStyle = { marginRight: 10 };
const [value, setValue] = React.useState(0);

<div>
  <RadioButton
    name="radiobutton-ex-unchecked"
    label="Unchecked"
    style={exampleStyle}
    value={value === 0}
    onChange={() => setValue(0)}
  />
  <RadioButton
    name="radiobutton-ex-checked"
    label="Checked"
    style={exampleStyle}
    value={value === 1}
    onChange={() => setValue(1)}
  />
  <RadioButton
    name="radiobutton-ex-disabled"
    label="Disabled"
    style={exampleStyle}
    value={value === 2}
    onChange={() => setValue(2)}
    disabled
  />
  <RadioButton
    name="radiobutton-ex-error"
    label="Error"
    style={exampleStyle}
    value={value === 3}
    onChange={() => setValue(3)}
    error
  />
</div>;
```

## Basic use

When the radio button is used within a [Form](#Form) component, the value state is either tracked or controlled through the Form component.

### Event handling

When the radio button is used outside of a [Form](#Form) component, the user is responsible for managing value state.

```jsx
<RadioButton
  name="radiobutton-ex-event-handling"
  label="Radio button label is also clickable"
  value={state.checked}
  onChange={checked => setState({ checked })}
/>
```

## Related

- [Form](#/React%20Components/Form)
- [Form.Field](#/React%20Components/FormField)
