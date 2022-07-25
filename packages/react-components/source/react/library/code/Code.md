## Overview

The Code component font should be used for codeblocks.

See also: [Heading](#/React%20Components/Heading), [Text](#/React%20Components/Text), and [Content](#/React%20Components/Content)

## Types

### Primary

The default styles for this component are:

- Font Family: Inconsolata
- Font weight: 400 Regular
- Size / line height: 16px / 20px

```jsx
import Text from '../text';

<>
  <Code>This is a codeblock</Code>
  <div>
    <Code>
      <strong>Code</strong>
    </Code>
    <Text as="span">
      {' '}
      defaults to rendering as a <Code>{`<code>`}</Code> tag so you can use it in
      line with a <Code>
        <strong>Text</strong>
      </Code> component.
    </Text>
  </div>
</>;
```

## Variations

### Code sizes

Most code should have a size of medium, the default, but the small code variant is also available by adding the `size` prop.

```jsx
<Code as="div"><strong>Medium:</strong> This code is the most common size.</Code>
<Code as="div" size="small"><strong>Small:</strong> Small code is used in some places.</Code>

```

### Code types

By default, code renders as inline type. Pass `type="block"` to change the styling.

```jsx
<Code type="block">{`This code is formatted as type "block"
and it can be multiple lines`}</Code>
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
