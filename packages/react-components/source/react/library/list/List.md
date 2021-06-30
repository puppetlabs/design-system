## Overview

The `List` component should be passed `List.Item` components, which may contain text nodes, but are often links, for use in navigation or filters.

### Basic use

When a `List.Item` contains an `<a>` tag (or a router link component that renders one), it will get the following styling. Pass the `active` prop to highlight the currently selected `List.Item`.

```jsx
<List>
  <List.Item>
    <a href="http://puppet.com" target="_blank">Puppet website</a>
  </List.Item>
  <List.Item>
    <a href="https://forge.puppet.com" target="_blank">Puppet Forge</a>
  </List.Item>
  <List.Item active>
    <a href="https://puppet.style" target="_blank">Puppet Design System</a>
  </List.Item>
</List>
```
