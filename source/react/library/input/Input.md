The input component is used for standard text and number html input elements. It is a lightly styled wrapper around core DOM elements, leaving most auxiliary functionality to the [FormField](#form) wrapper. We recommend that in most cases the FormField component be used to ensure complete design consistency, but there may be some cases in which a pure input element is desired.

Design specification: [http://styleguide.puppetlabs.net/Containers.html](http://styleguide.puppetlabs.net/Containers.html)

### Available types

```
const exampleStyle = { marginBottom: 10 };

<div>
  <Input style={exampleStyle} name="input-ex1" type="text" placeholder="Standard text input (or alternates 'email', 'url', 'search')"/>
  <Input style={exampleStyle} name="input-ex2" type="password" placeholder="Password input"/>
  <Input style={exampleStyle} name="input-ex3" type="number" placeholder="Number input"/>
  <Input style={exampleStyle} name="input-ex4" type="text" placeholder="Disabled input" disabled />
  <Input style={exampleStyle} name="input-ex5" type="multiline" placeholder="Multiline input" />
</div>
```

### Visual variations

Inputs are available in small size for those tight areas, and in a "simple" visual variant.

```
const exampleStyle = { marginBottom: 10 };

<div style={{ display: 'flex' }}>
  <div style={{ width: '50%', margin: 5 }}>
    <Input name="input-ex6" style={exampleStyle} placeholder="Standard"/>
    <Input name="input-ex7" style={exampleStyle} size="small" placeholder="Small"/>
  </div>
  <div style={{ width: '50%', margin: 5 }}>
    <Input name="input-ex8" style={exampleStyle} simple placeholder="Simple"/>
    <Input name="input-ex9" style={exampleStyle} simple size="small" placeholder="Small simple"/>
  </div>
</div>
```

### Event handling

Just as with native inputs, the Input component should typically be used as a "controlled" component.

```
<Input
  name="input-ex10"
  value={state.value}
  placeholder="This value is tracked by react state"
  onChange={value => setState({ value })}
/>
```

### Icons

Optional leading and trailing icons may be added where needed

```
const exampleStyle = { marginBottom: 10 };

<div>
  <Input name="input-ex11" style={exampleStyle} icon="search" placeholder="Search for stuff"/>
  <Input name="input-ex12" style={exampleStyle} icon="key" placeholder="Whatever this thing is, it's probably super secure!"/>
  <Input name="input-ex13" style={exampleStyle} trailingIcon="eye" placeholder="We will eventually use this for a masked input"/>
</div>
```
