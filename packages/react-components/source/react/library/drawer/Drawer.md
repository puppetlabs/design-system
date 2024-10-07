## Overview

The drawer component is used to store as much content as possible into as small of space as possible. It does this by allowing high level content to be visible and lower level content to be hidden in a expanding content panel. This makes content processing and discover easier, allowing users to pick what they read.

```jsx
return <Drawer />;
```

## Basic Use

The `Drawer` component has two main content areas that can be populated through the child and headerContent props. The toggle feature can also be customised using the buttonTextOpen, buttonTextClosed and buttonType props. The drawer body can be opened and closed via the open prop.

```jsx
const header = (
  <h3 as="h3" color="subtle">
    Here is where I make you aware that theres more content to see{' '}
  </h3>
);

const showMore = 'Show More Content';
const showLess = 'Show Less Content';
const buttonType = 'text';

const toggle = (state) => {
  console.log('New state returned');
  setState({ state });
};

return (
  <Drawer
    headerContent={header}
    buttonTextOpen={showLess}
    buttonTextClosed={showMore}
    buttonType={buttonType}
    open={state.value}
    onToggle={toggle}
  >
    <h4>This is the body content</h4>
    <text>
      Really long description lorem ipsum, lorem ipsumus, lorem long description
      lorem ipsum, lorem ipsumus, loremus lorem ipsum. Really long description
      lorem ipsum, lorem ipsumus, lorem long description lorem ipsum, lorem
      ipsumus, loremus lorem ipsum.
    </text>
  </Drawer>
);
```

## Related

- [SidePanel](#/React%20Components/SidePanel)
- [Columns](#/React%20Layouts/Columns)
- [Sidebar](#/React%20Components/Sidebar)
- [Tabs](#/React%20Components/Tabs)
- [Toolbar](#/React%20Components/Toolbar)
