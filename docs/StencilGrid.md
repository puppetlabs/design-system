```
const testView = {
  name: 'Test View',
  configuration: {
    components: [
      {
        type: 'line',
        layout: { w: 12, h: 2, x: 0, y: 0 },
      },
      {
        type: 'area',
        layout: { w: 6, h: 2, x: 0, y: 2 },
      },
      {
        type: 'donut',
        layout: { w: 4, h: 2, x: 6, y: 2 },
      },
      {
        type: 'datagrid',
        layout: { w: 2, h: 1, x: 10, y: 2 },
      },
      {
        type: 'kpi',
        layout: { w: 2, h: 1, x: 10, y: 3 },
      },
      {
        type: 'scatter',
        layout: { w: 12, h: 2, x: 0, y: 4 },
      },
    ],
  },
};
<StencilGrid view={ testView } />
```

With a custom (unrecognized) component:

```
const testView = {
  name: 'Test View',
  configuration: {
    components: [
      {
        type: 'blah blah',
        layout: { w: 12, h: 2, x: 0, y: 0 },
      },
      {
        type: 'blah blah',
        layout: { w: 6, h: 2, x: 0, y: 2 },
      },
      {
        type: 'blah blah',
        layout: { w: 4, h: 2, x: 6, y: 2 },
      },
      {
        type: 'datagrid',
        layout: { w: 2, h: 1, x: 10, y: 2 },
      },
      {
        type: 'kpi',
        layout: { w: 2, h: 1, x: 10, y: 3 },
      },
    ],
  },
};
<StencilGrid view={ testView } />
```
