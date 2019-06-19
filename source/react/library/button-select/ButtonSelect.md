The ButtonSelect component allows users to select a value or set of values from a list of options. It behaves much like a form element, but is intended for use outside of forms for general page control. The selected value is updated automatically when the user selects a new option.

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

const style = { display: 'inline-block', margin: 10 };

<div style={{ display: 'flex', alignItems: 'center' }}>
  <ButtonSelect
    options={options}
    placeholder="Select a value"
    style={style}
    value={state.value1}
    onChange={value1 => {
      console.log('New Value:', value1);
      setState({ value1 });
    }}
  />
  <ButtonSelect
    type="secondary"
    options={options}
    placeholder="Select a value"
    style={style}
    value={state.value2}
    onChange={value2 => {
      console.log('New Value:', value2);
      setState({ value2 });
    }}
  />
  <ButtonSelect
    type="tertiary"
    options={options}
    placeholder="Select a value"
    style={style}
    value={state.value3}
    onChange={value3 => {
      console.log('New Value:', value3);
      setState({ value3 });
    }}
  />
  <ButtonSelect
    type="transparent"
    options={options}
    placeholder="Select a value"
    style={style}
    value={state.value4}
    onChange={value4 => {
      console.log('New Value:', value4);
      setState({ value4 });
    }}
  />
  <ButtonSelect
    type="text"
    options={options}
    placeholder="Select a value"
    style={style}
    value={state.value5}
    onChange={value5 => {
      console.log('New Value:', value5);
      setState({ value5 });
    }}
  />
</div>
```

### Custom selected labels

An alternate `selectedLabel` prop can be specified on each option.

```jsx
initialState = {
  value: 'name',
}

const options = [
  { value: 'name', label: 'Name', selectedLabel: 'Sort by name' },
  { value: 'date', label: 'Date', selectedLabel: 'Sort by date' },
];

const style = { display: 'inline-block', margin: 10 };

<div>
  <ButtonSelect
    type="tertiary"
    options={options}
    placeholder="Select multiple things"
    style={style}
    value={state.value}
    onChange={value => {
      console.log('New Value', value);
      setState({ value });
    }}
  />
</div>
```

### Multiple selections

Multiple values can be selected if the `multiple` prop is `true`. In this mode an `Apply` button will render below the options list. The newly selected values are not applied until the user activates this button. If they escape or click out of the open menu, their changes will be discarded.

```jsx
initialState = {
  value: [],
}

const options = [
  { value: 'one', label: 'One' },
  { value: 'two', label: 'Two' },
  { value: 'three', label: 'Three' },
  { value: 'four', label: 'Four' },
  { value: 'five', label: 'Five' },
  { value: 'six', label: 'Six' },
];

const style = { display: 'inline-block', margin: 10 };

<div>
  <ButtonSelect
    type="tertiary"
    multiple
    options={options}
    placeholder="Select multiple things"
    style={style}
    value={state.value}
    onChange={value => {
      console.log('New Value', value);
      setState({ value });
    }}
  />
</div>
```

### Multiple selections, immediately applied

The default multi-select behavior can be overridden with the `applyImmediately` prop. In this mode, a 'done' button will still render for consistency but the values will be immediately applied.

```jsx
initialState = {
  value: [],
}

const options = [
  { value: 'one', label: 'One' },
  { value: 'two', label: 'Two' },
  { value: 'three', label: 'Three' },
  { value: 'four', label: 'Four' },
  { value: 'five', label: 'Five' },
  { value: 'six', label: 'Six' },
];

const style = { display: 'inline-block', margin: 10 };

<div>
  <ButtonSelect
    type="tertiary"
    multiple
    applyImmediately
    options={options}
    placeholder="Select multiple things"
    style={style}
    value={state.value}
    onChange={value => {
      console.log('New Value', value);
      setState({ value });
    }}
  />
</div>
```
