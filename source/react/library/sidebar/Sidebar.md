Sidebar with clickable sections:
```
<Sidebar>
  <SidebarSection icon="connections" title="Home" active />
  <SidebarSection icon="connections" title="Reports" />
  <SidebarSection icon="connections" title="Connections" />
  <SidebarSection icon="connections" title="Data Model" />
</Sidebar>
```

Sidebar with subsections and accordion enabled:
```
const cannedReports = [
  { title: 'Automation Footprint' },
  { title: 'Speed of Delivery' },
  { title: 'Quality of Deployments' },
  { title: 'Security Audit', active: true },
];

const customReports = [
  { title: 'DevOps Team Overview' },
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
  <SidebarSection icon="connections" title="Home" active />
  <SidebarSection icon="connections" title="Reports">
    <SidebarSubsection title="Insights Reports" options={ cannedReports } />
    <SidebarSubsection title="My Reports" options={ customReports } />
  </SidebarSection>
  <SidebarSection icon="connections" title="Connections" />
  <SidebarSection icon="connections" title="Data Model" />
</Sidebar>
```
