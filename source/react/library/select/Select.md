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
  'T',
  'Sunday',
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
];

<Select
  multiple
  options={ options }
/>
```

Small Multiselect:

```
const options = [
  { value: 'Geoff', label: 'Geoff', selected: true },
  { value: 'Sig', label: 'Sig' },
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
  if (modifiedOption.value === 'new') {
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
