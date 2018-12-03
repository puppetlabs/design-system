The Checkbox component is a lightly styled wrapper around an html checkbox input. It leaves most auxiliary functionality to the [FormField](#form) wrapper. We recommend that in most cases the Checkbox is used through the FormField component be used to ensure complete design consistency, but there may be some cases in which a pure Checkbox element is desired.

Design specification: [http://styleguide.puppetlabs.net/Containers.html](http://styleguide.puppetlabs.net/Containers.html)

### Basic use
```
const exampleStyle = { marginRight: 10 };

<div>
  <Checkbox style={exampleStyle}/>
  <Checkbox style={exampleStyle} checked />
  <Checkbox style={exampleStyle} checked disabled />
</div>
```

### Event handling

```
<Checkbox
  checked={state.checked}
  onChange={e => setState({ checked: e.target.checked })}
/>
```
