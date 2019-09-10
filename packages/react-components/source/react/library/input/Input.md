The input component is used for standard text and number html input elements. It is a lightly styled wrapper around core DOM elements, leaving most auxiliary functionality to the [FormField](#form) wrapper. We recommend that in most cases the FormField component be used to ensure complete design consistency, but there may be some cases in which a pure input element is desired.

### Available types

```jsx
const exampleStyle = { marginBottom: 10 };

<form>
  <Input
    style={exampleStyle}
    name="input-ex1"
    autoComplete="input-ex1"
    type="text"
    placeholder="Standard text input (or alternates 'email', 'url', 'search')"
  />
  <Input
    style={exampleStyle}
    name="input-ex2"
    autoComplete="input-ex2"
    type="password"
    placeholder="Password input"
  />
  <Input
    style={exampleStyle}
    name="input-ex3"
    autoComplete="input-ex3"
    type="number"
    placeholder="Number input"
  />
  <Input
    style={exampleStyle}
    name="input-ex4"
    autoComplete="input-ex4"
    type="text"
    placeholder="Disabled input"
    disabled
  />
  <Input
    style={exampleStyle}
    name="input-ex5"
    autoComplete="input-ex5"
    type="multiline"
    placeholder="Multiline input"
  />
</form>;
```

### Simple visual variant

Inputs are available in a "simple" visual variant, primarily used for in-site search boxes

```jsx
<Input name="input-ex6" simple icon="search" placeholder="Search" />
```

### Event handling

Just as with native inputs, the Input component should typically be used as a "controlled" component.

```jsx
<Input
  name="input-ex10"
  value={state.value}
  placeholder="This value is tracked by react state"
  onChange={value => setState({ value })}
/>
```

### Icons

Optional leading and trailing icons may be added where needed

```jsx
const exampleStyle = { marginBottom: 10 };

<div>
  <Input
    name="input-ex11"
    style={exampleStyle}
    icon="search"
    placeholder="Search for stuff"
  />
  <Input
    name="input-ex12"
    style={exampleStyle}
    icon="key"
    placeholder="Whatever this thing is, it's probably super secure!"
  />
  <Input
    name="input-ex13"
    style={exampleStyle}
    trailingIcon="eye"
    placeholder="We will eventually use this for a masked input"
  />
</div>;
```
