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

### indeterminate state

```jsx
class IndeterminateExample extends React.Component {
  constructor() {
    super()
    this.state = {
      checkBoxes : [{ checked: false}, { checked: false}, { checked: false}],
    }
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
    })
  }

  onClick(checked, i) {
    const { checkBoxes } = this.state;
    checkBoxes[i].checked = checked;
    this.setState({
      checkBoxes: checkBoxes,
    })
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
          checked={ticked === checkBoxes.length}
          onChange={checked => this.onSelectAll(checked)}
        />
      {checkBoxes.map((box, i) => <Checkbox
          name={`Box ${i}`}
          label={`Box ${i}`}
          checked={box.checked}
          onChange={(checked) => this.onClick(checked, i)}
        />)}
      </div>
    )
  }
}

<IndeterminateExample />

```
