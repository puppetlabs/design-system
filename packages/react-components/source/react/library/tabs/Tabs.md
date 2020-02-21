## Overview

Tabs allow users to toggle between sets of related content within the same content area. Use tabs to switch between variations of the same content (e.g. simple vs. advanced forms).

The Tabs component is a lightly styled wrapper that expects nested Tabs. Tab components require a unique `id` for accessibility, a string `title` and optionally take a `type` prop for secondary styling. Component children are propagated through to the relevant tab panel. It offers both a controlled and uncontrolled mode, dependent on the presence of an `onChange` prop. By default, the Tabs component handles all interactions as users switch between tabs. An optional `initialTab` prop can be used.

### Microcopy

- Use a single noun or noun phrase that describes the content of the tab, for example, Facts, Reports, or Activity Log.

## Types

### Primary

```jsx
import Text from '../text';

<Tabs>
  <Tabs.Tab title="Tab 1">
    <Text>Once focused, use arrows to switch tabs.</Text>
  </Tabs.Tab>
  <Tabs.Tab title="Tab 2">
    <Text>
      Hit Tab to focus down.
      <br />
      <input></input>
    </Text>
  </Tabs.Tab>
  <Tabs.Tab title="Tab 3">
    <Text>Hit Shift + Tab to focus up.</Text>
  </Tabs.Tab>
</Tabs>;
```

### Secondary

```jsx
import Text from '../text';

<Tabs type="secondary" initialTab={2}>
  <Tabs.Tab title="Tab 1">
    <Text>The Tab title prop becomes the button label.</Text>
  </Tabs.Tab>
  <Tabs.Tab title="Tab 2">
    <Text>Whatever is nested inside the Tab become the Panel content.</Text>
  </Tabs.Tab>
  <Tabs.Tab title="Tab 3">
    <Text>
      To change the default tab, set the activeTab prop on Tabs equal to the
      desired Tab ID.
    </Text>
  </Tabs.Tab>
</Tabs>;
```

## Controlled Mode

The active tab can be manually controlled by setting `active=true` on an individual Tab. If more than one tab is marked active, the first active tab will be selected. In this mode we recommend supplying a unique `id` to each Tab element so that the active tab is easier to track. If no id is provided the Tabs component will use the positional index.

```jsx
import Text from '../text';

class MyPageWithTabs extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      activeTab: 'tab-1',
    };

    this.onTabChange = this.onTabChange.bind(this);
  }

  onTabChange(newTab) {
    console.log(`Switching to tab ${newTab}`);
    this.setState({ activeTab: newTab });
  }

  render() {
    const { activeTab } = this.state;

    return (
      <Tabs id="controlled-tabs" onChange={this.onTabChange}>
        <Tabs.Tab title="Tabby tab" id="tab-1" active={activeTab === 'tab-1'}>
          <Text>Tab 1</Text>
        </Tabs.Tab>
        <Tabs.Tab title="Tabby cat" id="tab-2" active={activeTab === 'tab-2'}>
          <Text>Tab 2</Text>
        </Tabs.Tab>
      </Tabs>
    );
  }
}

<MyPageWithTabs />;
```
