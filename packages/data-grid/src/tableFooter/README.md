### Custom Footer

In its simplest form the table footer is a container like component that ensures all its children are contained within an approprate demension of the datagrid

```jsx
import Table from '../table/Table.jsx';
const data = [
  {
    eventType: 'Task',
    reportCompleted: true,
  },
  {
    eventType: 'Task',
    reportCompleted: false,
  },
  {
    eventType: 'Task',
    reportCompleted: true,
  },
  {
    eventType: 'Plan',
    reportCompleted: false,
  },
  {
    eventType: 'Plan',
    reportCompleted: true,
  },
];

const columns = [
  {
    label: 'Host',
    dataKey: 'eventType',
  },
  {
    label: 'Report Has Completed',
    dataKey: 'reportCompleted',
    cellRenderer: ({ cellData }) => {
      return cellData.toString();
    },
  },
];
const filters = [
  {
    fieldLabel: 'Event Type',
    field: 'eventType',
    options: [
      {
        value: 'Task',
        icon: 'build',
        label: 'Task',
      },
      {
        value: 'Plan',
        icon: 'clipboard',
        label: 'Plan',
      },
    ],
  },
  {
    fieldLabel: 'Report Completed',
    field: 'reportCompleted',
    options: [
      {
        value: true,
        icon: 'pencil',
        label: 'True',
      },
      {
        value: false,
        icon: 'send',
        label: 'False',
      },
    ],
  },
];
<div>
  <Table data={data} columns={columns} />
  <Table.TableFooter rowCountText={'5 reports'} />
</div>;
```

### Pagination

Pagination is a simple navigation method that lets you split a huge amount of content within your data grid into smaller parts. The splitting up of data helps the user from becoming overwhelmed in information and to help the performance of the browser. The data grid does not paginate the data itself but provides the means to display your paginated data. Your server will need to provide you with broken down data, that data's page number, the total number of pages and the number of rows on each page. With this information a paginated table can be created like the example below.

```jsx
import Table from '../table/Table.jsx';
import { Link, Heading } from '@puppet/react-components';
import makeData from './../table/utils.jsx';
import { TablePageSelector, TableFooter } from '../index';

const data = [
  {
    eventType: 'Application Control',
    affectedDevices: 0,
    detections: 1000,
    sorted: 'asc',
    Link: <Link href="https://puppet.com/">Help to fix</Link>,
    unique: 6,
  },
  {
    eventType: 'Virus/Malware',
    affectedDevices: 20,
    detections: 634,
    unique: 1,
    Link: <Link href="https://puppet.com/">Help to fix</Link>,
    selected: true,
  },
  {
    eventType: 'Spyware/Grayware',
    affectedDevices: 20,
    detections: 634,
    Link: <Link href="https://puppet.com/">Help to fix</Link>,
    unique: 2,
  },
  {
    eventType: 'URL Filtering',
    affectedDevices: 16,
    detections: 599,
    Link: <Link href="https://puppet.com/">Help to fix</Link>,
    unique: 3,
  },
  {
    eventType: 'Web Reputation',
    affectedDevices: 15,
    detections: 598,
    Link: <Link href="https://puppet.com/">Help to fix</Link>,
    unique: 4,
  },
  {
    eventType: 'Network Virus',
    affectedDevices: 15,
    detections: 497,
    Link: <Link href="https://puppet.com/">Help to fix</Link>,
    unique: 5,
  },

  {
    eventType: 'Application Controls',
    affectedDevices: 0,
    detections: 0,
    Link: <Link href="https://puppet.com/">Help to fix</Link>,
    unique: 7,
  },
];

const columns = [
  {
    label: 'Event Type1',
    dataKey: 'eventType',
  },
  { label: 'Affected Devices', dataKey: 'affectedDevices' },

  { label: 'Detections', dataKey: 'detections' },
  { label: 'Linked field', dataKey: 'Link' },
];

const dataToBePaginated = makeData();

class StatefulParent extends React.Component {
  constructor() {
    super();
    this.state = { CurrentPage: 1 };
    this.pageSelectFunc = this.pageSelectFunc.bind(this);
    this.breakIntoMultiplePages = this.breakIntoMultiplePages.bind(this);
  }

  pageSelectFunc(newPage) {
    const { CurrentPage } = this.state;
    this.setState({ CurrentPage: newPage });
  }

  breakIntoMultiplePages(originalArray, pageSize) {
    const arrayOfArrays = [];
    for (let i = 0; i < originalArray.length; i += pageSize) {
      arrayOfArrays.push(originalArray.slice(i, i + pageSize));
    }
    return { arrayOfArrays };
  }

  render() {
    const nodesPerPage = 5;
    const Pages = this.breakIntoMultiplePages(dataToBePaginated, nodesPerPage);
    const PageCount = Pages.arrayOfArrays.length;
    const { CurrentPage } = this.state;
    const renderPages = CurrentPage - 1;
    const currentNode = `${nodesPerPage * CurrentPage}`;
    const tableFooterText = `${currentNode -
      nodesPerPage +
      1} - ${currentNode} of ${dataToBePaginated.length} nodes`;

    return (
      <div>
        <Table data={Pages.arrayOfArrays[renderPages]} columns={columns} />
        <TableFooter
          PageSelector
          rowCountText={tableFooterText}
          currentPage={CurrentPage}
          pageCount={PageCount}
          updatePage={this.pageSelectFunc}
        ></TableFooter>
      </div>
    );
  }
}
<StatefulParent data={dataToBePaginated} />;
```

### Advanced Pagination

Advanced pagination allows the user to edit how many rows appear on each page. This is done by adding a dropdown within the table footer that can be used to select the desired number of rows.

```jsx
import Table from '../table/Table.jsx';
import { Link, Heading } from '@puppet/react-components';
import makeData from './../table/utils.jsx';
import { TablePageSelector, TableFooter } from '../index';

const data = [
  {
    eventType: 'Application Control',
    affectedDevices: 0,
    detections: 1000,
    sorted: 'asc',
    Link: <Link href="https://puppet.com/">Help to fix</Link>,
    unique: 6,
  },
  {
    eventType: 'Virus/Malware',
    affectedDevices: 20,
    detections: 634,
    unique: 1,
    Link: <Link href="https://puppet.com/">Help to fix</Link>,
    selected: true,
  },
  {
    eventType: 'Spyware/Grayware',
    affectedDevices: 20,
    detections: 634,
    Link: <Link href="https://puppet.com/">Help to fix</Link>,
    unique: 2,
  },
  {
    eventType: 'URL Filtering',
    affectedDevices: 16,
    detections: 599,
    Link: <Link href="https://puppet.com/">Help to fix</Link>,
    unique: 3,
  },
  {
    eventType: 'Web Reputation',
    affectedDevices: 15,
    detections: 598,
    Link: <Link href="https://puppet.com/">Help to fix</Link>,
    unique: 4,
  },
  {
    eventType: 'Network Virus',
    affectedDevices: 15,
    detections: 497,
    Link: <Link href="https://puppet.com/">Help to fix</Link>,
    unique: 5,
  },

  {
    eventType: 'Application Controls',
    affectedDevices: 0,
    detections: 0,
    Link: <Link href="https://puppet.com/">Help to fix</Link>,
    unique: 7,
  },
];

const columns = [
  {
    label: 'Event Type1',
    dataKey: 'eventType',
  },
  { label: 'Affected Devices', dataKey: 'affectedDevices' },

  { label: 'Detections', dataKey: 'detections' },
  { label: 'Linked field', dataKey: 'Link' },
];

const dataToBePaginated = makeData();

class StatefulParent extends React.Component {
  constructor() {
    super();
    this.state = { CurrentPage: 1, CurrentNuOfRows: 10 };
    this.pageSelectFunc = this.pageSelectFunc.bind(this);
    this.breakIntoMultiplePages = this.breakIntoMultiplePages.bind(this);
    this.nuOfRowsFunc = this.nuOfRowsFunc.bind(this);
  }

  pageSelectFunc(newPage) {
    const { CurrentPage } = this.state;
    this.setState({ CurrentPage: newPage });
  }

  breakIntoMultiplePages(originalArray, pageSize) {
    const arrayOfArrays = [];
    for (let i = 0; i < originalArray.length; i += pageSize) {
      arrayOfArrays.push(originalArray.slice(i, i + pageSize));
    }
    return { arrayOfArrays };
  }

  nuOfRowsFunc(newTotal) {
    this.setState({ CurrentNuOfRows: newTotal });
  }

  render() {
    const { CurrentPage, CurrentNuOfRows } = this.state;
    const Pages = this.breakIntoMultiplePages(
      dataToBePaginated,
      CurrentNuOfRows,
    );
    const PageCount = Pages.arrayOfArrays.length;

    const renderPages = CurrentPage - 1;
    const currentNode = `${CurrentNuOfRows * CurrentPage}`;
    const tableFooterText = `${currentNode -
      CurrentNuOfRows +
      1} - ${currentNode} of ${dataToBePaginated.length} nodes`;

    return (
      <div>
        <Table data={Pages.arrayOfArrays[renderPages]} columns={columns} />
        <TableFooter
          PageSelector
          rowCountText={tableFooterText}
          currentPage={CurrentPage}
          pageCount={PageCount}
          updatePage={this.pageSelectFunc}
          rowsPerPage
          onRowPerPageSelect={this.nuOfRowsFunc}
          rowsPerPageValue={CurrentNuOfRows}
        ></TableFooter>
      </div>
    );
  }
}
<StatefulParent data={dataToBePaginated} />;
```
