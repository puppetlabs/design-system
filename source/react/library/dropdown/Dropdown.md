#### Dropdown Link

```
const options = [
  { id: 1, value: 'option 1' },
  { id: 2, value: 'option 2' },
];

<Dropdown
  label="I'm a dropdown"
  hint="I'm a hint"
  options={ options }
  margin={ 5 }
/>
```

#### Dropdown Button

```
const label="Do you know what time it is?";
const hint="It's burger time";
const options = [
  { id: 1, value: "Buns"},
  { id: 2, value: "Pickles"},
  { id: 3, value: "Ketchup"},
  { id: 4, value: "Cheese"},
  { id: 5, value: "Put the patty"},
  { id: 6, value: "In between"},
  { id: 7, value: "It's burgers!"},
  { id: 8, value: "What? What?"},
  { id: 9, value: "Woooo!"},
];

<Dropdown
  select
  label={ label }
  size=""
  hint={ hint }
  options={ options }
/>
```

<!-- TODO there are currently no size variations  -->
<!-- Tiny dropdown -->


```
const options = [
  { id: 1, value: 'option 1' },
  { id: 2, value: 'option 2' },
];

<Dropdown
  label="I'm a tiny dropdown"
  size="small"
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
