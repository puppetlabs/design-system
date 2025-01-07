## Overview

The `Radio Button` component is a lightly styled wrapper around an HTML radio input. It leaves most auxiliary functionality to the [`Form.Field`](#/React%20Components/FormField) wrapper. We recommend that in most cases the `Radio Button` is used through the `Form.Field` component to ensure complete design consistency, but there may be some cases in which a pure RadioButton element is desired.

### States and interaction

Radio buttons provide built in support for hover, active, and focused interactions. All radio buttons also provide error and disabled states as needed.

```jsx
const exampleStyle = { marginRight: 10 };
const [value, setValue] = React.useState('unchecked');

<div>
  <RadioButton
    name="radiobutton-ex"
    label="Unchecked"
    style={exampleStyle}
    value="unchecked"
    selectedValue={value}
    onChange={setValue}
  />
  <RadioButton
    name="radiobutton-ex"
    label="Checked"
    style={exampleStyle}
    value="checked"
    selectedValue={value}
    onChange={setValue}
  />
  <RadioButton
    name="radiobutton-ex"
    label="Disabled"
    style={exampleStyle}
    value="disabled"
    selectedValue={value}
    onChange={setValue}
    disabled
  />
  <RadioButton
    name="radiobutton-ex"
    label="Error"
    style={exampleStyle}
    value="error"
    selectedValue={value}
    onChange={setValue}
    error
  />
</div>;
```

## Basic use

When the radio button is used within a [Form](#Form) component, the value state is either tracked or controlled through the Form component.

### Event handling

When the radio button is used outside of a [Form](#Form) component, the user is responsible for managing value state.

```jsx
const [value, setValue] = React.useState('foo');

<RadioButton
  name="radiobutton-ex-event-handling"
  label="Radio button label is also clickable"
  value={state.checked}
  onChange={(checked) => setState({ checked })}
/>;
```

## Related

- [Form](#/React%20Components/Form)
- [Form.Field](#/React%20Components/FormField)
