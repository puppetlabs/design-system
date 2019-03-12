### Basic Select

```
const options = [
  'Option 1',
  'Option 2',
  'Option 3',
];

<Select
  name="basic"
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
  name="selected"
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

<Select name="clearable" options={ options } clearable />
```

---

### States

#### Disabled

```
<Select name="disabled" disabled />
```

#### Loading

```
<Select name="loading" loading />
```

#### Select with no portal

```
const options = [
  'Geoff',
  'Colby',
  'Sig',
];

<Select
  name="no-portal"
  onChange={(selected, modifiedOption) => console.log(selected, modifiedOption)}
  disablePortal
  options={ options }
  placeholder="Select one..."
/>
```

#### autoOpen enabled

_Note: Add `autoOpen` prop to see example (because it was removed to avoid autoscroll in docs)._

```
const options = [
  { value: 'Geoff', label: 'Geoff' },
  { value: 'Colby', label: 'Colby', selected: true },
  { value: 'Michael', label: 'Sig' },
];

<Select
  name="select-auto-open"
  /* autoOpen */
  onChange={(selected, modifiedOption) => console.log(selected, modifiedOption)}
  options={ options }
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
  name="multiselect"
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
  name="multiselect-options"
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
