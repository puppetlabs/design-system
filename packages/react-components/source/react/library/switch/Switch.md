<small class="rsg--pathline-29">Sketch symbol: puppet-ui-library / Toggle</small>

## Overview

The Switch component is a lightly styled wrapper around an html checkbox input. It leaves most auxiliary functionality to the [FormField](#form) wrapper. We recommend that in most cases the Switch is used through the FormField component be used to ensure complete design consistency, but there may be some cases in which a pure Switch element is desired.

A switch is typically made up of a label, the switch component, and an optional caption (e.g. for errors). It is used to toggle between two different sets of information or modes. Reference the Sketch Styelguide for more use cases, combinations with other form componenets, and error states (under Components / Form Components).

See also: [FormField](#/React%20Components/FormField)

## Basic Use

_Only show the "event handling" interactive state, along with the "disabled" state_

```jsx
const exampleStyle = { marginRight: 10 };

<div>
  <Switch name="switch-ex-unchecked" label="Unchecked" style={exampleStyle} />
  <Switch
    name="switch-ex-checked"
    label="Checked"
    style={exampleStyle}
    checked
  />
  <Switch
    name="switch-ex-disabled"
    label="Disabled"
    style={exampleStyle}
    checked
    disabled
  />
</div>;
```
Event Handling

```jsx
<Switch
  name="foo"
  label="Is this thing on yet?"
  className="test-class"
  checked={state.checked}
  onChange={() => {
    setState({ checked: !state.checked });
  }}
/>
```
## Related

* [FormField](#/React%20Components/FormField)
* [Input](#/React%20Components/Input)
