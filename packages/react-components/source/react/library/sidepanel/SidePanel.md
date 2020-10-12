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
## Variations

### Alternative Button Icon

Using the `closeButtonIcon` prop you can customize what `Icon` gets displayed for the close button. This will take any icon name listed in [Icon](http://localhost:6060/#/React%20Components/Icon)

```jsx
import Text from '../text';

<div className="sidebar-container">
  <SidePanel
    border
    title="My SidePanel"
    type="toolbar"
    closeButtonIcon="double-right"
    closeButtonProps={{ onClick: () => console.log('Clicked close button') }}
  >
    <Text>Close me up!</Text>
  </SidePanel>
</div>;
```

### Static SidePanel
An example of how you might use the `hideCloseButton` prop to have the `SidePanel` as a static component on a page.

```jsx
import Text from '../text';
import Icon from '../icon';
import Heading from '../heading';

const TitleNode = () => (
  <div>
    <Icon
      type="info-circle"
      role="img"
      size="medium"
      style={{ paddingRight: '8px' }}
    />
    Guidance and Information
  </div>
);

<div className="sidebar-container">
  <SidePanel
    border
    title={<TitleNode/>}
    type="toolbar"
    hideCloseButton="true"
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
