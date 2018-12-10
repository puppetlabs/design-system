```
<Switch
  name="foo"
  label="Is this thing on yet?"
  className="test-class"
  checked={ state.checked }
  onChange={ () => { setState({ checked: !state.checked }) } }
/>
```
