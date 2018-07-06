Sidebar with clickable sections:
```
<Sidebar>
  <Section onClick={ () => { console.log('here') } } title="Home" icon="home" active />
  <Section onClick={ () => { console.log('here') } } title="Reports" icon="reports" />
  <Section onClick={ () => { console.log('here') } } title="Connections" icon="connect" />
  <Section onClick={ () => { console.log('here') } } title="Data Model" icon="model" />
</Sidebar>
```

Sidebar with toggleable subsections:
```
const cannedReports = [
  { title: 'Automation Footprint' },
  { title: 'Speed of Delivery' },
  { title: 'Quality of Deployments' },
  { title: 'Security Audit' },
];

const customReports = [
  { title: 'DevOps Team Overview', default: true },
  { title: "Product Launch Q3 '18" },
  { title: 'Staging Report' },
  { title: 'Bump1' },
  { title: 'Bump2' },
  { title: 'Bump3' },
  { title: 'Bump4' },
];

const getOptions = (options) => {
  return options.map((option) => {
    return <SubsectionItem title={ option.title } default={ option.default }/>
  });
}

<Sidebar toggleable>
  <Section title="Home" icon="home" />
  <Section title="Reports" icon="reports" active open>
    <Subsection title="Insights Reports">
      { getOptions(cannedReports) }
    </Subsection>
    <Subsection title="My Reports" truncate>
      { getOptions(customReports) }
    </Subsection>
  </Section>
  <Section title="Connections" icon="connect" />
  <Section title="Data Model" icon="model" />
</Sidebar>
```
