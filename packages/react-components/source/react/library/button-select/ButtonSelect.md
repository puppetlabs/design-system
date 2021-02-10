## Overview

The `ButtonSelect` component allows users to select a value or set of values from a list of options. It behaves much like a form element, but is intended for use outside of forms as a general page control. The selected value is updated automatically when the user selects a new option, so it can be used to change content on a page without the need for a separate "submit" button.

## Basic use

Options are specified by entries in an `options` array prop. Each requires a unique `value` and a friendly `label` to display to users.

```jsx
const options = [
  { value: 'hello', label: 'Hello' },
  { value: 'world', label: 'World' },
  { value: 'hi', label: 'Hi' },
  { value: 'mom', label: 'Mom' },
];

<ButtonSelect
  options={options}
  value={state.value}
  onChange={value => {
    console.log('New Value:', value);
    setState({ value });
  }}
/>;
```

## Types

The visual types of `ButtonSelect` are "primary", "secondary", "tertiary", "danger", "transparent", "text".

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
    type="danger"
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
</div>;
```

## Variations

### Multiple selections

Multiple values can be selected if the `multiple` prop is `true`. In this mode an "Apply" button will render below the options list. The newly selected values are not applied until the user activates this button. If the user clicks the "Cancel" button, presses escape, or click out of the open menu, their changes will be discarded.

```jsx
initialState = {
  value: [],
};

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
</div>;
```

### Multiple selections, immediately applied

Warning: Consult with your UX designer prior to using this option. We are considering deprecating this behavior in order to simplify multi-select menus.

The default multi-select behavior can be overridden with the `applyImmediately` prop. In this mode, a 'Done' button will still render for consistency but the values will be immediately applied. If the user escapes or clicks out of the open menu, their changes will be discarded.

```jsx
initialState = {
  value: [],
};

const options = [
  { value: 'one', label: 'One' },
  { value: 'two', label: 'Two' },
  { value: 'three', label: 'Three' },
  { value: 'four', label: 'Four' },
  { value: 'five', label: 'Five' },
  { value: 'six', label: 'Six' },
  { value: 'seven', label: 'Seven' },
  { value: 'eight', label: 'Eight' },
  { value: 'nine', label: 'Nine' },
  { value: 'ten', label: 'Ten' },
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
</div>;
```

### Custom Width

Use the `width` prop to customize the width of the button.

```jsx
const options = [
  { value: 'hello', label: 'Hello' },
  { value: 'world', label: 'World' },
  { value: 'hi', label: 'Hi' },
  { value: 'mom', label: 'Mom' },
];

<ButtonSelect
  options={options}
  value={state.value}
  onChange={value => {
    console.log('New Value:', value);
    setState({ value });
  }}
  width="100px"
/>;
```

## Option properties

### Custom selected labels

An alternate `selectedLabel` prop can be specified on each option.

```jsx
initialState = {
  value: 'name',
};

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
</div>;
```

### Disabled options

Use the `disabled` object property to disable a row in a dropdown.

```jsx
const options = [
  { value: 'hello', label: 'Hello' },
  { value: 'world', label: 'World' },
  { value: 'hi', label: 'Hi', disabled: true },
  { value: 'mom', label: 'Mom', disabled: true },
];

<ButtonSelect
  options={options}
  value={state.value}
  onChange={value => {
    console.log('New Value:', value);
    setState({ value });
  }}
/>;
```

### Icons

Specify the `icon` prop on each option to display a supported icon to the left of that option, or use the `svg` prop to use a custom icon.

```jsx
const customIcon = {
  viewBox: '0 0 16 16',
  svg: (
    <path
      fill="#818f99"
      fillRule="evenodd"
      d="M8 .2A8 8 0 0 0 5.47 15.79c.4.074.546-.173.546-.385 0-.19-.007-.693-.01-1.36-2.226.483-2.695-1.073-2.695-1.073-.364-.924-.889-1.17-.889-1.17-.726-.496.055-.486.055-.486.803.056 1.226.824 1.226.824.713 1.222 1.872.87 2.328.665.073-.517.279-.87.508-1.07-1.777-.201-3.644-.888-3.644-3.953 0-.874.312-1.588.823-2.147-.082-.202-.357-1.016.078-2.117 0 0 .672-.215 2.2.82A7.662 7.662 0 0 1 8 4.068c.68.004 1.364.092 2.003.27 1.527-1.035 2.198-.82 2.198-.82.436 1.101.162 1.915.08 2.117.512.56.822 1.273.822 2.147 0 3.073-1.87 3.75-3.653 3.947.287.247.543.735.543 1.482 0 1.069-.01 1.932-.01 2.194 0 .214.144.463.55.385A8 8 0 0 0 8 .2"
    />
  ),
};

const options = [
  {
    value: 'custom-icon',
    label: 'GitHub',
    svg: customIcon.svg,
  },
  {
    value: 'standard-icon',
    label: 'Other',
    icon: 'question-circle',
  },
];

<div>
  <ButtonSelect
    options={options}
    value={state.value}
    onChange={value => {
      console.log('New Value:', value);
      setState({ value });
    }}
  />
</div>;
```
