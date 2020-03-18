## Overview

Toolbar acts as a container for tabs and buttons that is unified and compact.

## Basic use

```jsx
import Button from '../button';

<Toolbar border>
  <Toolbar.Actions>
    <Button innerFocus type="transparent">
      Toolbar button
    </Button>
    <Button innerFocus type="transparent" icon="download" />
    <Button innerFocus type="transparent" icon="gear" />
  </Toolbar.Actions>
</Toolbar>;
```

## Toolbar with Tabs

```jsx
import Button from '../button';
import Columns from '../../../../../react-layouts/src/Columns';
import SidePanel from '../sidepanel';
import Tabs from '../tabs';
import Text from '../text';

const [open, setOpen] = React.useState(false);

<Columns>
  <Columns.Column>
    <Toolbar border>
      <Tabs>
        <Tabs.Tab icon="home" title="Tab 1">
          <Text>This is the first toolbar tab.</Text>
        </Tabs.Tab>
        <Tabs.Tab icon="rocket" title="Tab 2">
          <Text>This is the second toolbar tab.</Text>
        </Tabs.Tab>
        <Tabs.Tab icon="spaceship" title="Tab 3">
          <Text>This is the third toolbar tab.</Text>
        </Tabs.Tab>
        <Toolbar.Actions align="right">
          <Button innerFocus type="transparent" onClick={() => setOpen(true)}>
            Open sidebar
          </Button>
        </Toolbar.Actions>
      </Tabs>
    </Toolbar>
  </Columns.Column>
  <Columns.Column fixed>
    <SidePanel
      type="toolbar"
      border
      title="SidePanel for the toolbar"
      open={open}
      onClose={() => setOpen(false)}
    >
      <Text>I am a SidePanel</Text>
    </SidePanel>
  </Columns.Column>
</Columns >;
```

## Related

- [Columns](#/React%20Layouts/Columns)
- [SidePanel](#/React%20Components/SidePanel)
- [Tabs](#/React%20Components/Tabs)
