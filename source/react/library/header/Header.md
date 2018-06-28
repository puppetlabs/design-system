```
const nav = [
  { key: 'settings', label: 'Settings', icon: 'gear' },
  { key: 'tokens', label: 'Tokens', icon: 'key'},
];

const profile = {
  img: 'http://www.gravatar.com/avatar/3eb56a28de0c4ba1494c7da4a60bb2d0',
  label: 'Account settings',
  icon: 'user'
};

<Header
  nav={ nav }
  profile={ profile }
  onNavClick={ console.log }
  product="insights"
/>
```
