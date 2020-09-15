## Overview

Tabs allow users to toggle between sets of related content within the same content area. Use tabs to switch between variations of the same content (e.g. simple vs. advanced forms).

The Tabs component is a lightly styled wrapper that expects nested Tabs. Tab components require a unique `id` for accessibility, a string `title` and optionally take a `type` prop for secondary styling. Component children are propagated through to the relevant tab panel. It offers both a controlled and uncontrolled mode, dependent on the presence of an `onChange` prop. By default, the Tabs component handles all interactions as users switch between tabs. An optional `initialTab` prop can be used.

### Microcopy

- Use a single noun or noun phrase that describes the content of the tab, for example, Facts, Reports, or Activity Log.

## Types

### Primary

The default, primary type gives tabs a white background:

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

If `type=secondary`, tabs change their background color on activation:

```jsx
import Button from '../button';
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

Individual `Tab` components may also set `type=secondary` themselves. See the **Tab** section below.

### Transparent

Set `transparent=true` to use an alternate, borderless tab design:

```
import Text from '../text';

<Tabs transparent>
  <Tabs.Tab title="Tab 1">
    <Text>Tab 1</Text>
  </Tabs.Tab>
  <Tabs.Tab title="Tab 2">
    <Text>Tab 2</Text>
  </Tabs.Tab>
</Tabs>;
```

Example with `type=secondary`:

```
import Text from '../text';

<Tabs transparent type='secondary'>
  <Tabs.Tab title="Tab 1">
    <Text>Tab 1</Text>
  </Tabs.Tab>
  <Tabs.Tab title="Tab 2">
    <Text>Tab 2</Text>
  </Tabs.Tab>
</Tabs>;
```

## Responding to smaller container widths

By default, if the row of tabs is too long for its container element, it will be horizontally scrollable, and scroll buttons will be rendered at the left and right as needed:

```
import Text from '../text';

<div style={{ maxWidth: '300px' }}>
  <Tabs transparent>
    <Tabs.Tab title="Tab One" id={1}>
      <Text>
        Tab 1 Odio aenean sed adipiscing diam donec adipiscing. Molestie ac feugiat sed lectus. Vitae aliquet nec ullamcorper sit amet risus nullam.
      </Text>
    </Tabs.Tab>
    <Tabs.Tab title="Tab Two" id={2}>
      <Text>
        Tab 2 Eu non diam phasellus vestibulum lorem sed risus ultricies tristique. Vitae suscipit tellus mauris a diam maecenas sed.
      </Text>
    </Tabs.Tab>
    <Tabs.Tab title="Tab Three" id={3}>
      <Text>
        Tab 3 Tempus iaculis urna id volutpat lacus. Feugiat vivamus at augue eget arcu dictum varius. Sit amet consectetur adipiscing elit pellentesque habitant morbi.
      </Text>
    </Tabs.Tab>
    <Tabs.Tab title="Tab Four" id={4}>
      <Text>
        Tab 4 Mattis rhoncus urna neque viverra justo nec ultrices dui. Ultrices mi tempus imperdiet nulla malesuada pellentesque elit eget gravida.
      </Text>
    </Tabs.Tab>
    <Tabs.Tab title="Tab Five" id={5}>
      <Text>
        Tab 5 Odio aenean sed adipiscing diam donec adipiscing. Molestie ac feugiat sed lectus. Vitae aliquet nec ullamcorper sit amet risus nullam.
      </Text>
    </Tabs.Tab>
    <Tabs.Tab title="Tab Six" id={6}>
      <Text>
        Tab 6 Eu non diam phasellus vestibulum lorem sed risus ultricies tristique. Vitae suscipit tellus mauris a diam maecenas sed.
      </Text>
    </Tabs.Tab>
    <Tabs.Tab title="Tab Seven" id={7}>
      <Text>
        Tab 7 Tempus iaculis urna id volutpat lacus. Feugiat vivamus at augue eget arcu dictum varius. Sit amet consectetur adipiscing elit pellentesque habitant morbi.
      </Text>
    </Tabs.Tab>
    <Tabs.Tab title="Tab Eight" id={8}>
      <Text>
        Tab 8 Mattis rhoncus urna neque viverra justo nec ultrices dui. Ultrices mi tempus imperdiet nulla malesuada pellentesque elit eget gravida.
      </Text>
    </Tabs.Tab>
  </Tabs>
</div>;
```

To disable this behavior, set `scroll=false`. The tab titles will wrap if needed, but content may still be cut off where there is not enough space:

```
import Text from '../text';

<div style={{ maxWidth: '300px' }}>
  <Tabs transparent scroll={false}>
    <Tabs.Tab title="Tab One" id={1}>
      <Text>
        Tab 1 Odio aenean sed adipiscing diam donec adipiscing. Molestie ac feugiat sed lectus. Vitae aliquet nec ullamcorper sit amet risus nullam.
      </Text>
    </Tabs.Tab>
    <Tabs.Tab title="Tab Two" id={2}>
      <Text>
        Tab 2 Eu non diam phasellus vestibulum lorem sed risus ultricies tristique. Vitae suscipit tellus mauris a diam maecenas sed.
      </Text>
    </Tabs.Tab>
    <Tabs.Tab title="Tab Three" id={3}>
      <Text>
        Tab 3 Tempus iaculis urna id volutpat lacus. Feugiat vivamus at augue eget arcu dictum varius. Sit amet consectetur adipiscing elit pellentesque habitant morbi.
      </Text>
    </Tabs.Tab>
    <Tabs.Tab title="Tab Four" id={4}>
      <Text>
        Tab 4 Mattis rhoncus urna neque viverra justo nec ultrices dui. Ultrices mi tempus imperdiet nulla malesuada pellentesque elit eget gravida.
      </Text>
    </Tabs.Tab>
    <Tabs.Tab title="Tab Five" id={5}>
      <Text>
        Tab 5 Odio aenean sed adipiscing diam donec adipiscing. Molestie ac feugiat sed lectus. Vitae aliquet nec ullamcorper sit amet risus nullam.
      </Text>
    </Tabs.Tab>
    <Tabs.Tab title="Tab Six" id={6}>
      <Text>
        Tab 6 Eu non diam phasellus vestibulum lorem sed risus ultricies tristique. Vitae suscipit tellus mauris a diam maecenas sed.
      </Text>
    </Tabs.Tab>
    <Tabs.Tab title="Tab Seven" id={7}>
      <Text>
        Tab 7 Tempus iaculis urna id volutpat lacus. Feugiat vivamus at augue eget arcu dictum varius. Sit amet consectetur adipiscing elit pellentesque habitant morbi.
      </Text>
    </Tabs.Tab>
    <Tabs.Tab title="Tab Eight" id={8}>
      <Text>
        Tab 8 Mattis rhoncus urna neque viverra justo nec ultrices dui. Ultrices mi tempus imperdiet nulla malesuada pellentesque elit eget gravida.
      </Text>
    </Tabs.Tab>
  </Tabs>
</div>;
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

## Padding

By default, tab panes have padding for simple use cases, but this can be removed by adding `panePadding={false}` to `Tabs`.

```jsx
import Text from '../text';

<Tabs panePadding={false}>
  <Tabs.Tab title="Tab 1">
    <Text style={{ margin: '20px 0' }}>
      Default padding can be removed on Tabs so that tab content can define its
      own padding.
    </Text>
  </Tabs.Tab>
  <Tabs.Tab title="Tab 2">
    <Text>This tab forgot to add its own padding.</Text>
  </Tabs.Tab>
</Tabs>;
```

# Tab

## Types

As seen above, the `Tabs.Tab` component is used as children of `Tabs` and have props of their own, `id`, `title`, `active`, and `type`. A `type` of "primary" or "secondary" may be used on individual tabs to change the background color of the tab panel, which allows you to choose the type that works best for each tab's content.

```jsx
import Text from '../text';

<Tabs>
  <Tabs.Tab title="Primary tab">
    <Text>Default white background on first tab</Text>
  </Tabs.Tab>
  <Tabs.Tab title="Secondary tab" type="secondary">
    <Text>Grey background on second tab, whose type is secondary</Text>
  </Tabs.Tab>
  <Tabs.Tab title="Primary tab" type="primary">
    <Text>Default white background on the third tab</Text>
  </Tabs.Tab>
</Tabs>;
```

## Related

- [SidePanel](#/React%20Components/SidePanel)
- [Toolbar](#/React%20Components/Toolbar)
