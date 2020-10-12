## Overview

Popovers are containers that provide additional information or context to a user. There are four direactional variants available at multiple elevations. Each contains a standard close action button.

### Popover

```jsx
import Heading from '../heading';
import Button from '../button';
<div>
  <Popover 
    onClose={() => console.log('You closed me!')}
  >
    <Heading as="h3">I'm a popover!</Heading>
  </Popover>
</div>
```

## Variations

### Side

```jsx
import Heading from '../heading';
import Button from '../button';

<div>
  <Popover 
    style={{marginBottom: '10px'}}
    side='left' 
    onClose={() => console.log('Lets do the time warp again')}
  >
    <Heading as="h3">Just a jump to the left</Heading>
  </Popover>
  <Popover 
    style={{marginBottom: '10px'}}
    side='right' 
    onClose={() => console.log('Lets do the time warp again')}
  >
    <Heading as="h3">And a step to the right</Heading>
  </Popover>
  <Popover
    style={{marginBottom: '10px'}} 
    side='top' 
    onClose={() => console.log('Lets do the time warp again')}
  >
    <Heading as="h3">With your hands on your hips</Heading>
  </Popover>
  <Popover 
    style={{marginBottom: '10px'}}
    side='bottom' 
    onClose={() => console.log('Lets do the time warp again')}
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
    style={{marginBottom: '10px'}}
    elevation={50} 
    onClose={() => console.log('theoretically at least')}
  >
    <Heading as="h3">Elevation 50</Heading>
  </Popover>
  <Popover 
    style={{marginBottom: '10px'}}
    elevation={100} 
    onClose={() => console.log('theoretically at least')}
  >
    <Heading as="h3">Elevation 100</Heading>
  </Popover>
  <Popover 
    style={{marginBottom: '10px'}}
    elevation={150} 
    onClose={() => console.log('theoretically at least')}
  >
    <Heading as="h3">Elevation 150</Heading>
  </Popover>
</div>;
```

