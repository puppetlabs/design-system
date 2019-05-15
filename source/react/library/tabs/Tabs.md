The Tabs component is a lightly styled wrapper that expects nested Tabs.Tab components. It requires a unique id for accessibility and can optionally take a type prop for secondary styling. It offers both a controlled and uncontrolled mode, dependent on the presence of an onChange prop.

Each Tabs.Tab requires a unique `id` and a string `title`. Component children are propagated through to the relevant tab panel.

---

### Basic Use (uncontrolled)

_By default the Tabs component will handle all interactions as users switch between tabs. An optional initialTab prop can be used_

Default Tabs:
```
<Tabs>
  <Tabs.Tab title="Tab 1">
    Once focused, use arrows to switch tabs.
  </Tabs.Tab>
  <Tabs.Tab title="Tab 2">
    Hit Tab to focus down.
    <br /><input></input>
  </Tabs.Tab>
  <Tabs.Tab title="Tab 3">
    Hit Shift + Tab to focus up.
  </Tabs.Tab>
</Tabs>
```
Secondary Tabs:
```
<Tabs type="secondary" initialTab={2}>
  <Tabs.Tab title="Tab 1">
    The Tab title prop becomes the button label.
  </Tabs.Tab>
  <Tabs.Tab title="Tab 2">
    Whatever is nested inside the Tab become the Panel content.
  </Tabs.Tab>
  <Tabs.Tab title="Tab 3">
    To change the default tab, set the activeTab prop on Tabs equal to the desired Tab ID.
  </Tabs.Tab>
</Tabs>
```

### Controlled Mode

_The active tab can be manually controlled by setting `active=true` on an individual Tab. If more than one tab is marked active, the first active tab will be selected. In this mode we recommend supplying a unique `id` to each Tab element so that the active tab is easier to track. If no id is provided the Tabs component will use the positional index._
```

class MyPageWithTabs extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      activeTab: 'tab-1',
    }

    this.onTabChange = this.onTabChange.bind(this);
  }

  onTabChange(newTab) {
    console.log(`Switching to tab ${newTab}`)
    this.setState({ activeTab: newTab });
  }

  render() {
    const { activeTab } = this.state;

    return (
      <Tabs id="controlled-tabs" onChange={this.onTabChange}>
        <Tabs.Tab
          title="Tabby tab"
          id="tab-1"
          active={activeTab === 'tab-1'}
        >
          Tab 1
        </Tabs.Tab>
        <Tabs.Tab
          title="Tabby cat"
          id="tab-2"
          active={activeTab === 'tab-2'}
        >
          Tab 2
        </Tabs.Tab>
      </Tabs>
    );
  }
}

<MyPageWithTabs />
```
