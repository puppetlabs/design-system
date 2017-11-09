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
  { value: 'Geoff' },
  { value: 'Colby' },
  { value: 'Sig', selected: true },
];

<Select
  onSelect={o => console.log(o)}
  autoOpen
  options={ options }
/>
```
