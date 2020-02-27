This is the Pill Builder

```jsx

const onRemovePill = (filter, value) =>{
    console.log('A pill was picked', filter)
}
const onRemoveAll = () => {
    console.log('User Removed All Filters')
}

const filters = [
  {
    field: 'all-operating-system',
    fieldLabel: 'All Operating System',
    value: 'Windows',

  },
  {
    field: 'puppet-installed',
    fieldLabel: 'Puppet Installed',
    value: 'true'
  }
];

<PillBuilder
filters={filters}
onRemovePill={onRemovePill}
onRemoveAll={onRemoveAll}
/>
```