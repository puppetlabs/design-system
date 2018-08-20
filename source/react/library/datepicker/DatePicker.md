```
const dates = {
  primary: {
    start: '2017-01-01',
    end: '2017-01-30',
  },
};

<DatePicker dates={ dates } onChange={ (dates) => { console.log(dates) }} />
```

DatePicker with ranges

```
const dates = {
  primary: {
    start: '2017-01-01',
    end: '2017-01-30',
  },
};

const ranges = [
  { count: 1, unit: 'week' },
  { count: 1, unit: 'month' },
  { count: 1, unit: 'year' }
];

<DatePicker
  dates={ dates }
  ranges={ ranges }
  onChange={ (dates) => { console.log(dates) }}
/>
```

DatePicker with message

```
<DatePicker message="This is not configured properly" />
```
