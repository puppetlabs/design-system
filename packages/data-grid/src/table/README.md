The Data Grid package was developed to aid in the structuring of data. By using columns and rows, data can be organized and presented informative way. Unlike the basic `Table` component in the react-components library, the data-grid component includes more features to help with more complex presentational tasks and to support user interaction with data.

### Importing

To add the Data Grid package to your library run

```markdown
npm install @puppet/data-grid
```

In your .js file which will be rendering the Data Grid Table component you can reference your node modules instance with the following command:

```markdown
import { Table } from '@puppet/data-grid';
```

In your app level index.scss add the command below to import the Data Grids styles

```markdown
import '~@puppet/data-grid/dist/index';
```

### Basic use

The Data Grid component requires two main props to render properly. The first is the 'data'. This prop accepts an array of objects, each of which typically will contain properties of data to be rendered. Compatible data types include stings, numbers, HTML elements etc. For each object in the array a column will be rendered in the data grid. The second prop is 'columns'. This prop accepts an array of objects, each of which should contain a 'label' and a 'datakey' property. For each object in the array a column will render. The text present at the top of the column will be the string value supplied to the 'label' property for said object. The 'datakey' property should contain a string matching to a property of the provided data objects. This is how each piece of data is matched to an appropriate columns.

```jsx
import { Link } from '@puppet/react-components';
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

<Table data={data} columns={columns} />;
```

### Empty State

In the case where an empty array is provided to the data prop of the table component the table will display in its empty state.

```jsx
data = [];

const columns = [
  {
    label: 'Event Type1',
    dataKey: 'eventType',
  },
  { label: 'Affected Devices', dataKey: 'affectedDevices' },

  { label: 'Detections', dataKey: 'detections' },
  { label: 'Linked field', dataKey: 'Link' },
];

<div>
  <Table.TableHeader rowCountText="0 nodes" />
  <Table data={data} columns={columns} />
</div>;
```

If your table is unpopulated due to a known issue, it might be best to guide an appropriate action the user. To do this use the 'emptyStateHeader' and 'emptyStateMessage' props to pass your helpful string.

```jsx
data = [];

const columns = [
  {
    label: 'Event Type1',
    dataKey: 'eventType',
  },
  { label: 'Affected Devices', dataKey: 'affectedDevices' },

  { label: 'Detections', dataKey: 'detections' },
  { label: 'Linked field', dataKey: 'Link' },
];

const emptyStateHeader = 'Connection Failed';
const emptyStateMessage = 'Reconnect to service';

<div>
  <Table.TableHeader rowCountText="0 nodes" />
  <Table
    data={data}
    columns={columns}
    emptyStateHeader={emptyStateHeader}
    emptyStateMessage={emptyStateMessage}
  />
</div>;
```

### Loading State

In the case where a query is in progress you may need to have the table in a loading state. You can trigger this loading state by adding a Boolean value to the loading prop. You can also customize the message displayed to the user by passing your own string into the loadingMessage prop by default this will be "Loading".

```jsx
import { Link } from '@puppet/react-components';
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

<Table data={data} columns={columns} loading={true} />;
```

### Custom Row Styling

Should the need arise where you have to add styling to the table rows. The best practice is to use the 'rowClassNames' prop to assign a css classname each row. Should you need to carry out conditional styling a function can be supplied.

```css
.table-row-error {
  background: $puppet-r300;
}

.table-row-okay {
  background: $puppet-g200;
}
```

```jsx
import { Link } from '@puppet/react-components';
import './README.scss';

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

const rowClassNames = data => {
  if (data.eventType === 'Virus/Malware') {
    return 'table-row-error table-row-example';
  }
  return 'table-row-okay';
};

<Table data={data} columns={columns} rowClassName={rowClassNames} />;
```

### Custom Column Styling

Should the need arise where you have to add styling to the table column. The best practice is to use the 'className' prop to assign a css classname each td with the same column ID. Should you need to carry out conditional styling a function can be supplied.

```jsx
import { Link } from '@puppet/react-components';
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

const columnClassNames = (dataKey, index) => {
  if (dataKey === 'eventType' || index === 3) {
    return 'table-row-error';
  }
  return 'table-row-okay';
};

const columns = [
  {
    label: 'Event Type1',
    dataKey: 'eventType',
    className: (dataKey, index) => columnClassNames(dataKey, index),
  },
  {
    label: 'Affected Devices',
    dataKey: 'affectedDevices',
    className: (dataKey, index) => columnClassNames(dataKey, index),
  },

  {
    label: 'Detections',
    dataKey: 'detections',
    className: (dataKey, index) => columnClassNames(dataKey, index),
  },
  {
    label: 'Linked field',
    dataKey: 'Link',
    className: (dataKey, index) => columnClassNames(dataKey, index),
  },
];

<Table data={data} columns={columns} />;
```

### Sortable Columns

Built into the data grid component is the ability to render ascending and descending arrows on the top of every column. To do this declare a column to be and render the arrows by passing the 'sortable' prop to the columns of your choice. Should you wish to render the table with a preselected arrow, the 'sortedColumn' prop can be passed an object. The object should contain a 'direction' property with either an 'asc' or 'desc' string value and a sortDataKey property. When an arrow is clicked an onSort event is fired, this will return the direction of the arrow clicked and the appropriate column datakey. It is necessary to handle this action and update the sortColumn props object as well as the tables data object.

```jsx
import { Link } from '@puppet/react-components';
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
    sortable: true,
  },
  { label: 'Affected Devices', dataKey: 'affectedDevices', sortable: true },

  { label: 'Detections', dataKey: 'detections', sortable: true },
  { label: 'Linked field', dataKey: 'Link' },
];

class StatefulParent extends React.Component {
  constructor() {
    super();
    this.state = { sortDataKey: 'eventType', direction: 'desc', data };
    this.handleOnSort = this.handleOnSort.bind(this);
  }

  handleOnSort(newDirection, newDataKey) {
    // sortFunc will return direction and dataKey on every sort action
    // This information can be used to carryout a sorting logic on your data and re-render the table

    const newArray = _.orderBy(data, [newDataKey], [newDirection]);

    this.setState({
      data: newArray,
      direction: newDirection,
      sortDataKey: newDataKey,
    });
  }

  render() {
    const { data: stateData, sortDataKey, direction } = this.state;
    const sortedColumn = {
      direction,
      sortDataKey,
    };

    return (
      <Table
        data={stateData}
        columns={columns}
        onSort={this.handleOnSort}
        sortedColumn={sortedColumn}
      />
    );
  }
}
<StatefulParent />;
```

### Row Count

To render a basic count and text header or footer a string containing a count and label can be provided to the 'rowCount' prop. If the 'rowCount' prop doesn't suit the needs of your project HTML can be passed as a child to the header and footer components.

```jsx
import TableHeader from '../tableHeader/TableHeader';
import TableFooter from '../tableFooter/TableFooter';
import { Link } from '@puppet/react-components';

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

const rowCount = '7 runs';

<div>
  <Table.TableHeader rowCountText="555 nodes" />
  <Table data={data} columns={columns} />
  <Table.TableFooter rowCountText={rowCount} />
</div>;
```

### Custom Data Paths

When possible, it is best for a user to not have to process their data before supplying it to the data grid component. Therefore data paths can be supplied to the table column component to pull information out of your nested data objects.

```jsx
const data2 = [
  {
    eventType: 'Virus/Malware',
    eventResults: { affectedDevices: 20, detections: 600, unique: 40 },
  },
];

const columns2 = [
  {
    label: 'Event Type1',
    dataKey: 'eventType',
  },
  {
    label: 'Affected Devices',
    dataKey: 'eventResults.affectedDevices',
  },
  { label: 'Detections', dataKey: 'eventResults.detections' },
  { label: 'Linked field', dataKey: 'eventResults.unique' },
];

<Table data={data2} columns={columns2} />;
```

### Selection column

Should your data grid component support a user action within your project then the selectable feature can be used. By passing the 'selectable' prop a column of checkboxes will appear. If the 'selected' property is passed to your data objects, then the checkboxes will render checked. When a user clicks a rows checkbox an 'onUpdateData' is fired and the updated data will be returned.

```jsx
import { Link } from '@puppet/react-components';

const data = [
  {
    eventType: 'Application Control',
    affectedDevices: 0,
    detections: 1000,
    sorted: 'asc',
    Link: <Link href="https://puppet.com/">Help to fix</Link>,
    unique: 6,
    selectable: false,
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
    disabled: true
  },
  {
    eventType: 'URL Filtering',
    affectedDevices: 16,
    detections: 599,
    Link: <Link href="https://puppet.com/">Help to fix</Link>,
    unique: 3,
    disabled: true,
    selectable: true,
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

class StatefulParent extends React.Component {
  constructor() {
    super();
    this.state = {
      data,
      checkAll: false,
      IndeterminateState: false,
    };
    this.onHeaderSelected = this.onHeaderSelected.bind(this);
    this.onRowSelected = this.onRowSelected.bind(this);
  }

  checkIfIndeterminateState(state) {
    const { data, IndeterminateState, checkAll } = this.state;
    let x = data.filter(e => e.selected === true);

    if (x.length > 0 && IndeterminateState === false && checkAll === false) {
      this.setState({ IndeterminateState: true });
    } else if (
      (x.length === 0 && IndeterminateState === true) ||
      (x.length === 0 && checkAll === true)
    ) {
      this.setState({ IndeterminateState: false, checkAll: false });
    }
    if (x.length === data.length && checkAll === false) {
      this.setState({ IndeterminateState: false, checkAll: true });
    }
  }

  onHeaderSelected(checked) {
    const { data: stateData, IndeterminateState } = this.state;

    this.setState({ IndeterminateState: false, checkAll: checked });

    for (let i = 0; i < stateData.length; i += 1) {
      stateData[i].selected = checked;
    }
  }

  onRowSelected(checked, row) {
    const { data: stateData, checkAll } = this.state;

    if (checkAll) {
      this.setState({ checkAll: false });
    }

    // find the index of object from array that you want to update
    const objIndex = stateData.findIndex(obj => obj.unique === row.unique);

    // make new object of updated object.
    const updatedObj = { ...stateData[objIndex], selected: checked };

    // make final new array of objects by combining updated object.
    const updatedData = [
      ...stateData.slice(0, objIndex),
      updatedObj,
      ...stateData.slice(objIndex + 1),
    ];

    this.checkIfIndeterminateState(),
      this.setState({
        data: updatedData,
      });
  }

  render() {
    const {
      data: stateData,
      checkAll: headerCheckboxState,
      IndeterminateState,
    } = this.state;

    this.checkIfIndeterminateState();

    return (
      <div>
        <Table
          data={stateData}
          columns={columns}
          selectable
          onRowChecked={this.onRowSelected}
          onHeaderChecked={this.onHeaderSelected}
          headerCheckState={headerCheckboxState}
          headerIndeterminateState={IndeterminateState}
          checkIfIndeterminateState={this.checkIfIndeterminateState}
        />
      </div>
    );
  }
}
<StatefulParent />;
```

### Pagination table

Pagination is a simple navigation method that lets you split a huge amount of content within your data grid into smaller parts. The splitting up of data helps the user from becoming overwhelmed in information and to help the performance of the browser. The data grid does not paginate the data itself but provides the means to display your paginated data. Your server will need to provide you with broken down data, that data's page number, the total number of pages and the number of rows on each page. With this information a paginated table can be created like the example below.

```jsx
import { Link, Heading } from '@puppet/react-components';
import makeData from './utils.jsx';
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
        <TableFooter>
          <TablePageSelector
            paginationCountText={tableFooterText}
            currentPage={CurrentPage}
            pageCount={PageCount}
            updatePage={this.pageSelectFunc}
          />
        </TableFooter>
      </div>
    );
  }
}
<StatefulParent data={dataToBePaginated} />;
```

### Handling Boolean's, Null and Undefined

Currently the Data Grid component will not render any text when a boolean value is given. To enable your table to render true or false simply provide you column with a cell render function. Null and Undefined are special as they represent an empty data set. Take the example below, a host my not have a reporting feature, therefore blank is the appropriate value however a custom string could also be used.

```jsx
import { Link } from '@puppet/react-components';
const data = [
  {
    eventType: 'yr32gi0sgipl4gs.delivery.puppetlabs.net',
    reportCompleted: true,
  },
  {
    eventType: 'hycvrb16yqoldoe.delivery.puppetlabs.net',
    reportCompleted: false,
  },
  {
    eventType: 'hycvrbppsp6dve.delivery.puppetlabs.net',
    reportCompleted: null,
  },
  {
    eventType: 'hycvrkjdhjfp6dve.delivery.puppetlabs.net',
    reportCompleted: undefined,
  },
  {
    eventType: 'rb16yssp6dwwve.delivery.puppetlabs.net',
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
      // '== null' catches both null and undefined values
      if (cellData == null) {
        // returning nothing will mean a blank cell
        // or you could return a string
        // return 'No reporting possible'
        return;
      } else {
        return cellData.toString();
      }
    },
  },
];

<Table data={data} columns={columns} />;
```

### Selection and Pagination

Once we start adding multiple patterns together it is very easy to start confusing the end user. Thats why in the data grid when selecting and paginating together we treat each page header click as page specific and use additional badges in the header for cross pagination selecting and clearing. It's important to remember that a column header checkbox is used to show the state of the page visible. Intermediate and check all states on one page should not be shown on the next.

```jsx
import { Link, Heading } from '@puppet/react-components';
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

class StatefulParent extends React.Component {
  constructor() {
    super();
    this.state = { CurrentPage: 1, checkAll: false, data, indeterminateState: false, showSelectAllBadge: false, Pages: {arrayOfArrays: []}, nodesPerPage: 5 };
    this.pageSelectFunc = this.pageSelectFunc.bind(this);
    this.breakIntoMultiplePages = this.breakIntoMultiplePages.bind(this);
    this.onRowSelected = this.onRowSelected.bind(this);
    this.onHeaderSelected = this.onHeaderSelected.bind(this);
    this.onSelectAllBadgeClick = this.onSelectAllBadgeClick.bind(this);
    this.onClearAllBadgeClick = this.onClearAllBadgeClick.bind(this);
  }

  componentWillMount() {
    const dataToPages =  this.breakIntoMultiplePages(data, 5)
    this.setState({Pages: dataToPages})
  }

  pageSelectFunc(newPage) {
    const { CurrentPage, Pages } = this.state;
    this.checkIfIndeterminateState(Pages)
    this.setState({ CurrentPage: newPage });
  }

  breakIntoMultiplePages(originalArray, pageSize) {
    const arrayOfArrays = [];
    for (let i = 0; i < originalArray.length; i += pageSize) {
      arrayOfArrays.push(originalArray.slice(i, i + pageSize));
    }
    return { arrayOfArrays };
  }

  checkIfIndeterminateState(Pages) {
    const { data, indeterminateState, checkAll, CurrentPage  } = this.state;

    let selectedOnCurrentPage = Pages.arrayOfArrays[CurrentPage -1].filter(e => e.selected === true);
    let currentPageLength = Pages.arrayOfArrays[CurrentPage -1].length

    if (selectedOnCurrentPage.length > 0 && indeterminateState === false && checkAll === false) {
      this.setState({ indeterminateState: true });
    } else if (
      (selectedOnCurrentPage.length === 0 && indeterminateState === true) ||
      (selectedOnCurrentPage.length === 0 && checkAll === true)
    ) {
      this.setState({ indeterminateState: false, checkAll: false });
    }
    if (selectedOnCurrentPage.length === currentPageLength && checkAll === false) {
      this.setState({ indeterminateState: false, checkAll: true });
    }
  }

  onHeaderSelected(checked) {
    const { data: stateData, indeterminateState, show, showSelectAllBadge, CurrentPage, Pages } = this.state;

    this.setState({ indeterminateState: false, checkAll: checked });

    const x = Pages.arrayOfArrays[CurrentPage - 1]
    let newObj = stateData;

    x.forEach((row) => {
      const y = stateData.findIndex((stateRow) => stateRow.unique === row.unique )
      const updatedObj = { ...stateData[y], selected: checked };
      newObj.splice(y,1, updatedObj);
    })

    this.setState({data: newObj})

  }


  onRowSelected(checked, row) {
    const { data: stateData, checkAll, Pages } = this.state;

    if (checkAll) {
      this.setState({ checkAll: false });
    }
    // find the index of object from array that you want to update
    const objIndex = stateData.findIndex(obj => obj.unique === row.unique);
    // make new object of updated object.
    const updatedObj = { ...stateData[objIndex], selected: checked };
    // make final new array of objects by combining updated object.
    const updatedData = [
      ...stateData.slice(0, objIndex),
      updatedObj,
      ...stateData.slice(objIndex + 1),
    ];

    this.checkIfIndeterminateState(Pages)

    this.setState({ data: updatedData });
  }

  onSelectAllBadgeClick(){
    const { data } = this.state;
    const x = data
    for (let i = 0; i < x.length; i += 1) {
      x[i].selected = true;
    }
    this.setState({data: x})
  }

  onClearAllBadgeClick(){
    const { data } = this.state;
    const x = data
    for (let i = 0; i < x.length; i += 1) {
      x[i].selected = false;
    }
    this.setState({data: x})
  }

  render() {
    const {
      CurrentPage,
      data:stateData,
      indeterminateState,
      checkAll: headerCheckboxState,
      nodesPerPage
      } = this.state;

    const Pages = this.breakIntoMultiplePages(stateData, 5)
    const PageLength = Pages.arrayOfArrays[CurrentPage -1].length
    const PageCount = Pages.arrayOfArrays.length;
    const renderPages = CurrentPage - 1;
    const currentNode = `${nodesPerPage * CurrentPage}`;
    const tableFooterText = `${currentNode -
      PageLength +
      1} - ${currentNode} of ${stateData.length} nodes`;
    const selectAllBadgeText = `Select all ${stateData.length} nodes`

    this.checkIfIndeterminateState(Pages);
    const selectedCount = stateData.filter(obj => obj.selected === true).length

    let rowCountText = `${stateData.length} nodes`
    if( selectedCount > 0 ){
      rowCountText = `${selectedCount} of ${stateData.length} nodes selected`
    }

    return (
      <div>
      <Table.TableHeader
      showSelectAllBadge={selectedCount > 0 && selectedCount !== stateData.length }
      rowCountText={rowCountText}
      onSelectAllBadgeClick={this.onSelectAllBadgeClick}
      showClearAllBadge={selectedCount === stateData.length}
      onClearAllBadgeClick={this.onClearAllBadgeClick}
      selectAllBadgeText={selectAllBadgeText}/>
        <Table
        data={Pages.arrayOfArrays[renderPages]}
        columns={columns}
        selectable
        onRowChecked={this.onRowSelected}
        headerIndeterminateState={indeterminateState}
        checkIfIndeterminateState={this.checkIfIndeterminateState}
        headerCheckState={headerCheckboxState}
        onHeaderChecked={this.onHeaderSelected}
        />
        <TableFooter>
          <TablePageSelector
            paginationCountText={tableFooterText}
            currentPage={CurrentPage}
            pageCount={PageCount}
            updatePage={ this.pageSelectFunc}
          />
        </TableFooter>
      </div>
    );
  }
}
<StatefulParent/>;
```
