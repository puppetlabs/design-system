import React from 'react';
import { storiesOf } from '@storybook/react';
import { Link, Heading } from '@puppet/react-components';
import _ from 'lodash';
import Table from '../src/table/Table';
import TableHeader from '../src/tableHeader/TableHeader';
import TableFooter from '../src/tableFooter/TableFooter';
import TablePageSelector from '../src/tablePageSelector/TablePageSelector';
import readme from './table.md';
// eslint-disable-next-line
import  makeData  from './utils.jsx';
import './stories.scss';

const data = [
  {
    eventType: 'Application Control',
    affectedDevices: 0,
    detections: 1000,
    sorted: 'asc',
    unique: 6,
  },
  {
    eventType: 'Virus/Malware',
    affectedDevices: 20,
    detections: 634,
    unique: 1,
    selected: true,
  },
  {
    eventType: 'Spyware/Grayware',
    affectedDevices: 20,
    detections: 634,
    unique: 2,
  },
  {
    eventType: 'URL Filtering',
    affectedDevices: 16,
    detections: 599,
    unique: 3,
  },
  {
    eventType: 'Web Reputation',
    affectedDevices: 15,
    detections: 598,
    unique: 4,
  },
  {
    eventType: 'Network Virus',
    affectedDevices: 15,
    detections: 497,
    unique: 5,
  },

  {
    eventType: 'Application Controls',
    affectedDevices: 0,
    detections: 0,
    Link: <Link href="hello world">ghdfhgfdhgfdsgfhjgf</Link>,
    unique: 7,
  },
];

const data2 = [
  {
    eventType: 'Virus/Malware',
    eventResults: { affectedDevices: 20, detections: 600, unique: 40 },
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

const rowCount = { count: '7', label: 'runs' };

const pageSelectFunc = newPage => {
  // sortFunc will return direction and dataKey on every sort action
  // This information can be used to carryout a sorting logic on your data and rerender the table
  console.log('newPage to be rendered ', newPage);
};

const rowClassNames = tableData => {
  // console.log(tableData);
  if (tableData.eventType === 'Virus/Malware') {
    return 'table-row-error table-row-example';
  }
  return 'table-row-okay';
};

const columnClassNames = (dataKey, index) => {
  console.log(dataKey);
  if (dataKey === 'eventType' || index === 3) {
    return 'table-row-error';
  }
  return 'table-row-okay';
};

storiesOf('Table', module)
  .add('Basic Table', () => <Table data={data} columns={columns} />, {
    notes: { markdown: readme },
  })

  .add('Empty Table', () => <Table data={[]} columns={columns} />)
  .add('Custom Row Styling Table', () => (
    <Table data={data} columns={columns} rowClassName={rowClassNames} />
  ))
  .add('Custom Column Styling Table', () => (
    <Table data={data} columns={columns} columnClassName={columnClassNames} />
  ))
  .add('Sortable Table', () => {
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
  })
  .add('Row Count ', () => (
    <div>
      <TableHeader rowCount={{ count: 555 }} />
      <Table data={data} columns={columns} />
      <TableFooter rowCount={rowCount} />
    </div>
  ))

  .add('Pagination ', () => {
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
  })
  .add('Custom data root paths ', () => (
    <div>
      <Table data={data2} columns={columns2} />
    </div>
  ))
  .add('Selection table ', () => {
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
  });

storiesOf('Components', module)
  .add('Table Page Selector', () => (
    <TablePageSelector
      currentPage={8}
      pageCount={10}
      onClickHandler={pageSelectFunc}
      delta={1}
    />
  ))
  .add('Table Page Navigation', () => (
    <TablePageSelector
      onClickHandler={pageSelectFunc}
      disableDescArrow
      disableAscArrow
    />
  ));

storiesOf('SPIKES DO NOT USE', module)
  .add('SPIKE Horizontal Scroll Table', () => (
    <Table data={data} columns={columns} horizontalSroll />
  ))
  .add('SPIKE Horizontal Scroll Fixed Column', () => (
    <Table data={data} columns={columns} fixedColumn horizontalSroll />
  ));
