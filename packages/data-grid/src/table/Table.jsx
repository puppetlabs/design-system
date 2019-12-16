import React, { Component } from 'react';
import {
  arrayOf,
  shape,
  func,
  any,
  string,
  node,
  bool,
  oneOfType,
} from 'prop-types';
import classNames from 'classnames';
import { get } from 'lodash';
import { Heading, Checkbox, Text } from '@puppet/react-components';

import ColumnHeader from './ColumnHeader';
import TableHeader from '../tableHeader/TableHeader';
import TableFooter from '../tableFooter/TableFooter';

import './Table.scss';

const propTypes = {
  /** Table data. Must be an array of objects */
  data: arrayOf(shape({})),
  /** Array of column specifications */
  columns: arrayOf(
    shape({
      /** Optional cell data getter method. By default it will grab data at the provided dataKey */
      cellDataGetter: func,
      /** Optional cell renderer method. */
      cellRenderer: func,
      /** Arbitrary additional data passed to the cell renderer for this column */
      columnData: any,
      /** Unique string key defining this column */
      dataKey: string.isRequired,
      /** Label for column header text */
      label: node,
      /** Optional feature to make column sortrable */
      sortable: bool,
      /** Optional classname that can be a string or a function taking the dataKey and column index which can be used to render styling on specific column */
      className: oneOfType([func, string]),
      /** Styling for column header text */
      style: shape({}),
    }),
  ).isRequired,
  /** Provides a unique key for each table row. */
  rowKey: oneOfType([func, string]),
  /** Optional function which can be used to render styling on specific rows */
  rowClassName: oneOfType([func, string]),
  /** Render table in fixed-layout mode */
  fixed: bool,
  /** Optional additional table className */
  className: string,
  /** Optional object to decribe the current sorting state for styling */
  sortedColumn: shape({
    /** Descibes sort direction in either asc or desc */
    direction: string,
    /** Descibes the column being sorted using the column dataKey  */
    sortDataKey: string,
  }),
  /** Function that will return direction and dataKey on every sort action  */
  onSort: func,
  /** Optional boolean to cause horizontal scrolling when table extends past the container */
  horizontalScroll: bool,
  /** Optional boolean to cause the first column to be fixed when horizontalScrool is true */
  fixedColumn: bool,
  /** Optional string to provider header which is visable when no data is available */
  emptyStateHeader: string,
  /** Optional string to provider descriptive message explaining the empty state of the table */
  emptyStateMessage: string,
  /** Boolean to render select checkbox column */
  selectable: bool,
  /** Callback executed when table data updates through selection. */
  onUpdateData: func,
};

const defaultProps = {
  data: [],
  rowKey: undefined,
  fixed: false,
  className: '',
  onSort: () => {},
  sortedColumn: { direction: '', sortDataKey: '' },
  horizontalScroll: false,
  fixedColumn: false,
  emptyStateHeader: 'No data available',
  emptyStateMessage: 'Prompt to action or solution',
  rowClassName: () => {},
  selectable: false,
  onUpdateData: () => {},
};

const defaultColumnDefs = {
  cellDataGetter: ({ dataKey, rowData }) => get(rowData, dataKey),
  cellRenderer: ({ cellData }) => cellData,
  label: '',
};

class Table extends Component {
  constructor(props) {
    super(props);

    const { data } = this.props;
    let value = false;
    if (data.every(x => x.selected)) {
      value = true;
    }

    this.state = { selectAllValue: value };
  }

  uniqueIDCheck = (rowKey, rowData, rowIndex) => {
    if (rowKey === undefined) {
      const newRowData = rowData;
      newRowData.id = rowIndex;
      return newRowData.id;
    }
    if (typeof rowKey === 'string') {
      return rowData[rowKey];
    }
    return rowKey(rowData);
  };

  columnHeaderCallBack = (direction, dataKey) => {
    const { onSort } = this.props;
    onSort(direction, dataKey);
  };

  classNameTypeManage = (classname, data, index) => {
    let name;
    if (typeof classname === 'function') {
      name = classname(data, index);
    } else if (typeof classname === 'string') {
      name = classname;
    }
    return name;
  };

  render() {
    const {
      data,
      columns,
      fixed,
      rowKey,
      className,
      sortedColumn,
      fixedColumn,
      horizontalScroll,
      emptyStateHeader,
      emptyStateMessage,
      rowClassName,
      selectable,
      onUpdateData,
      onSort,
      ...rest
    } = this.props;

    const { selectAllValue } = this.state;

    const selectAll = value => {
      const updatedData = data.map(x => {
        return { ...x, selected: value };
      });
      onUpdateData(updatedData);
      this.setState({ selectAllValue: value });
    };

    const onRowSelected = (index, selected) => {
      const updatedData = data.map(x => x);
      updatedData[index].selected = selected;

      if (!selected && selectAllValue) {
        this.setState({ selectAllValue: false });
      }
      if (selected && !selectAllValue && updatedData.every(x => x.selected)) {
        this.setState({ selectAllValue: true });
      }

      onUpdateData(updatedData);
    };

    return (
      <div
        className={classNames({
          'dg-table-horizontal-scroll': horizontalScroll,
          'dg-table-fixed-column': fixedColumn,
        })}
      >
        <table
          className={classNames(
            'rc-table',
            { 'rc-table-fixed': fixed },
            className,
          )}
          {...rest}
        >
          <ColumnHeader
            columns={columns}
            selectable={selectable}
            sortedColumn={sortedColumn}
            columnHeaderCallBack={this.columnHeaderCallBack}
            onSelectAll={selectAll}
            selectAllValue={selectAllValue}
          />
          <tbody>
            {data.map((rowData, rowIndex) => {
              return (
                <tr
                  className={classNames(
                    'dg-table-row',
                    this.classNameTypeManage(rowClassName, rowData, rowIndex),
                    {
                      'dg-table-row-selected':
                        selectable && rowData.selected === true,
                    },
                  )}
                  key={this.uniqueIDCheck(rowKey, rowData, rowIndex)}
                >
                  {selectable ? (
                    <td
                      key={`checkbox ${this.uniqueIDCheck(
                        rowKey,
                        rowData,
                        rowIndex,
                      )}`}
                      className="rc-table-cell"
                    >
                      <Checkbox
                        className="dg-table-checkbox"
                        onChange={value => onRowSelected(rowIndex, value)}
                        value={rowData.selected}
                        label=""
                        name=""
                      />
                    </td>
                  ) : null}
                  {columns.map((column, columnIndex) => {
                    const {
                      cellDataGetter,
                      cellRenderer,
                      columnData,
                      dataKey,
                      className: columnClassName,
                      style,
                    } = {
                      ...defaultColumnDefs,
                      ...column,
                    };

                    return (
                      <td
                        key={`${(rowIndex, dataKey)}`}
                        className={classNames(
                          'rc-table-cell',
                          this.classNameTypeManage(
                            columnClassName,
                            dataKey,
                            columnIndex,
                          ),
                        )}
                        style={style}
                      >
                        {cellRenderer({
                          cellData: cellDataGetter({
                            dataKey,
                            columnData,
                            rowData,
                          }),
                          columnData,
                          columnIndex,
                          dataKey,
                          rowData,
                          rowIndex,
                        })}
                      </td>
                    );
                  })}
                </tr>
              );
            })}
          </tbody>
        </table>
        {data.length < 1 ? (
          <div className="dg-empty-state-container">
            <Heading className="dg-empty-state-header" as="h3" color="medium">
              {emptyStateHeader}
            </Heading>
            <Text className="dg-empty-state-message" color="medium">
              {emptyStateMessage}
            </Text>
          </div>
        ) : null}
      </div>
    );
  }
}

Table.propTypes = propTypes;
Table.defaultProps = defaultProps;

Table.TableHeader = TableHeader;
Table.TableFooter = TableFooter;

export default Table;
