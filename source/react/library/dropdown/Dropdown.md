#### Dropdown Link

```
const options = [
  { id: 1, value: 'Edit', icon: "pencil" },
  { id: 2, value: 'Export', icon: "pdf"  },
  { id: 3, value: 'Delete', icon: "trash"  },
];

<Dropdown
  label="I'm a dropdown"
  options={ options }
  margin={ 5 }
  inheritWidth
/>
```

#### Dropdown Button

```
const label="Do you know what time it is?";
const title="It's burger time";
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
  secondary
  label={ label }
  inheritWidth
  title={ title }
  options={ options }
/>
```

#### Sizes

```
const options = [
  { id: 1, value: 'option 1' },
  { id: 2, value: 'option 2' },
];

<Dropdown
  label="I'm a tiny dropdown"
  size="tiny"
  options={ options }
  secondary
/>
```

```
const options = [
  { id: 1, value: 'option 1' },
  { id: 2, value: 'option 2' },
];

<Dropdown
  label="I'm a small dropdown"
  size="small"
  options={ options }
  secondary
/>
```

```
const options = [
  { id: 1, value: 'option 1' },
  { id: 2, value: 'option 2' },
];

<Dropdown
  label="I'm an auto dropdown"
  size="auto"
  options={ options }
  secondary
/>
```

```
const options = [
  { id: 1, value: 'option 1' },
  { id: 2, value: 'option 2' },
];

<Dropdown
  label="I'm a large dropdown"
  size="large"
  options={ options }
  secondary
/>
```

#### Multiple dropdown

```
const options = [
  { id: 1, value: 'This is the first option' },
  { id: 2, value: 'This option is the second' },
];

<Dropdown
  multiple
  label="I'm a multi-dropdown"
  selected={ [1] }
  options={ options }
/>
```

#### Dropdown with header

```
const options = [
  { id: 1, value: 'option 1' },
  { id: 2, value: 'option 2' },
];

<Dropdown
  label="I have a header in my menu"
  selected={ [1] }
  options={ options }
  title="Title Example"
/>
```

#### Dropdown with icons

```
const options = [
  { id: 1, value: 'Edit', icon: "pencil" },
  { id: 2, value: 'Export', icon: "pdf" },
  { id: 3, value: 'Delete', icon: "trash" },
];

<Dropdown
  label="I'm a dropdown with icons"
  selected={ [1] }
  options={ options }
/>
```

#### Dropdown with inherited width

By default Dropdowns are the width of their widest content.
When set to `inheritWidth` the menu is as wide as its target button.

```
const options = [
  { id: 1, value: 'same width' },
  { id: 2, value: 'as button' },
];

<Dropdown
  label="The dropdown menu will inherit my width"
  inheritWidth
  hint="Aren't I cool"
  options={ options }
/>
```
