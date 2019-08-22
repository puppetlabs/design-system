The Select component is a form element allowing for selection of a value from a set of options.

### Basic use

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

### Autocomplete

With type `autocomplete`, the Select input will accept text and provide filtered menu options accordingly. Full keyboard navigation of the menu options is retained.

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
    type="autocomplete"
  />
</div>;
```
