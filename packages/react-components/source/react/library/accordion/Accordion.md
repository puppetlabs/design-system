## Overview

The accordion component is used to store as much content as possible into as small of space as possible. It does this by allowing high level content to be visible and lower level content to be hidden in a expanding content panel. This makes content processing and discover easier, allowing users to pick what they read.

```jsx
// import { Heading } from '../heading';

const header =
  //<Heading as="h3" color="subtle">
  'header';
  //   </Heading>

return (
  <Accordion headerContent={header}>
    <div>This is the body content</div>
  </Accordion>
);
```
