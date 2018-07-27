```
const sections = [
  { label: 'Insights Scores', active: true },
  { label: 'Pipelines & Bottlenecks' },
  { label: 'Teams & Projects' },
];

const actions = [
  <Button
    size="small"
    onClick={ () => {} }
    label="Export"
    secondary
  />,
  <Button
    size="small"
    onClick={ () => {} }
    label="Share"
  />,
];

<Pagenav
  actions={ actions }
  pageSections={ sections }
  onSectionClick={ console.log }
/>
```
