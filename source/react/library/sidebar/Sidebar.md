Sidebar with clickable sections:
```
<Sidebar>
  <Section title="Home" icon="home" active />
  <Section title="Reports" icon="reports" />
  <Section title="Connections" icon="connect" />
  <Section title="Data Model" icon="model" />
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

/** Note default attribute on option */
const customReports = [
  { title: 'DevOps Team Overview', default: true },
  { title: "Product Launch Q3 '18" },
  { title: 'Staging Report' },
  { title: 'Bump1' },
  { title: 'Bump2' },
  { title: 'Bump3' },
  { title: 'Bump4' },
  { title: 'Bump5' },
  { title: 'Bump6' },
];

<Sidebar>
  <Section title="Home" icon="home" />
  <Section title="Reports" icon="reports" active open>
    <Subsection title="Insights Reports" options={ cannedReports } />
    <Subsection title="My Reports" options={ customReports } />
  </Section>
  <Section title="Connections" icon="connect" />
  <Section title="Data Model" icon="model" />
</Sidebar>
```
