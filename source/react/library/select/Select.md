The Select component is a form element allowing for selection of a value from a set of options.

### Basic use

Options are specified by entries in an `options` array prop. Each requires a unique value and a friendly label to display to users.

```jsx
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
    name="select-example"
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
