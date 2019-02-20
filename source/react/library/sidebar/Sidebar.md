Sidebar with clickable Sidebar.sections, logo, and dark theme:

```javascript
<div style={{ position: 'relative', height: '800px' }}>
  <Sidebar>
    <Sidebar.Header
      logo="insights"
      onLogoClick={() => console.log('logo clicked')}
    />
    <Sidebar.Navigation>
      <Sidebar.Section>
        <Sidebar.Item onClick={() => {}} title="Home" icon="home" active />
      </Sidebar.Section>
      <Sidebar.Section label="reports">
        <Sidebar.Item onClick={() => {}} title="Code" icon="code" />
        <Sidebar.Item onClick={() => {}} title="Build" icon="build" />
        <Sidebar.Item onClick={() => {}} title="Deploy" icon="rocket" />
      </Sidebar.Section>
      <Sidebar.Section label="conifg">
        <Sidebar.Item
          onClick={() => {}}
          title="Connections"
          icon="connections"
          label="config"
        />
        <Sidebar.Item
          onClick={() => {}}
          title="Data Model"
          icon="data-fields"
        />
      </Sidebar.Section>
    </Sidebar.Navigation>
    <Sidebar.Footer username="Lorem Ipsum" version="1969.7.20" />
  </Sidebar>
</div>
```
