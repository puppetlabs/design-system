The Data Grid package was developed to aid in the structuring of data. By using columns and rows, data can be orginized and presented informative way. Unlike the basic `Table` component in the react-components libary, the data-grid component includes more features to help with more complex presentational tasks and to support user interaction with data.

### Importing 
To add the Data Grid package to your libary run 

**npm install @puppet/Data-Grid**

In your .js file which will be rendering the Data Grid Table component you can reference your node modules instance with the following command:

**import { Table } from '@puppet/data-grid';**

In your app level index.scss add the command below to import the Data Grids styles

**@import '~@puppet/data-grid/dist/index';**

### Basic use

The Data Grid component requires two main props to render properly. The first is the 'data'. This prop accepts an array of objects, each of which typically will contain properties of data to be rendered. Compatible data types include stings, numbers, html elements etc. For each object in the array a column will be rendered in the data grid. The second prop is 'columns'. This prop accepts an array of objects, each of which should contain a 'label' and a 'datakey' property. For each object in the array a column will render. The text present at the top of the column will be the string value supplied to the 'label' property for said object. The 'datakey' property should contain a string matching to a property of the provided data objects. This is how each piece of data is matched to an appropriate columns.  


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

In the case where an empty array is provied to the data prop of the table component the table will display in its empty state. 

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
If your table is unpopulated due to a known issue, it might be best to guide an approprate action the user. To do this use the 'emptyStateHeader' and 'emptyStateMessage' props to pass your helpful string.  

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

const emptyStateHeader = 'Connection Failed';
const emptyStateMessage = 'Reconnect to survise';

<Table data={data} columns={columns} emptyStateHeader={emptyStateHeader} emptyStateMessage={emptyStateMessage} />
```

### Custom Row Styling

Should the need arise where you have to add styling to the table rows. The best practise is to use the 'rowClassNames' prop to assign a css classname each row. Should you need to carry out conditional styling a function can be supplied.  

```css
.table-row-error{
  background: $puppet-r300;
}

.table-row-okay{
  background: $puppet-g200;
}
```
```jsx 
import { Link } from '@puppet/react-components';
import "./README.scss"

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

Should the need arise where you have to add styling to the table column. The best practise is to use the 'columnClassName' prop to assign a css classname each td with the same column ID. Should you need to carry out conditional styling a function can be supplied.  

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

Built into the data grid component is the ablility to render ascending and descending arrows on the top of every column. To do this declare the table as a sortable table and render the arrows by passing the 'sortable' prop. Should you wish to render the table with a preselected arrow, the 'sortedColumn' prop can be passed an object. The object should contain a 'direction' property with either an 'asc' or 'desc' string value and a sortDataKey property. When an arrow is clicked an onSort event is fired, this will return the direction of the arrow clicked and the appropraite column datakey. It is necessary to handle this action and update the sortColumn props object as well as the tables data object.     

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
      constructor() {
    super()
    this.state = { sortDataKey: 'Link', direction: 'desc', data };
    this.handleOnSort = this.handleOnSort.bind(this);
      }
     
      handleOnSort(newDirection, newDataKey) {
        // sortFunc will return direction and dataKey on every sort action
        // This information can be used to carryout a sorting logic on your data and rerender the table

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
            sortable
            onSort={this.handleOnSort}
            sortedColumn={sortedColumn}
          />
        );
      }
    };
     <StatefulParent />;

```

### Row Count

To render a basic count and text header or footer an object containing a count and label can be provided to the 'rowCount' prop. If the 'rowCount' prop doesn't suit the needs of your project html can be passed as a child to the header and footer components.

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
      <Table.TableHeader rowCount={{ count: 555 , label: 'Nodes' }} />
      <Table data={data} columns={columns} />
      <Table.TableFooter rowCount={rowCount} />
    </div>
```

### Custom Data Paths

When possible it is best for a user not to have to process there data before supplying it to the data grid component. Therefore data paths can be supplied to the table column component to pull information out of your nested data objects.

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

### Selection column

Should your data grid component support an users action within your project then the selectable feature can be used. By passing the 'selectable' prop a column of checkboxes will appear. If the 'selected' property is passed to your data objects then the checkboxes will render checked. When a user clicks a rows checkbox an 'onRowSelected' is fired and the checked value and the row which was clicked is returned. When a user clicks the headers checkbox an 'onHeaderSelected' is fired and the checked value is returned. To control the state of the headers checkbox use the 'headerCheckState' prop.

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

 constructor() {
    super()
    this.state = { data, checkAll: undefined, };
    this.onHeaderSelected = this.onHeaderSelected.bind(this);
    this.onRowSelected = this.onRowSelected.bind(this);
      }


      onRowSelected(checked, row) {
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

      onHeaderSelected(checked) {
        console.log('clicked header')
        this.setState({ checkAll: checked });
        const { data: stateData } = this.state;
        console.log(data)

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
    };
    <StatefulParent />;
    
```

### Pagination table

Pagination is a simple navigation method that lets you split a huge amount of content within your data grid into smaller parts. The spliting up of data helps the user from becoming overwhelmed in information and to help the performance of the browser. The data grid does not paginate the data itself but provides the means to display your paginated data. Your server will need to provide you with broken down data, that data's page number, the total number of pages and the number of rows on each page. With this information a paginated table can be created like the example below.

```jsx 
import { Link, Heading } from '@puppet/react-components';
import  makeData  from './utils.jsx';
import {TablePageSelector, TableFooter} from '../index';
// import TableFooter from '../index';

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
       super()
        this.state = { CurrentPage: 1 };
        this.pageSelectFunc = this.pageSelectFunc.bind(this);
        this.breakIntoMultiplePages = this.breakIntoMultiplePages.bind(this);
      }

      pageSelectFunc(newPage) {
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

      breakIntoMultiplePages(originalArray, pageSize) {
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
    };
     <StatefulParent data={dataToBePaginated} />;

```

### Handling Boolean's, Null and Undefined

Currently the Data Grid component will not render any text when a boolean value is given. To enable your table to render true or false simply provide you column with a cell render function. Null and Undefined are special as they represent an empty data set. Take the example below, a host my not have a reporting feature, therefore blank is the approprate value however a custom string could also be used.   


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
  }
];

const columns = [
  {
    label: 'Host',
    dataKey: 'eventType',
  },
  { label: 'Report Has Completed', dataKey: 'reportCompleted',  cellRenderer: ({ cellData }) => {
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
  }
];

<Table data={data} columns={columns} />
```