```
const nav = [
  { icon: 'gear', label: 'Settings', key: 'settings' },
  { icon: 'key', label: 'Tokens', key: 'tokens' },
  { icon: 'user', label: 'User', key: 'user' },
];

<Header
  nav={ nav }
  onNavClick={ console.log }
  product="insights"
/>
```
