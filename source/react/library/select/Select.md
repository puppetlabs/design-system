### Basic Select

```
const options = [
  'Option 1',
  'Option 2',
  'Option 3',
];

<Select
  onChange={(selected, modifiedOption) => console.log(selected, modifiedOption)}
  options={ options }
  placeholder="Select one..."
/>
```

#### Selected prop as a string

```
const options = [
  'Option 1',
  'Option 2',
  'Option 3',
];

<Select
  onChange={(selected, modifiedOption) => console.log(selected, modifiedOption)}
  options={ options }
  placeholder="Select one..."
  value="Option 1"
/>
```

---

### Sizes

#### Default Size

```
const options = [
  'Star Wars: Episode I  The Phantom Menace Star Wars: Episode III  Revenge of the SithStar Wars: Episode III  Revenge of the SithStar Wars: Episode III  Revenge of the Sith',
  'Star Wars: Episode II  Attack of the Clones Star Wars: Episode III  Revenge of the Sith',
  'Star Wars: Episode III  Revenge of the Sith',
];

<Select
  onChange={(selected, modifiedOption) => console.log(selected, modifiedOption)}
  options={ options }
  placeholder="Select one..."
/>
```

#### Small

```
const options = [
  'Star Wars: Episode I  The Phantom Menace Star Wars: Episode III  Revenge of the SithStar Wars: Episode III  Revenge of the SithStar Wars: Episode III  Revenge of the Sith',
  'Star Wars: Episode II  Attack of the Clones Star Wars: Episode III  Revenge of the Sith',
  'Star Wars: Episode III  Revenge of the Sith',
];

<Select
  onChange={(selected, modifiedOption) => console.log(selected, modifiedOption)}
  options={ options }
  placeholder="Select one..."
  size="small"
/>
```

---

### Optional

#### Clearable Select

When set to clearable, all options can be removed by clicking the dismiss icon.

```
const options = [
  { value: 'Coffee', label: 'Coffee', selected: true },
  { value: 'Tea', label: 'Tea' },
];

<Select options={ options } clearable />
```

#### Custom Actions

```
const onChange = (selected, modifiedOption) => {
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
  { value: 'Great Tequila with Actual Rocks', label: 'Great Tequila with Actual Rocks' }
];

<Select options={ options } onChange={ onChange } newOption onNewOption={ onNewOption } newOptionLabel="Add a New Drink" />
```

---

### States

#### Disabled

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
  onChange={(selected, modifiedOption) => console.log(selected, modifiedOption)}
  disablePortal
  options={ options }
  placeholder="Select one..."
/>
```

---

## Multiselect

Multiselects allow the user to select multiple options at once.

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

#### Multiselect with pre-selected options

```
const options = [
  'Option 1',
  'Option 2',
  'Option 3',
];

<Select
  multiple
  onChange={(selected, modifiedOption) => console.log(selected, modifiedOption)}
  options={ options }
  placeholder="Select one..."
  value={ [
    'Option 1',
    'Option 2',
  ] }
/>
```

#### Small Multiselect

```
const options = [
  { value: 'Select is a stateful component but allows the user to modify the state by passing an updated options prop, or listen to changes to the state by passing a callback to the onChange prop.', label: 'Select is a stateful component but allows the user to modify the state by passing an updated options prop, or listen to changes to the state by passing a callback to the onChange prop.', selected: true },
  { value: 'Sig', label: 'Sig', selected: true },
  { value: 'Colby', label: 'Colby' },
];

<Select
  onChange={(selected, modifiedOption) => console.log(selected, modifiedOption)}
  multiple
  size="small"
  options={ options }
/>
```

#### autoOpen Enabled

_SIG - Temporarily removed to prevent autoscroll_

```
const options = [
  { value: 'Geoff', label: 'Geoff' },
  { value: 'Colby', label: 'Colby', selected: true },
  { value: 'Michael', label: 'Sig' },
];

<Select
  onChange={(selected, modifiedOption) => console.log(selected, modifiedOption)}

  options={ options }
/>
```
