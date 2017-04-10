```
initialState = { active: 'option 2'}
const toggleActive = () => {
  //TODO: Why doesn't this work?
  const next = state.active === 'option 1' ? 'option 2' : 'option 1';
  setState({ active: next });
};
<Toggle
  left="option 1"
  right="option 2"
  active={ state.active }
  onChange={ toggleActive }
/>
```
