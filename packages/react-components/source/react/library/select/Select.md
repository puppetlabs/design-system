## Overview

The Select component is a form element allowing for selection of a value or set of values from a set of options.

### State and interaction

`Select` components provide built in support for hover, active, and focused interactions. All `Select` components also provide disabled states as needed.

## Basic use

Options are specified by entries in an `options` array prop, each of which requires a unique `value` and a friendly `label` to display to users.

```jsx
const [value, setValue] = React.useState('');

const options = [
  { value: 'af', label: 'Afrikaans' },
  { value: 'sq', label: 'Albanian' },
  { value: 'ar', label: 'Arabic' },
  { value: 'eu', label: 'Basque' },
  { value: 'bn', label: 'Bengali' },
  { value: 'bs', label: 'Bosnian' },
  { value: 'bg', label: 'Bulgarian' },
  { value: 'ca', label: 'Catalan' },
];

<Select
  name="select-example"
  placeholder="Select your language"
  options={options}
  value={value}
  onChange={newValue => setValue(newValue)}
/>
```

### Nonexistent value

Note that if the `value` you pass is not present in the list of `options`, the value isn't cleared but the Select will only show the placeholder, so extra handling may need to be done in that case depending on the application.

```jsx
import Alert from '../alert';

const [value, setValue] = React.useState('eo');
const options = [
  { value: 'af', label: 'Afrikaans' },
  { value: 'sq', label: 'Albanian' },
  { value: 'ar', label: 'Arabic' },
  { value: 'eu', label: 'Basque' },
  { value: 'bn', label: 'Bengali' },
  { value: 'bs', label: 'Bosnian' },
  { value: 'bg', label: 'Bulgarian' },
  { value: 'ca', label: 'Catalan' },
];
const isValueInOptions = options.map(option => option.value).includes(value);

<>
  <Select
    name="select-example"
    placeholder="Select your language"
    options={options}
    value={value}
    onChange={newValue => setValue(newValue)}
  />
  {!isValueInOptions && <Alert type="warning" style={{ marginTop: 10 }}>"{value}" is not an option</Alert>}
</>
```

## Variations

### Autocomplete

With `type` set to `autocomplete`, the `Select` input will accept text and provide filtered menu options accordingly. Full keyboard navigation of the menu options is retained.

```jsx
const options = [
  { value: 'apple', label: 'apple' },
  { value: 'orange', label: 'orange' },
  { value: 'pear', label: 'pear' },
  { value: 'banana', label: 'banana' },
  { value: 'kiwi', label: 'kiwi' },
  { value: 'watermelon', label: 'watermelon' },
  { value: 'pineapple', label: 'pineapple' },
  { value: 'strawberry', label: 'strawberry' },
  { value: 'raspberry', label: 'raspberry' },
];

const style = { margin: 10 };

<div>
  <Select
    name="autocomplete-example"
    options={options}
    placeholder="Select your fruit"
    style={style}
    value={state.value1}
    onChange={value1 => {
      console.log('New Value:', value1);
      setState({ value1 });
    }}
    onBlur={() => {
      console.log('onBlur');
    }}
    type="autocomplete"
  />
</div>;
```

### Option groups

To render an option group, provide an array of child options as the value for a regular option. Parent options should
still have labels, and if a parent is disabled, all its child options will be disabled, too.

```jsx
const optionsWithGroups = [{
  label: "Spices",
  value: [
    {label: "Cinnamon", value: "cinnamon"},
    {label: "Coriander", value: "coriander"},
    {label: "Cumin", value: "cumin"},
  ]
}, {
  label: "Oil",
  value: "oil"
}, {
  label: "Vinegar",
  value: "vinegar"
}, {
  label: "Herbs",
  disabled: true,
  value: [
    {label: "Parsley", value: "parsley"},
    {label: "Sage", value: "sage"},
    {label: "Rosemary", value: "rosemary"},
  ]
}];

<Select
  name="select-option-group-example"
  options={optionsWithGroups}
  value={state.value}
  onChange={value => {
    setState({value});
  }}
/>;
```

### MultiSelect

With `type` set to `multiselect`, the `Select` input will allow multiple values to be selected. In this mode, an "Apply" button will render below the options list. The newly selected values are not applied until the user activates this button. If the options chosen exceed the side of the input, the excess content will be replaced with an ellipsis. If the user presses escape, clicks the "Cancel" button, or clicks out of the open menu, their changes will be discarded.

```jsx
initialState = {
  value: [],
};

const options = [
  { value: 'en', label: 'English' },
  { value: 'ru', label: 'русский' },
  { value: 'zh', label: '中文' },
  { value: 'sq', label: 'Albanian' },
  { value: 'ar', label: 'Arabic' },
  { value: 'eu', label: 'Basque' },
  { value: 'bn', label: 'Bengali' },
  { value: 'bs', label: 'Bosnian' },
  { value: 'bg', label: 'Bulgarian' },
  { value: 'ca', label: 'Catalan' },
];

const style = { margin: 10 };

<div>
  <Select
    name="multi-select-example"
    options={options}
    placeholder="Select your language"
    style={style}
    value={state.value}
    onChange={value => {
      console.log('New Value', value);
      setState({ value });
    }}
    type="multiselect"
  />
</div>;
```

### Multiple selections, applied immediately

Warning: Consult with your UX designer prior to using this option. We are considering deprecating this behavior in order to simplify multi-select menus.

The default multi-select behavior can be overridden with the `applyImmediately` prop. In this mode, a "Done" button will still render for consistency but the values will be immediately applied.

```jsx
initialState = {
  value: [],
};

const options = [
  { value: 'en', label: 'English' },
  { value: 'ru', label: 'русский' },
  { value: 'zh', label: '中文' },
  { value: 'sq', label: 'Albanian' },
  { value: 'ar', label: 'Arabic' },
  { value: 'eu', label: 'Basque' },
  { value: 'bn', label: 'Bengali' },
  { value: 'bs', label: 'Bosnian' },
  { value: 'bg', label: 'Bulgarian' },
  { value: 'ca', label: 'Catalan' },
];

const style = { margin: 10 };

<div>
  <Select
    name="multi-select-immediate-example"
    options={options}
    placeholder="Select your language"
    style={style}
    value={state.value}
    onChange={value => {
      console.log('New Value', value);
      setState({ value });
    }}
    type="multiselect"
    applyImmediately
  />
</div>;
```

## Option properties
### Disabled options

Use the `disabled` object property to disable a row in a dropdown.

```jsx
const options = [
  { value: 'en', label: 'English' },
  { value: 'ru', label: 'русский' },
  { value: 'zh', label: '中文' },
  { value: 'sq', label: 'Albanian' },
  { value: 'ar', label: 'Arabic' },
  { value: 'eu', label: 'Basque', disabled: true },
  { value: 'bn', label: 'Bengali', disabled: true },
  { value: 'bs', label: 'Bosnian', disabled: true },
  { value: 'bg', label: 'Bulgarian', disabled: true },
  { value: 'ca', label: 'Catalan', disabled: true },
];

const style = { margin: 10 };

<div>
  <Select
    name="disabled-select-example"
    options={options}
    placeholder="Select your language"
    style={style}
    value={state.value1}
    onChange={value1 => {
      console.log('New Value:', value1);
      setState({ value1 });
    }}
  />
</div>;
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
  <Select
    name="select-icon-example"
    options={options}
    value={state.value}
    placeholder="Select a source control"
    onChange={value => {
      console.log('New Value:', value);
      setState({ value });
    }}
  />
</div>;
```

## Related

- [Form](#/React%20Components/Form)
- [Form.Field](#/React%20Components/FormField)
- [ButtonSelect](#/React%20Components/ButtonSelect)
