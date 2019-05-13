The Tabs component is a lightly styled wrapper that expects nested Tabs.Tab components. It requires a unique id for accessibility and can optionally take a type prop for secondary styling. It offers both a controlled and uncontrolled mode, dependent on the presence of an onChange prop.

Each Tabs.Tab will populate a button with its title prop and a panel with anything you nest inside.

Tabs.Tab requires an id for accessibility and state management.

---

### Uncontrolled Mode

_In uncontrolled mode (no onChange prop on Tabs), the user has full control over component navigation._

Default Tabs:
```
<Tabs id="default-tabs">
  <Tabs.Tab title="1" id="tab-1">
    Once focussed, use arrows to switch tabs.
  </Tabs.Tab>
  <Tabs.Tab title="2" id="tab-2">
    Hit Tab to focus down.
    <br /><input></input>
  </Tabs.Tab>
  <Tabs.Tab title="3" id="tab-3">
    Hit Shift + Tab to focus up.
  </Tabs.Tab>
</Tabs>
```
Secondary Tabs (and change default active):
```
<Tabs type="secondary" id="secondary-tabs" activeTab="tab-3">
  <Tabs.Tab title="1" id="tab-1">
    The Tab title prop becomes the button label.
  </Tabs.Tab>
  <Tabs.Tab title="2" id="tab-2">
    Whatever is nested inside the Tab become the Panel content.
  </Tabs.Tab>
  <Tabs.Tab title="3" id="tab-3">
    To change the default tab, set the activeTab prop on Tabs equal to the desired Tab ID.
  </Tabs.Tab>
</Tabs>
```

### Controlled Mode

_In controlled mode (onChange prop passed to Tabs), the user has no implicit control over component navigation._
```
<Tabs id="controlled-tabs" activeTab="tab-2" onChange={()=>{}}>
  <Tabs.Tab title="Not navigable" id="tab-1">
    Can't get here without using onChange.
  </Tabs.Tab>
  <Tabs.Tab title="Active" id="tab-2">
    This can only be navigated away from using onChange.
  </Tabs.Tab>
</Tabs>
```
