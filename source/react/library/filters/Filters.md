```
let filters = [
  { field: 'Name', op: '=', value: 'Steve' },
  { field: 'Day of week', any: ['mon', 'tue'] }
];

<Filters
  filters={ filters }
  onChange={ (newFilters) => console.log('new filters', newFilters) }
/>
```
