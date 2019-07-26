import React from 'react';
import { storiesOf } from '@storybook/react';
import { Link } from '@puppet/react-components';
import Table from '../src/table/Table';
import TableHeader from '../src/tableHeader/TableHeader';
import TableFooter from '../src/tableFooter/TableFooter';
import TablePageSelector from '../src/tablePageSelector/TablePageSelector';

const data = [
  { id: 1, eventType: 'Virus/Malware', affectedDevices: 20, detections: 634 },
  {
    id: 2,
    eventType: 'Spyware/Grayware',
    affectedDevices: 20,
    detections: 634,
  },
  { eventType: 'URL Filtering', affectedDevices: 15, detections: 598, id: 3 },
  { id: 4, eventType: 'Web Reputation', affectedDevices: 15, detections: 598 },
  { id: 5, eventType: 'Network Virus', affectedDevices: 15, detections: 497 },
  {
    id: 6,
    eventType: 'Application Control',
    affectedDevices: 0,
    detections: 0,
    sorted: 'asc',
  },
  {
    id: 7,
    eventType: 'Application Control',
    affectedDevices: 0,
    detections: 0,
    Link: <Link href="hello world">ghdfhgfdhgfdsgfhjgf</Link>,
  },
];

const columns = [
  { label: 'Event Type1', dataKey: 'eventType', sortable: true },
  { label: 'Affected Devices', dataKey: 'affectedDevices' },
  { label: 'Detections', dataKey: 'detections' },
  { label: 'Linked field', dataKey: 'Link' },
];

const rowCount = { count: '7', label: 'runs' };

const sortFunction = (direction, dataKey) => {
  // sortFunc will return direction and dataKey on every sort action
  // This information can be used to carryout a sorting logic on your data and rerender the table
  console.log(direction, dataKey);
};

const sortedColumn = { direction: 'desc', sortDataKey: 'Link' };

const pageSelectFunc = newPage => {
  // sortFunc will return direction and dataKey on every sort action
  // This information can be used to carryout a sorting logic on your data and rerender the table
  console.log('newPage to be rendered ', newPage);
};
const pageSelect = { count: '61 of 134 nodes -', label: '13 selected' };

storiesOf('Table', module)
  .add('Basic Table', () => <Table data={data} columns={columns} />)
  .add('Empty Table', () => <Table data={[]} columns={columns} />)
  .add('Sortable Table', () => (
    <Table
      data={data}
      columns={columns}
      sortable
      sortFunc={sortFunction}
      sortedColumn={sortedColumn}
    />
  ))
  .add('Row Count ', () => (
    <div>
      <TableHeader rowCount={rowCount} />
      <Table data={data} columns={columns} />
      <TableFooter rowCount={rowCount} />
    </div>
  ))
  .add('SPIKE Horizontal Scroll Table', () => (
    <Table data={data} columns={columns} horizontalSroll />
  ))
  .add('SPIKE Horizontal Scroll Fixed Column', () => (
    <Table data={data} columns={columns} fixedColumn horizontalSroll />
  ))

  .add('Pagination ', () => (
    <div>
      <Table data={data} columns={columns} />
      <TableFooter rowCount={pageSelect} />
      <TablePageSelector
        currentPage={1}
        pageCount={10}
        onClickHandler={pageSelectFunc}
      />
    </div>
  ));

/**
 *
 * disabled arrow
 *
 */

storiesOf('Components', module).add('Table Page Selector', () => (
  <TablePageSelector
    currentPage={8}
    pageCount={10}
    onClickHandler={pageSelectFunc}
    delta={1}
    // disableDescArrow
    // disableAscArrow
  />
));
