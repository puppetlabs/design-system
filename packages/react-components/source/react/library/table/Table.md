## Overview

Tables display data and sometimes allow users to take action on that data. Tables can contain other UI elements, like links or buttons. Table design is modular, with discreet options available to support a variety of use cases. The table component renders arrays of data in a tabular form. It does not handle pagination, sorting, or filtering and therefore should be used in simple cases.

### Microcopy

- Use headings to eliminate redundant words in columns. For example, instead of Version 3.8.4 and Version 3.8.5, title the column Version, and use only the version numbers in the table cells. This makes it easier for users to scan the options and reduces word count for Localization. Use sentence case capitalization.
- Use capitalization appropriate to the item named in the cell. For example, if the cell lists an environment, use the same capitalization as the environment name.

## Basic use

A basic table displays content and doesn't add additional capabilities.

<!-- prettier-ignore-start -->
```jsx
const data = [
  { id: 1, eventType: 'Virus/Malware', affectedDevices: 20, detections: 634 },
  { id: 2, eventType: 'Spyware/Grayware', affectedDevices: 20, detections: 634 },
  { id: 3, eventType: 'URL Filtering', affectedDevices: 15, detections: 598 },
  { id: 4, eventType: 'Web Reputation', affectedDevices: 15, detections: 598 },
  { id: 5, eventType: 'Network Virus', affectedDevices: 15, detections: 497 },
  { id: 6, eventType: 'Application Control', affectedDevices: 0, detections: 0 },
];

const columns = [
  { label: 'Event type', dataKey: 'eventType' },
  { label: 'Affected devices', dataKey: 'affectedDevices' },
  { label: 'Detections', dataKey: 'detections' },
];

<Table data={data} columns={columns} />;
```
<!-- prettier-ignore-end -->

## Variations

### Fixed layouts

The `fixed` prop allows the table to be used in fixed layout mode. Provide explicit widths with the inline `style` parameter on each column or with an additional className.

<!-- prettier-ignore-start -->
```jsx
const data = [
  { id: 1, eventType: 'Virus/Malware', affectedDevices: 20, detections: 634 },
  { id: 2, eventType: 'Spyware/Grayware', affectedDevices: 20, detections: 634 },
  { id: 3, eventType: 'URL Filtering', affectedDevices: 15, detections: 598 },
  { id: 4, eventType: 'Web Reputation', affectedDevices: 15, detections: 598 },
  { id: 5, eventType: 'Network Virus', affectedDevices: 15, detections: 497 },
  { id: 6, eventType: 'Application Control', affectedDevices: 0, detections: 0 },
];

const columns = [
  { label: 'Event type', dataKey: 'eventType', style: { width: '50%' } },
  { label: 'Affected devices', dataKey: 'affectedDevices', className: 'column-width-35p' },
  { label: 'Detections', dataKey: 'detections' },
];

<Table fixed data={data} columns={columns} />;
```

### Bordered Table

The `bordered` prop adds optional border styling to the table.

<!-- prettier-ignore-start -->
```jsx
const data = [
  { id: 1, eventType: 'Virus/Malware', affectedDevices: 20, detections: 634 },
  { id: 2, eventType: 'Spyware/Grayware', affectedDevices: 20, detections: 634 },
  { id: 3, eventType: 'URL Filtering', affectedDevices: 15, detections: 598 },
  { id: 4, eventType: 'Web Reputation', affectedDevices: 15, detections: 598 },
  { id: 5, eventType: 'Network Virus', affectedDevices: 15, detections: 497 },
  { id: 6, eventType: 'Application Control', affectedDevices: 0, detections: 0 },
];

const columns = [
  { label: 'Event type', dataKey: 'eventType', style: { width: '50%' } },
  { label: 'Affected devices', dataKey: 'affectedDevices', className: 'column-width-35p' },
  { label: 'Detections', dataKey: 'detections' },
];

<Table bordered data={data} columns={columns} />;
```
<!-- prettier-ignore-end -->

### Nested Data

Use the `cellDataGetter` property on each column definition to get nested or computed data from the data array. The method should implement the following signature:

```js static
function ({
  columnData: any,
  dataKey: string,
  rowData: any
}): any
```

The default cellDataGetter grabs the `dataKey` attribute.

<!-- prettier-ignore-start -->
```jsx
const data = [
  { id: 1, user: { name: 'Meriwether Lewis', employer: { name: 'The Corps of Discovery' } } },
  { id: 2, user: { name: 'Johnny Utah', employer: { name: 'FBI' } } },
  { id: 3, user: { name: 'The Dude', employer: null } },
];

const columns = [
  {
    label: 'User',
    dataKey: 'user',
    cellDataGetter: ({ rowData }) => rowData.user.name,
  },
  {
    label: 'Employer',
    dataKey: 'employer',
    cellDataGetter: ({ rowData }) => rowData.user.employer ? rowData.user.employer.name : 'Unemployed',
  },
];

<Table data={data} columns={columns} />;
```
<!-- prettier-ignore-end -->

### Custom cell rendering

Use the `cellRenderer` property on each column definition to render custom data. The method should implement the following signature:

```js static
function ({
  cellData: any,
  columnData: any,
  columnIndex: number,
  dataKey: string,
  rowData: any,
  rowIndex: number
}): node
```

The default cellRenderer renders `cellData` as a string.

```jsx
import Badge from '../badge';
import Link from '../link';

const data = [
  { id: 1, exclamation: 'HAH!', metaData: { created: new Date() } },
  { id: 2, exclamation: 'Bananas!', metaData: { created: new Date() } },
  { id: 3, exclamation: 'Rats!', metaData: { created: new Date() } },
];

const columns = [
  {
    label: 'Exclamation',
    dataKey: 'exclamation',
    cellRenderer: ({ cellData }) => <Badge type="info">{cellData}</Badge>,
  },
  {
    label: 'Created',
    dataKey: 'created',
    cellDataGetter: ({ rowData }) => rowData.metaData.created,
    cellRenderer: ({ cellData }) => (
      <Link href="https://puppet.com/" className="rc-link">
        {cellData.toLocaleString()}
      </Link>
    ),
  },
];

<Table data={data} columns={columns} />;
```

### Row keys

React requires unique keys on iterated elements to ensure [performant and bug-free rendering](https://reactjs.org/docs/lists-and-keys.html#keys). By default the Table component will attempt to grab an `id` property off each data entry. This can be overriden by passing another unique key:

```jsx static
<Table data={data} columns={columns} rowKey="myUniqueKey" />
```

A unique key can also be provided via a function:

```jsx static
<Table
  data={data}
  columns={columns}
  rowKey={rowData => rowdata.nested.uniqueKey}
/>
```

### Hidden Overflow

Use the `hideOverflow` flag if you want to hide long cell content with an ellipses. The flag only affects the column it is turned on for.

<!-- prettier-ignore-start -->

```jsx
const data = [
  {
    id: 1,
    type: 'Lorem ipsum',
    passage:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    characters: 123,
  },
  { id: 2, type: 'Cicero', passage: 'Sed ut perspiciatis', characters: 19 },
  {
    id: 3,
    type: '1914',
    passage: 'But I must explain to you how all this mistaken idea',
    characters: 52,
  },
];

const columns = [
  { label: 'Types', dataKey: 'type' },
  {
    label: 'Passage',
    dataKey: 'passage',
    style: { width: '50%' },
    hideOverflow: true,
  },
  { label: 'Character Length', dataKey: 'characters' },
];

<Table fixed data={data} columns={columns} />;
```

## Related

- [`Table` in data-grid package](https://puppetlabs.github.io/design-system/#/Data%20Grid/Table)
