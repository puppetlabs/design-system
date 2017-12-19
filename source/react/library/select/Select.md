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

Disabled Select

```
<Select disabled />
```

Select with no portal

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
