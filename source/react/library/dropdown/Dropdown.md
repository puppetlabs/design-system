#### Dropdown Link

```
const options = [
  { id: 1, value: 'Edit', icon: "pencil" },
  { id: 2, value: 'Export', icon: "export"  },
  { id: 3, value: 'Delete', icon: "trash"  },
];

<Dropdown
  label="I'm a dropdown"
  title="I'm a very long title"
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

##### Tiny dropdown

```
const options = [
  { id: 1, value: 'option 1' },
  { id: 2, value: 'option 2' },
];

<Dropdown
  label="I'm a tiny dropdown"
  size="tiny"
  title="I'm a title"
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
  title="I'm a title"
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
  title="I'm a title"
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
  title="I'm a title"
  options={ options }
  secondary
/>
```

#### Multiple dropdown

```
const options = [
  { id: 1, value: 'option 1' },
  { id: 2, value: 'option 2' },
];

<Dropdown
  multiple
  label="I'm a multi-dropdown"
  title="I'm a title"
  selected={ [1] }
  options={ options }
/>
```

#### Dropdown without header

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

#### Dropdown with icons

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

#### Dropdown with inherited width
By default Dropdowns are the width of their widest content.
When set to `inheritWidth` the menu is as wide as its target button.

```
const options = [
  { id: 1, value: 'same width' },
  { id: 2, value: 'as button' },
];

<Dropdown
  label="Same width as the options"
  inheritWidth
  hint="Aren't I cool"
  options={ options }
/>
```
