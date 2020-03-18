## Overview



```jsx

const onRemoveTag = (filter, value) =>{
    console.log('A tag was picked', filter)
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

<TagBuilder
filters={filters}
onRemoveTag={onRemovePill}
onRemoveAll={onRemoveAll}
/>
```