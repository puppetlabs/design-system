```
const options = [
  { id: 1, value: 'option 1' },
  { id: 2, value: 'option 2' },
];

<Dropdown
  label="I'm a dropdown"
  hint="I'm a hint"
  options={ options }
/>
```


Tiny dropdown
```
const options = [
  { id: 1, value: 'option 1' },
  { id: 2, value: 'option 2' },
];

<Dropdown
  label="I'm a tiny dropdown"
  size="tiny"
  hint="I'm a hint"
  options={ options }
/>
```

Multiple dropdown
```
const options = [
  { id: 1, value: 'option 1' },
  { id: 2, value: 'option 2' },
];

<Dropdown
  multiple
  label="I'm a multi-dropdown"
  hint="I'm a hint"
  selected={ [1] }
  options={ options }
/>
```
Dropdown without header
```
const options = [
  { id: 1, value: 'option 1' },
  { id: 2, value: 'option 2' },
];

<Dropdown
  label="I'm a dropdown without a header"
  selected={ [1] }
  options={ options }
/>
```

Dropdown with icons
```
const options = [
  { id: 1, value: 'Edit', icon: "pencil" },
  { id: 2, value: 'Export', icon: "export" },
  { id: 3, value: 'Delete', icon: "trash" },
];

<Dropdown
  label="I'm a dropdown with icons"
  selected={ [1] }
  options={ options }
/>
```

Dropdown with actions
```
const options = [
  { id: 1, value: 'Group 1' },
  { id: 2, value: 'Group 2' },
  { id: 3, value: 'Group 3'},
];

const actions = [{ id: 'remove_group', value: 'Remove group', icon: 'delete' }];

<Dropdown
  label="I'm a dropdown with actions"
  selected={ [1] }
  options={ options }
  actions={ actions }
  onActionClick={ (option) => { console.log(`${option.id} clicked`) } }
/>
```