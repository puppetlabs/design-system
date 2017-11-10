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
  { value: 'Colby', label: 'Colby' },
  { value: 'Michael', label: 'Sig', selected: true },
];

<Select
  onSelect={o => console.log(o)}
  autoOpen
  options={ options }
/>
```
