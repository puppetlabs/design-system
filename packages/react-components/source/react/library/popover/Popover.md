## Overview

Popovers are containers that provide additional information or context to a user. There are four direactional variants available at multiple elevations. Each contains a standard close action button.

### Popover

```jsx
import Button from '../button';
import Content from '../content';
import Heading from '../heading';
import Link from '../link';
import Text from '../text';

<div>
  <Popover onClose={() => console.log('You closed me!')}>
    <Content>
      <h3>I'm a popover!</h3>
      <p>
        I can contain more content like{' '}
        <a href="http://puppet.com" target="_blank">
          links
        </a>{' '}
        that are harder for a simple tooltip to handle.
      </p>
    </Content>
  </Popover>
</div>;
```

## Variations

### Side

```jsx
import Heading from '../heading';
import Button from '../button';

<div>
  <Popover
    side="left"
    onClose={() => console.log('Lets do the time warp again')}
    style={{ marginBottom: '20px' }}
  >
    <Heading as="h3">Just a jump to the left</Heading>
  </Popover>
  <Popover
    side="right"
    onClose={() => console.log('Lets do the time warp again')}
    style={{ marginBottom: '20px' }}
  >
    <Heading as="h3">And a step to the right</Heading>
  </Popover>
  <Popover
    side="top"
    onClose={() => console.log('Lets do the time warp again')}
    style={{ marginBottom: '20px' }}
  >
    <Heading as="h3">With your hands on your hips</Heading>
  </Popover>
  <Popover
    side="bottom"
    onClose={() => console.log('Lets do the time warp again')}
    style={{ marginBottom: '20px' }}
  >
    <Heading as="h3">You bring your knees in tight</Heading>
  </Popover>
</div>;
```

### Elevation

```jsx
import Heading from '../heading';
import Button from '../button';

<div>
  <Popover
    elevation={50}
    onClose={() => console.log('theoretically at least')}
    style={{ marginBottom: '20px' }}
  >
    <Heading as="h3">Elevation 50</Heading>
  </Popover>
  <Popover
    elevation={100}
    onClose={() => console.log('theoretically at least')}
    style={{ marginBottom: '20px' }}
  >
    <Heading as="h3">Elevation 100</Heading>
  </Popover>
  <Popover
    elevation={150}
    onClose={() => console.log('theoretically at least')}
    style={{ marginBottom: '20px' }}
  >
    <Heading as="h3">Elevation 150</Heading>
  </Popover>
</div>;
```
