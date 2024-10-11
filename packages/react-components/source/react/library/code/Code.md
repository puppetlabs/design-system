## Overview

The Code component should be used for code samples (inline and block level).

You may also use inline Code components inside the [Heading](#/React%20Components/Heading), [Text](#/React%20Components/Text), or [Content](#/React%20Components/Content) components if needed.

## Types

### Primary

The default styles for this component are:

- Font Family: Inconsolata
- Font weight: 400 Regular
- Size: 16px
- Line height: 20px for inline, 22px for block

```jsx
import Text from '../text';

<>
  <Code>This is some code</Code>
  <div>
    <Code>
      <strong>Code</strong>
    </Code>
    <Text as="span">
      {' '}
      defaults to rendering as a <Code>{`<code>`}</Code> tag so you can use it
      in line with a{' '}
      <Code>
        <strong>Text</strong>
      </Code>{' '}
      component.
    </Text>
  </div>
</>;
```

## Variations

### Code sizes

Most code should have a size of `regular` (the default), but there are other available sizes to match the various sizes of the [`Text`](/#/React%20Components/Text) component:

```jsx
<Code as="span" size="large"><strong>Large:</strong> The five boxing wizards jump quickly.</Code>
<br />
<Code as="span" size="medium"><strong>Medium:</strong> The five boxing wizards jump quickly.</Code>
<br />
<Code as="span"><strong>Regular (default):</strong> The five boxing wizards jump quickly.</Code>
<br />
<Code as="span" size="small"><strong>Small:</strong> The five boxing wizards jump quickly.</Code>
<br />
<Code as="span" size="tiny"><strong>Tiny:</strong> The five boxing wizards jump quickly.</Code>
```

### Code types

By default, code renders as `inline` type. Pass `type="block"` to render a block of code instead:

```jsx
const exampleCode = `# This code is formatted as type "block" and it can be multiple lines:

file { "/etc/passwd":
  owner => "root",
  group => "root",
  mode  => "0644",
}`;

<Code type="block">{exampleCode}</Code>;
```

### Copyable

Add a copy button to a code block with the `copyable` prop.

```jsx
<Code type="block" copyable>{`This code is formatted as type "block"
and can by copied with the copy button`}</Code>
```

## Related

- [Content](#/React%20Components/Content)
- [Heading](#/React%20Components/Heading)
- [Text](#/React%20Components/Text)
