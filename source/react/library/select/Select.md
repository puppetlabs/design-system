The Select component allows users to select a value or set of values from a list of options. It behaves much like a form element, but is intended for use outside of forms for general page control. The selected value is updated automatically when the user selects a new option.

### Basic use

Options are specified by entries in an `options` array prop. Each requires a unique value and a friendly label to display to users.
```
const options = [
  { value: 'one', label: 'One' },
  { value: 'two', label: 'Two' },
  { value: 'three', label: 'Three' },
  { value: 'four', label: 'Four' },
  { value: 'five', label: 'Five' },
  { value: 'six', label: 'Six' },
];

const style = { margin: 10 };

<div>
  <Select
    id="button-select-one"
    options={options}
    placeholder="Select a value"
    style={style}
    value={state.value1}
    onChange={value1 => {
      console.log('New Value:', value1);
      setState({ value1 });
    }}
  />
</div>
```
