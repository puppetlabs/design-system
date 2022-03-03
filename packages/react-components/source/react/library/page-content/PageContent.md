## Overview

`PageContent` is a simple content wrapper that automatically fades-in content on load, and hides content if the `loading` prop is set to true.

## Use

The following contrived example loads and un-loads page content continuously so you can see the sweet transition animation!

```jsx
import { Heading, Text } from '@puppet/react-components';

const [loading, setLoading] = React.useState(false);

React.useEffect(() => {
  const timeout = setTimeout(() => setLoading(!loading), 2000);

  return () => {
    clearTimeout(timeout);
  };
}, [loading]);

<PageContent
  loading={loading}
  type="secondary"
  style={{ height: 500, display: 'flex', textAlign: 'center' }}
>
  <Heading>Sample</Heading>
  <Text>Content</Text>
</PageContent>;
```
