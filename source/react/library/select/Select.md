```
const options = [
  'Option 1',
  'Option 2',
  'Option 3',
];

<Select
  onSelect={(selected, modifiedOption) => console.log(selected, modifiedOption)}
  options={ options }
  placeholder="Select one..."
/>
```

Select with selected prop as a string

```
const options = [
  'Option 1',
  'Option 2',
  'Option 3',
];

<Select
  onSelect={(selected, modifiedOption) => console.log(selected, modifiedOption)}
  options={ options }
  placeholder="Select one..."
  selected="Option 1"
/>
```


Small Select

```
const options = [
  'Star Wars: Episode I  The Phantom Menace Star Wars: Episode III  Revenge of the SithStar Wars: Episode III  Revenge of the SithStar Wars: Episode III  Revenge of the Sith',
  'Star Wars: Episode II  Attack of the Clones Star Wars: Episode III  Revenge of the Sith',
  'Star Wars: Episode III  Revenge of the Sith',
];

<Select
  onSelect={(selected, modifiedOption) => console.log(selected, modifiedOption)}
  options={ options }
  placeholder="Select one..."
  size="small"
/>
```

Multiselect:

```
const options = [
  'Option 1',
  'Option 2',
  'Option 3',
];

<Select
  multiple
  options={ options }
/>
```

Multiselect with selected options

```
const options = [
  'Option 1',
  'Option 2',
  'Option 3',
];

<Select
  multiple
  onSelect={(selected, modifiedOption) => console.log(selected, modifiedOption)}
  options={ options }
  placeholder="Select one..."
  selected={ [
    'Option 1',
    'Option 2',
  ] }
/>
```

Small Multiselect:

```
const options = [
  { value: 'Select is a stateful component but allows the user to modify the state by passing an updated options prop, or listen to changes to the state by passing a callback to the onSelect prop.', label: 'Select is a stateful component but allows the user to modify the state by passing an updated options prop, or listen to changes to the state by passing a callback to the onSelect prop.', selected: true },
  { value: 'Sig', label: 'Sig', selected: true },
  { value: 'Colby', label: 'Colby' },
];

<Select
  onSelect={(selected, modifiedOption) => console.log(selected, modifiedOption)}
  multiple
  size="small"
  options={ options }
/>

```

Select with `autoOpen` enabled:

```
const options = [
  { value: 'Geoff', label: 'Geoff' },
  { value: 'Colby', label: 'Colby', selected: true },
  { value: 'Michael', label: 'Sig' },
];

<Select
  onSelect={(selected, modifiedOption) => console.log(selected, modifiedOption)}
  autoOpen
  options={ options }
/>
```

Clearable Select:

```
const options = [
  { value: 'Coffee', label: 'Coffee', selected: true },
  { value: 'Tea', label: 'Tea' },
];

<Select options={ options } clearable />
```

Select with custom actions:

```
const onSelect = (selected, modifiedOption) => {
  console.log(selected, modifiedOption);
}

const onNewOption = () => {
  alert('Adding a new drink');
}

const options = [
  { value: 'Coffee', label: 'Coffee' },
  { value: 'Tea', label: 'Tea' },
];

<Select options={ options } onSelect={ onSelect } onNewOption={ onNewOption } newOptionLabel="Add a New Drink" />
```

Large `<Select/>` with custom actions:

```
const onSelect = (selected, modifiedOption) => {
  console.log(selected, modifiedOption);
}

const onNewOption = () => {
  alert('Adding a new drink');
}

const options = [
  { value: 'Coffee', label: 'Coffee' },
  { value: 'Tea', label: 'Tea' },
  { value: 'Gatorade', label: 'Gatorade' },
  { value: 'Apple Juice', label: 'Apple Juice' },
  { value: 'Cranberry Juice', label: 'Cranberry Juice' },
  { value: 'Banana Juice', label: 'Banana Juice' },
  { value: "Bone Hurtin' Juice", label: "Bone Hurtin' Juice" },
  { value: 'Blue Cheese Juice', label: 'Blue Cheese Juice' },
  { value: 'Beer', label: 'Beer' },
  { value: 'Wine', label: 'Wine' },
  { value: 'Vodka', label: 'Vodka' },
  { value: 'Whiskey', label: 'Whiskey' },
  { value: 'Crappy Tequila', label: 'Crappy Tequila' },
  { value: 'Fine Tequila', label: 'Fine Tequila' },
  { value: 'Great Tequila', label: 'Great Tequila' },
  { value: 'Great Tequila with Rocks', label: 'Great Tequila with Rocks' },
  { value: 'Great Tequila with Water', label: 'Great Tequila with Water' },
  { value: 'Great Tequila with Actual Rocks', label: 'Great Tequila with Actual Rocks' },
];

<Select options={ options } onSelect={ onSelect } onNewOption={ onNewOption } newOptionLabel="Add a New Drink" />
```

Disabled Select:

```
<Select disabled />
```

Select with no portal:

```
const options = [
  'Geoff',
  'Colby',
  'Sig',
];

<Select
  onSelect={(selected, modifiedOption) => console.log(selected, modifiedOption)}
  disablePortal
  options={ options }
  placeholder="Select one..."
/>
```

Tiny Select

```
const options = [
  { value: 'Geoff', label: 'Geoff' },
  { value: 'Colby', label: 'Colby' },
  { value: 'Michael', label: 'Sig', selected: true },
];

<Select
  onSelect={(selected, modifiedOption) => console.log(selected, modifiedOption)}
  size="tiny"
  options={ options }
/>
```
