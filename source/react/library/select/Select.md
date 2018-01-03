```
const options = [
  'Geoff',
  'Colby',
  'Sig',
];

<Select
  onSelect={o => console.log(o)}
  options={ options }
  placeholder="Select one..."
/>
```

Multiselect:

```
const options = [
  'Sunday',
  'Monday',
  'Tuesday',
];

<Select
  multiple
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
  onSelect={o => console.log(o)}
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
const onSelect = (option) => {
  console.log(option);
  if (option.value === 'new') {
    alert('Adding a new drink');
  }
}

const options = [
  { value: 'Coffee', label: 'Coffee' },
  { value: 'Tea', label: 'Tea' },
  { value: 'new', label: 'Add a new drink', selectable: false, className: 'action-button' }
];

<Select options={ options } onSelect={ onSelect } />
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
  onSelect={o => console.log(o)}
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
  onSelect={o => console.log(o)}
  size="tiny"
  options={ options }
/>
```
