# basic
```
const options = [
  { value: 'one', label: 'One' },
  { value: 'two', label: 'Two' },
  { value: 'three', label: 'Three' },
  { value: 'four', label: 'Four' },
  { value: 'five', label: 'Five' },
];

const initialState = { selected: null };

<OptionMenu
  id="options-menu-one"
  options={options}
  selected={state.selected}
  onChange={selected => setState({ selected })}
/>
```

# with icons
```
const options = [
  { icon: 'home', value: 'home', label: 'Home' },
  { icon: 'plus', value: 'grid', label: 'Grid' },
];

const initialState = { selected: null };

<OptionMenu
  id="options-menu-two"
  options={options}
  selected={state.selected}
  onChange={selected => setState({ selected })}
/>
```

# multiple
```
const options = [
  { value: 'one', label: 'One' },
  { value: 'two', label: 'Two' },
  { value: 'three', label: 'Three' },
  { value: 'four', label: 'Four' },
  { value: 'five', label: 'Five' },
];

const initialState = { selected: null };

<OptionMenu
  id="options-menu-three"
  type="multiple"
  options={options}
  selected={state.selected}
  onChange={selected => setState({ selected })}
/>
