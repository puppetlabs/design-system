```
const splitButtonOptions = [
  { value: 'I\'m a test value!', id: 0 },
  { value: 'Me too!', id: 1 },
  { value: 'Me three...', id: 2 },
];
<SplitButton
  options={ splitButtonOptions }
  label="Split Button"
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
  label="Processing"
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
  label="Success"
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
  label="Error"
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
  label="Small Split Button"
/>
```
