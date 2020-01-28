## Overview

The `Checkbox` component is a lightly styled wrapper around an HTML checkbox input. It leaves most auxiliary functionality to the [`Form.Field`](#/React%20Components/FormField) wrapper. We recommend that in most cases the `Checkbox` is used through the `Form.Field` component to ensure complete design consistency, but there may be some cases in which a pure Checkbox element is desired.

### States and interaction

Checkboxes provide built in support for hover, active, and focused interactions. All checkboxes also provide error and disabled states as needed.

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
    value
  />
  <Checkbox
    name="checkbox-ex-disabled"
    label="Disabled"
    style={exampleStyle}
    value
    disabled
  />
  <Checkbox name="checkbox-ex-error" label="Error" style={exampleStyle} error />
</div>;
```

## Basic use

When the checkbox is used within a [Form](#Form) component, the value state is either tracked or controlled through the Form component.

### Event handling

When the checkbox is used outside of a [Form](#Form) component, the user is responsible for managing value state.

```jsx
<Checkbox
  name="checkbox-ex-event-handling"
  label="Checkbox label is also clickable"
  value={state.checked}
  onChange={checked => setState({ checked })}
/>
```

## Variations

### Indeterminate state

Indeterminate state is indicated with a dash in the checkbox instead of a checkmark or a blank box. Indeterminate state is controlled separately from the checkbox value by the user.

In this example, indeterminate state is used for the "Select All" checkbox when only some of the options below it are selected.

```jsx
class IndeterminateExample extends React.Component {
  constructor() {
    super();
    this.state = {
      checkBoxes: [{ checked: false }, { checked: false }, { checked: false }],
    };
    this.onClick = this.onClick.bind(this);
    this.onSelectAll = this.onSelectAll.bind(this);
  }

  onSelectAll(checked) {
    const { checkBoxes } = this.state;
    checkBoxes.forEach(box => {
      box.checked = checked;
    });
    this.setState({
      checkBoxes,
    });
  }

  onClick(checked, i) {
    const { checkBoxes } = this.state;
    checkBoxes[i].checked = checked;
    this.setState({
      checkBoxes: checkBoxes,
    });
  }

  render() {
    const { checkBoxes } = this.state;
    let ticked = 0;
    checkBoxes.forEach(box => {
      if (box.checked) {
        ticked += 1;
      }
    });

    return (
      <div>
        <Checkbox
          name="Select All"
          label="Select All"
          indeterminate={ticked > 0 && ticked < checkBoxes.length}
          value={ticked === checkBoxes.length}
          onChange={checked => this.onSelectAll(checked)}
          style={{ fontWeight: 'bold' }}
        />
        {checkBoxes.map((box, i) => (
          <Checkbox
            name={`Box ${i}`}
            label={`Box ${i}`}
            value={box.checked}
            key={i}
            onChange={checked => this.onClick(checked, i)}
          />
        ))}
      </div>
    );
  }
}

<IndeterminateExample />;
```

## Related

- [Form](#/React%20Components/Form)
- [Form.Field](#/React%20Components/FormField)
