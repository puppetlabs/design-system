### Basic Data Grid

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

<Table data={data} columns={columns} />
```

### Empty State

```jsx 
data=[]

const columns = [
  {
    label: 'Event Type1',
    dataKey: 'eventType',
  },
  { label: 'Affected Devices', dataKey: 'affectedDevices' },

  { label: 'Detections', dataKey: 'detections' },
  { label: 'Linked field', dataKey: 'Link' },
];

<Table data={data} columns={columns} />
```

### Custom Row Styling

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

const rowClassNames = tableData => {
  if (tableData.eventType === 'Virus/Malware') {
    return 'table-row-error table-row-example';
  }
  return 'table-row-okay';
};

<Table data={data} columns={columns} rowClassName={rowClassNames} />
```
### Custom Column Styling

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

const columnClassNames = (dataKey, index) => {
  console.log(dataKey);
  if (dataKey === 'eventType' || index === 3) {
    return 'table-row-error';
  }
  return 'table-row-okay';
};

 <Table data={data} columns={columns} columnClassName={columnClassNames} />

```

### Sortable Columns

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

   class StatefulParent extends React.Component {
      state = { sortDataKey: 'Link', direction: 'desc', data };

      handleOnSort = (newDirection, newDataKey) => {
        // sortFunc will return direction and dataKey on every sort action
        // This information can be used to carryout a sorting logic on your data and rerender the table

        const newArray = _.orderBy(data, [newDataKey], [newDirection]);

        this.setState({
          data: newArray,
          direction: newDirection,
          sortDataKey: newDataKey,
        });
      };

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
            sortable
            onSort={this.handleOnSort}
            sortedColumn={sortedColumn}
          />
        );
      }
    }
    return <StatefulParent />;

```

### Row Count

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

const rowCount = { count: '7', label: 'runs' };

  <div>
      <TableHeader rowCount={{ count: 555 , label: 'Nodes' }} />
      <Table data={data} columns={columns} />
      <TableFooter rowCount={rowCount} />
    </div>
```

### Custom Data Paths

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

<Table data={data2} columns={columns2} />
    
```

### Selection table

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

class StatefulParent extends React.Component {
      state = {
        data,
        checkAll: undefined,
      };

      onRowSelected = (checked, row) => {
        const { data: stateData } = this.state;
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

        this.setState({
          data: updatedData,
        });
      };

      onHeaderSelected = checked => {
        this.setState({ checkAll: checked });
        const { data: stateData } = this.state;

        for (let i = 0; i < stateData.length; i += 1) {
          stateData[i].selected = checked;
        }
      };

      render() {
        const { data: stateData, checkAll: headerCheckboxState } = this.state;

        return (
          <div>
            <Table
              data={stateData}
              columns={columns}
              selectable
              onRowChecked={this.onRowSelected}
              onHeaderChecked={this.onHeaderSelected}
              headerCheckState={headerCheckboxState}
            />
          </div>
        );
      }
    }

    return <StatefulParent />;
    
```

### Pagination table

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

const dataToBePaginated = makeData();

    class StatefulParent extends React.Component {
      state = { CurrentPage: 1 };

      pageSelectFunc = newPage => {
        // sortFunc will return direction and dataKey on every sort action
        // This information can be used to carryout a sorting logic on your data and rerender the table
        const { CurrentPage } = this.state;
        if (typeof newPage === 'number') {
          this.setState({ CurrentPage: newPage });
        } else if (typeof newPage === 'string') {
          if (newPage === 'PreviousPage' && CurrentPage !== 1) {
            this.setState({ CurrentPage: CurrentPage - 1 });
          }
          if (newPage === 'NextPage' && CurrentPage !== 40) {
            this.setState({ CurrentPage: CurrentPage + 1 });
          }
        }
      };

      breakIntoMultiplePages = (originalArray, pageSize) => {
        const arrayOfArrays = [];
        for (let i = 0; i < originalArray.length; i += pageSize) {
          arrayOfArrays.push(originalArray.slice(i, i + pageSize));
        }
        return { arrayOfArrays };
      };

      render() {
        const nodesPerPage = 5;
        const Pages = this.breakIntoMultiplePages(
          dataToBePaginated,
          nodesPerPage,
        );
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
              <Heading
                as="h4"
                color="medium"
                className="story-pagination-footer-text"
              >
                {tableFooterText}
              </Heading>
              <div className="story-pagination-footer-selector">
                <TablePageSelector
                  currentPage={CurrentPage}
                  pageCount={PageCount}
                  onClickHandler={this.pageSelectFunc}
                />
              </div>
            </TableFooter>
          </div>
        );
      }
    }
    return <StatefulParent data={dataToBePaginated} />;

```
