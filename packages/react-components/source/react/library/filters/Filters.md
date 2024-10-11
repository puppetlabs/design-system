```jsx
let filters = [
  { field: 'Name', op: '=', value: 'Steve' },
  { field: 'Name', op: '!=', value: 'Ben has a cat that jumps, its cool' },
  { field: 'Day of week', any: ['mon', 'tue'] },
];

const fields = ['Name', 'Date', 'Profit'];

<Filters
  fields={fields}
  filters={filters}
  onChange={(newFilters) => console.log('new filters', newFilters)}
/>;
```

A `Filters` control that allows filters to be marked as `removable`.

This is used for letting the user dictate which filters are displayed in the filter bar, and are
hence removable by the end user.

```jsx
const filters = [{ field: 'Animal type', op: '=', value: 'Big cat' }];

const fields = ['Animal type'];

<Filters
  removableToggle
  filters={filters}
  fields={fields}
  onChange={(newFilters) => console.log('new filters', newFilters)}
/>;
```
