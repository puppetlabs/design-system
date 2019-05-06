The Tabs component is a lightly styled wrapper that expects nested Tabs.Tab components. It can optionally take a secondary type prop.

Each Tabs.Tab will create a nav button using your title prop and a panel which will render anything you nest inside.

You can directly set selected and disabled flags on Tabs.Tab

---
---

Default Tabs:
```
<Tabs>
  <Tabs.Tab title="Good">
    Il buono
  </Tabs.Tab>
  <Tabs.Tab title="Bad">
    Il brutto
  </Tabs.Tab>
  <Tabs.Tab title="Ugly">
    Il cattivo
  </Tabs.Tab>
</Tabs>
```
Secondary Tabs:
```
<Tabs type="secondary">
  <Tabs.Tab title="Good">
    Il buono
  </Tabs.Tab>
  <Tabs.Tab title="Bad">
    Il brutto
  </Tabs.Tab>
  <Tabs.Tab title="Ugly">
    Il cattivo
  </Tabs.Tab>
</Tabs>
```
Optional Tab props:
```
<Tabs>
  <Tabs.Tab title="Default">
    No optional props
  </Tabs.Tab>
  <Tabs.Tab title="Selected" selected>
    <em>selected</em> prop on Tab
  </Tabs.Tab>
  <Tabs.Tab title="Disabled" disabled>
    <em>disabled</em> prop on Tab
  </Tabs.Tab>
</Tabs>
```
