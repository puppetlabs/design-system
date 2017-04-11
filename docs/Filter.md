```
const operators = [
  { symbol: '=', label: 'Equals' },
  { symbol: '!=', label: 'Doesn\'t equal' },
  { symbol: 'null', label: 'Is null', noValue: true },
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

The `null` operator needs no value:

```
const operators = [
  { symbol: '=', label: 'Equals' },
  { symbol: '!=', label: 'Doesn\'t equal' },
  { symbol: 'null', label: 'Is null', noValue: true },
];

const fields = [
  { value: 'Field 1', label: 'Field 2' },
  { value: 'Field 2', label: 'Field 2' },
];

const filter = { field: 'Field 1', op: 'null' };

<Filter
  onDelete={ () => { console.log('filter deleted'); } }
  fields={ fields }
  filter={ filter }
  operators={ operators }
/>
```
