```
const operators = [
  { symbol: '=', label: 'Equals' },
  { symbol: '!=', label: 'Doesn\'t equal' },
];

const fields = [
  { value: 'Field 1', label: 'Field 2' },
  { value: 'Field 2', label: 'Field 2' },
];

<Filter
  onDelete={ () => { console.log('filter deleted'); } }
  fields={ fields }
  operators={ operators }
/>
```
