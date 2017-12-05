```
let filters = [
  { field: 'Name', op: '=', value: 'Steve' },
  { field: 'Name', op: '!=', value: 'Ben has a cat that jumps, its cool' },
  { field: 'Day of week', any: ['mon', 'tue'] }
];

const fields = [
  'Name',
  'Date',
  'Profit',
];

<Filters
  fields={ fields }
  filters={ filters }
  onChange={ (newFilters) => console.log('new filters', newFilters) }
/>
```
