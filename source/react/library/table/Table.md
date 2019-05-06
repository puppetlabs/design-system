The table component renders arrays of data in a tabular form. It does not handle
pagination, sorting, or filtering and therefore should be used in simple cases.

### Basic use

```
const data = [
  { id: 1, eventType: 'Virus/Malware', affectedDevices: 20, detections: 634 },
  { id: 2, eventType: 'Spyware/Grayware', affectedDevices: 20, detections: 634 },
  { id: 3, eventType: 'URL Filtering', affectedDevices: 15, detections: 598 },
  { id: 4, eventType: 'Web Reputation', affectedDevices: 15, detections: 598 },
  { id: 5, eventType: 'Network Virus', affectedDevices: 15, detections: 497 },
  { id: 6, eventType: 'Application Control', affectedDevices: 0, detections: 0 }
];

const columns = [
  { label: 'Event Type', dataKey: 'eventType' },
  { label: 'Affected Devices', dataKey: 'affectedDevices' },
  { label: 'Detections', dataKey: 'detections' }
];


<Table data={data} columns={columns} />

```

### Custom column widths

The table component uses fixed column layouts. Explicit widths can be provided
with the inline `style` parameter on each column or with an additional className.

```
const data = [
  { id: 1, eventType: 'Virus/Malware', affectedDevices: 20, detections: 634 },
  { id: 2, eventType: 'Spyware/Grayware', affectedDevices: 20, detections: 634 },
  { id: 3, eventType: 'URL Filtering', affectedDevices: 15, detections: 598 },
  { id: 4, eventType: 'Web Reputation', affectedDevices: 15, detections: 598 },
  { id: 5, eventType: 'Network Virus', affectedDevices: 15, detections: 497 },
  { id: 6, eventType: 'Application Control', affectedDevices: 0, detections: 0 }
];

const columns = [
  { label: 'Event Type', dataKey: 'eventType', style: { width: '50%' } },
  { label: 'Affected Devices', dataKey: 'affectedDevices', className: 'column-width-35p' },
  { label: 'Detections', dataKey: 'detections' }
];

<Table data={data} columns={columns} />

```
### Nested Data

The `cellDataGetter` property on each column definition can be used to get nested or computed data from the data array. The method should implement the following signature:

```js static
function ({
  columnData: any,
  dataKey: string,
  rowData: any
}): any
```

The default cellDataGetter will grab the `dataKey` attribute.

```
const data = [
  { id: 1, user: { name: 'Meriwether Lewis', employer: { name: 'The Corps of Discovery' } } },
  { id: 2, user: { name: 'Johnny Utah', employer: { name: 'FBI' } } },
  { id: 3, user: { name: 'The Dude', employer: null } }
];

const columns = [
  {
    label: 'User',
    dataKey: 'user',
    cellDataGetter: ({ rowData }) => rowData.user.name
  },
  {
    label: 'Employer',
    dataKey: 'employer',
    cellDataGetter: ({ rowData }) => rowData.user.employer ? rowData.user.employer.name : 'Unemployed'
  },
];

<Table data={data} columns={columns} />

```

### Custom cell rendering

The `cellRenderer` property on each column definition can be used to render custom data. The method should implement the following signature:

```js static
function ({
  cellData: any,
  columnIndex: number,
  dataKey: string,
  rowData: any,
  rowIndex: number
}): node
```

The default cellRenderer will render `cellData` as a string.

```
const data = [
  { id: 1, exclamation: 'HAH!', metaData: { created: new Date() } },
  { id: 2, exclamation: 'Bananas!', metaData: { created: new Date() } },
  { id: 3, exclamation: 'Rats!', metaData: { created: new Date() } },
];

const columns = [
  {
    label: 'Exclamation',
    dataKey: 'exclamation',
    cellRenderer: ({ cellData }) => <Badge color="info">{cellData}</Badge>
  },
  {
    label: 'Created',
    dataKey: 'created',
    cellDataGetter: ({ rowData }) => rowData.metaData.created,
    cellRenderer: ({ cellData }) => cellData.toLocaleString(),
  }
];

<Table data={data} columns={columns} />

```

### Row keys

React requires unique keys on iterated elements to ensure performant and bug-free rendering (see [here](https://reactjs.org/docs/lists-and-keys.html#keys)). By default the Table component will attempt to grab an `id` property off each data entry. This can be overriden by passing another unique key:

```js static
<Table data={data} columns={columns} rowKey="myUniqueKey" />
```

Optional a function returning the unique value can be provided:

```js static
<Table data={data} columns={columns} rowKey={rowData => rowdata.nested.uniqueKey} />
```
