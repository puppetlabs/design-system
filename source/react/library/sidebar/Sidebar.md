Sidebar with clickable sections:

```
<Sidebar togglable>
  <Section onClick={ () => {} } title="Home" icon="home" active />
  <SectionLabel title="reports" />
  <Section onClick={ () => {} } title="Speed & Frequency" icon="speed" />
  <Section onClick={ () => {} } title="Reliability" icon="reliability" />
  <Section onClick={ () => {} } title="Security" icon="security" />
  <Section onClick={ () => {} } title="Business Value" icon="value" />
  <Section onClick={ () => {} } title="Pipeline" icon="pipeline" />
  <SectionLabel title="custom reports" />
  <Section onClick={ () => {} } title="My Reports" icon="reports" />
  <SectionLabel title="config" />
  <Section onClick={ () => {} } title="Connections" icon="connections" />
  <Section onClick={ () => {} } title="Data Model" icon="data-fields" />
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
  <SectionLabel title="reports" />
  <Section onClick={ () => {} } title="Speed & Frequency" icon="speed" />
  <Section onClick={ () => {} } title="Reliability" icon="reliability" />
  <Section onClick={ () => {} } title="Security" icon="security" />
  <Section onClick={ () => {} } title="Business Value" icon="value" />
  <Section onClick={ () => {} } title="Pipeline" icon="pipeline" />
  <SectionLabel title="custom reports" />
  <Section title="My Reports" icon="reports" active open>
    <Subsection title="My Reports" truncate>
      { getOptions(customReports) }
    </Subsection>
  </Section>
  <Section title="Connections" icon="connections" />
  <Section title="Data Model" icon="data-fields" />
</Sidebar>
```
