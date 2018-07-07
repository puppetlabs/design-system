Sidebar with clickable sections:
```
<Sidebar>
  <Section onClick={ () => {} } title="Home" icon="home" active />
  <Section onClick={ () => {} } title="Reports" icon="reports" />
  <Section onClick={ () => {} } title="Connections" icon="connect" />
  <Section onClick={ () => {} } title="Data Model" icon="model" />
</Sidebar>
```

Sidebar with togglable subsections:
```
const cannedReports = [
  { title: 'Automation Footprint' },
  { title: 'Speed of Delivery' },
  { title: 'Quality of Deployments' },
  { title: 'Security Audit' },
];

const customReports = [
  { title: 'DevOps Team Overview', active: true },
  { title: "Product Launch Q3 '18" },
  { title: 'Staging Report' },
  { title: 'Bump1' },
  { title: 'Bump2' },
  { title: 'Bump3' },
  { title: 'Bump4' },
];

const getOptions = (options) => {
  return options.map((option) => {
    return <SubsectionItem title={ option.title } active={ option.active } onClick={ () => {} } />
  });
}

<Sidebar togglable>
  <Section title="Home" icon="home" />
  <Section title="Reports" icon="reports" active open>
    <Subsection title="Insights Reports">
      { getOptions(cannedReports) }
    </Subsection>
    <Subsection title="My Reports" truncate onAddItem={ () => {} }>
      { getOptions(customReports) }
    </Subsection>
  </Section>
  <Section title="Connections" icon="connect" />
  <Section title="Data Model" icon="model" />
</Sidebar>
```
