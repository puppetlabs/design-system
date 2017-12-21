```
const splitButtonOptions = [
  { value: 'I\'m a test value!', id: 0 },
  { value: 'Me too!', id: 1 },
  { value: 'Me three...', id: 2 },
];
<SplitButton
  options={ splitButtonOptions }
  label="I'm a split button!"
/>
```

`SplitButton` with processing menu:
```
const splitButtonOptions = [
  { value: 'I\'m a test value!', id: 0 },
  { value: 'Me too!', id: 1 },
  { value: 'Me three...', id: 2 },
];
<SplitButton
  menuStatus="processing"
  options={ splitButtonOptions }
  label="processing split button!"
/>
```

`SplitButton` with success menu:
```
const splitButtonOptions = [
  { value: 'I\'m a test value!', id: 0 },
  { value: 'Me too!', id: 1 },
  { value: 'Me three...', id: 2 },
];
<SplitButton
  menuStatus="success"
  options={ splitButtonOptions }
  label="success split button!"
/>
```

`SplitButton` with error:
```
const splitButtonOptions = [
  { value: 'I\'m a test value!', id: 0 },
  { value: 'Me too!', id: 1 },
  { value: 'Me three...', id: 2 },
];
<SplitButton
  error
  options={ splitButtonOptions }
  label="split button with error"
/>
```


Small `SplitButton`:
```
const splitButtonOptions = [
  { value: 'I\'m a test value!', id: 0 },
  { value: 'Me too!', id: 1 },
  { value: 'Me three...', id: 2 },
];
<SplitButton
  size="small"
  options={ splitButtonOptions }
  label="I'm a split button!"
/>
```