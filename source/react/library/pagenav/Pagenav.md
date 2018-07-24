```
const sections = [
  { label: 'Insights Scores', key: 'insights-scores', active: true },
  { label: 'Pipelines & Bottlenecks', key: 'pipelines-bottlenecks' },
  { label: 'Teams & Projects', key: 'teams-projects' },
];

<Pagenav
  pageSections={ sections }
  onSectionClick={ console.log }
/>
```
