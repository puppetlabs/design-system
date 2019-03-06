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
