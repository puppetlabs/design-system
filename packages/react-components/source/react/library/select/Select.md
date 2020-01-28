## Overview

The Select component is a form element allowing for selection of a value or set of values from a set of options.

### State and interaction

`Select` components provide built in support for hover, active, and focused interactions. All `Select` components also provide disabled states as needed.

## Basic use

Options are specified by entries in an `options` array prop. Each requires a unique value and a friendly label to display to users.

```jsx
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
    id="button-select-one"
    name="select-example"
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
    id="button-select-one"
    name="select-example-one"
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

### MultiSelect

With `type` set to `multiselect`, the `Select` input will allow multiple values to be selected. In this mode an "Apply" button will render below the options list. The newly selected values are not applied until the user activates this button. If the options chosen exceed the side of the input the excess content will be replaced with an ellipsis. If they escape, click the Cancel button, or click out of the open menu, their changes will be discarded.

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
    id="button-select-one"
    name="select-example-one"
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
    id="button-select-one"
    name="select-example-one"
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

## Related

- [Form](#/React%20Components/Form)
- [FormField](#/React%20Components/FormField)
- [ButtonSelect](#/React%20Components/ButtonSelect)
