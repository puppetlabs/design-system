```
<Tabs>
  <TabPanel title="Tab 1">
    I'm a happy panel
  </TabPanel>
  <TabPanel title="Tab 2">
    I'm another happy panel
  </TabPanel>
</Tabs>
```

Vertical `Tabs`:

```
<Tabs vertical>
  <TabPanel title="Tab 1">
    I'm a happy panel
  </TabPanel>
  <TabPanel title="Tab 2">
    I'm another happy panel
  </TabPanel>
  <TabPanel
    onClick={ (e) => {
      e.preventDefault();
      console.log('you got me');
    } }
    title="click me"
  />
</Tabs>
```
