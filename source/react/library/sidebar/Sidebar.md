Sidebar with clickable sections:
```
<Sidebar>
  <SidebarSection title="Home" icon="home" active />
  <SidebarSection title="Reports" icon="reports" />
  <SidebarSection title="Connections" icon="connect" />
  <SidebarSection title="Data Model" icon="model" />
</Sidebar>
```

Sidebar with toggleable subsections.
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
  <SidebarSection title="Home" icon="home" />
  <SidebarSection title="Reports" icon="reports" active open>
    <SidebarSubsection title="Insights Reports" options={ cannedReports } />
    <SidebarSubsection title="My Reports" options={ customReports } />
  </SidebarSection>
  <SidebarSection title="Connections" icon="connect" />
  <SidebarSection title="Data Model" icon="model" />
</Sidebar>
```
