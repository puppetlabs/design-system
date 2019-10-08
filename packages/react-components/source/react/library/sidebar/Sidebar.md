```jsx
<div style={{ position: 'relative', height: '800px' }}>
  <Sidebar>
    <Sidebar.Header
      logo="pipelines"
      onClick={() => console.log('logo clicked')}
      ariaLabel="Return to the home page"
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
      </Sidebar.Section>
    </Sidebar.Navigation>
    <Sidebar.Footer
      username="Lorem Ipsum"
      version="1969.7.20"
      onClick={console.log}
    />
  </Sidebar>
</div>
```

### Minimized Sidebar

```jsx
<div style={{ position: 'relative', height: '800px' }}>
  <Sidebar minimized>
    <Sidebar.Header
      logo="pipelines"
      onClick={() => console.log('logo clicked')}
      ariaLabel="Return to the home page"
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
      </Sidebar.Section>
    </Sidebar.Navigation>
    <Sidebar.Footer username="Lorem Ipsum" version="1969.7.20" />
  </Sidebar>
</div>
```
