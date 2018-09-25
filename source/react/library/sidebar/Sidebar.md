Sidebar with clickable sections:

```
<div style={{position:"relative", height:"550px"}}>
  <Sidebar togglable>
    <Section onClick={ () => {} } title="Home" icon="home" active />
    <Section onClick={ () => {} } title="Speed & Frequency" icon="speed" label="reports"/>
    <Section onClick={ () => {} } title="Reliability" icon="reliability" />
    <Section onClick={ () => {} } title="Security" icon="security" />
    <Section onClick={ () => {} } title="Business Value" icon="value" />
    <Section onClick={ () => {} } title="Pipeline" icon="pipeline" />
    <Section onClick={ () => {} } title="My Reports" icon="reports" label="custom reports" />
    <Section onClick={ () => {} } title="Connections" icon="connections" label="config" />
    <Section onClick={ () => {} } title="Data Model" icon="data-fields" />
  </Sidebar>
</div>
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
  { title: 'This is a long name for a report' },
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

<div style={{position:"relative", height:"700px"}}>
  <Sidebar togglable>
    <Section title="Home" icon="home" />
    <Section onClick={ () => {} } title="Speed & Frequency" icon="speed" label="reports"/>
    <Section onClick={ () => {} } title="Reliability" icon="reliability" />
    <Section onClick={ () => {} } title="Security" icon="security" />
    <Section onClick={ () => {} } title="Business Value" icon="value" />
    <Section onClick={ () => {} } title="Pipeline" icon="pipeline" />
    <Section title="My Reports" icon="reports" open label="custom reports">
      <Subsection title="My Reports" truncate>
        { getOptions(customReports) }
      </Subsection>
    </Section>
    <Section title="Connections" icon="connections" label="config" />
    <Section title="Data Model" icon="data-fields" />
  </Sidebar>
</div>
```
