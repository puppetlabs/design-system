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

---

### States

#### Disabled

```
<Select disabled />
```

#### Loading

```
<Select loading />
```

#### Select with no portal

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
  type="multiselect"
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
  type="multiselect"
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
  type="multiselect"
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
