## Overview

The `Input` component is used for standard text and number HTML input elements. It is a lightly styled wrapper around core DOM elements, leaving most auxiliary functionality to the [`Form.Field`](#/React%20Components/FormField) wrapper. We recommend that in most cases the `Form.Field` component be used to ensure complete design consistency, but there may be some cases in which a pure input element is desired.

### States and interaction

Inputs provide built in support for hover, active, and focused interactions. All inputs also provide disabled states as needed.

## Basic Use

Just as with native inputs, the `Input` component should typically be used as a "controlled" component.

Note that for input labels, use the `Input` component within a [`Form.Field`](#/React%20Components/FormField) wrapper.

```jsx
const exampleStyle = { marginBottom: 10 };

<form>
  <Input
    name="input-ex1"
    type="text"
    value={state['input-ex1-value']}
    placeholder="Standard text input (or alternates 'email', 'url', 'search')"
    style={exampleStyle}
    onChange={value => setState({ 'input-ex1-value': value })}
  />
  <Input
    name="input-ex2"
    type="password"
    value={state['input-ex2-value']}
    placeholder="Password input"
    style={exampleStyle}
    onChange={value => setState({ 'input-ex2-value': value })}
  />
  <Input
    name="input-ex3"
    type="number"
    value={state['input-ex3-value']}
    placeholder="Number input"
    style={exampleStyle}
    onChange={value => setState({ 'input-ex3-value': value })}
  />
  <Input
    name="input-ex4"
    type="text"
    value={state['input-ex4-value']}
    placeholder="Disabled input"
    style={exampleStyle}
    onChange={value => setState({ 'input-ex4-value': value })}
    disabled
  />
  <Input
    name="input-ex5"
    type="multiline"
    value={state['input-ex5-value']}
    placeholder="Multiline input"
    style={exampleStyle}
    onChange={value => setState({ 'input-ex5-value': value })}
  />
</form>;
```

## Variations

### Simple

Inputs are available in a "simple" visual variant, primarily used for in-site search boxes. These fields should not be used without a leading icon for findability.

```jsx
<Input
  name="input-ex6"
  value={state.value}
  placeholder="Search"
  icon="search"
  simple
  onChange={value => setState({ value })}
/>
```

### Inputs with icons

#### Leading icon

Optional leading icons may be added where needed to provide more immediate context. These icons are not interactive.

```jsx
const exampleStyle = { marginBottom: 10 };

<div>
  <Input
    name="input-ex11"
    value={state['input-ex11-value']}
    icon="search"
    placeholder="Search for stuff"
    style={exampleStyle}
    onChange={value => setState({ 'input-ex11-value': value })}
  />
  <Input
    name="input-ex12"
    value={state['input-ex12-value']}
    icon="key"
    placeholder="Whatever this thing is, it's probably super secure!"
    style={exampleStyle}
    onChange={value => setState({ 'input-ex12-value': value })}
  />
</div>;
```

#### Trailing icon

Optional trailing icons are meant to be interactive and used to manipulate the content of an input, for example a show/hide password control. (Note: This example is not currently set up to be interactive.)

```jsx
const exampleStyle = { marginBottom: 10 };

<div>
  <Input
    name="input-ex13"
    value={state['input-ex13-value']}
    trailingIcon="eye"
    placeholder="We will eventually use this for a masked input"
    style={exampleStyle}
    onChange={value => setState({ 'input-ex13-value': value })}
  />
</div>;
```

## Related

- [Form](#/React%20Components/Form)
- [Form.Field](#/React%20Components/FormField)
