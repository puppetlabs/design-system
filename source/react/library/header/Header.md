```
const nav = [
  { key: 'settings', label: 'Settings', icon: 'gear' },
  { key: 'tokens', label: 'Tokens', icon: 'key'},
];

const profile = {
  email: 'colby.aley@puppet.com',
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
