## Overview

The Copy component should be used for click-to-copy functionality. This component attempts to write a given value to the user's clipboard using `navigator.clipboard.writeText(value)`.

The value to copy may be set in the `value` prop. This `value` supercedes all following options for determining the value to copy.

If no `value` prop is set, a child React element will be checked for a `value` prop or a text node child. The `value` prop supersedes the text node in this case. A plain text node child may be provided instead of a React element, in which case the text will be used as the `value`. If none of the above are set, the component will return `null`.

See also: [Code](#/React%20Components/Code) and [FormField](#/React%20Components/FormField)

```jsx
<Copy>Important text to copy</Copy>
```

```jsx
<Copy
  writeToClipboard={value => {
    console.log(`overwritten writeToClipboard: '${value}'`);
  }}
  onCopy={value => {
    console.log(`copied: '${value}'`);
  }}
>
  Overwritten copy-to-clipboard with callback
</Copy>
```

```jsx
<Copy value="areallyreallylongstringthatyouaren'tdisplayinginfull">
  areallyreally...
</Copy>
```

```jsx
import Code from '../code';

<Code type="block">
  <Copy>mod 'puppetlabs-stdlib', '6.3.0'</Copy>
</Code>;
```

```jsx
import Form from '../form';

<Copy align="flex-end">
  <Form.Field
    type="text"
    name="label"
    labelType="primary"
    id="Trigger Workflow"
    value="/v3/events/workflow"
    label="Trigger Workflow"
  />
</Copy>;
```

## Related

- [Code](#/React%20Components/Code)
- [FormField](#/React%20Components/FormField)
