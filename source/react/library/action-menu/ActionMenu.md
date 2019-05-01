```
const actions = [
  { as: 'a', href: 'https://www.google.com', target: "_blank", id: 'one', label: 'One', icon: 'home' },
  { id: 'two', label: 'Two', onClick() { console.log('two'); } },
  { id: 'three', label: 'Three', onClick() { console.log('three'); } },
  { id: 'four', label: 'Four', onClick() { console.log('four'); } },
  { id: 'five', label: 'Five', onClick() { console.log('five'); } },
];

<ActionMenu
  id="action-menu-one"
  actions={actions}
  label="Choose an Action"
/>
```
