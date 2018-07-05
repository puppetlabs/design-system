Sidebar with clickable sections:
```
<Sidebar>
  <SidebarSection title="Home" icon="connections" active />
  <SidebarSection title="Reports" icon="connections" />
  <SidebarSection title="Connections" icon="connections" />
  <SidebarSection title="Data Model" icon="connections" />
</Sidebar>
```

Sidebar with togglable subsections.
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
  <SidebarSection title="Home" icon="connections" active />
  <SidebarSection title="Reports" icon="connections" open>
    <SidebarSubsection title="Insights Reports" options={ cannedReports } />
    <SidebarSubsection title="My Reports" options={ customReports } />
  </SidebarSection>
  <SidebarSection title="Connections" icon="connections" />
  <SidebarSection title="Data Model" icon="connections" />
</Sidebar>
```
