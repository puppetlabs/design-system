```
const sections = [
  { label: 'Insights Scores', active: true },
  { label: 'Pipelines & Bottlenecks' },
  { label: 'Teams & Projects' },
];

const actions = [
  <Button
    onClick={ () => {} }
    label="Export"
    secondary
  />,
  <Button
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
