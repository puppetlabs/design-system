## Overview

`SidePanel` is a component that takes up the full height of its container
and is intended to be docked to the right side.

## Basic use

```jsx
import Text from '../text';

<div className="sidebar-container">
  <SidePanel
    border
    title="My SidePanel"
    type="toolbar"
    closeButtonProps={{ onClick: () => console.log('Clicked close button') }}
  >
    <Text>Hello world!</Text>
  </SidePanel>
</div>;
```

## Related

- [Columns](#/React%20Layouts/Columns)
- [Sidebar](#/React%20Components/Sidebar)
- [Tabs](#/React%20Components/Tabs)
- [Toolbar](#/React%20Components/Toolbar)
