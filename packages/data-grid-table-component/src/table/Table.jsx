import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { Heading } from '@puppet/react-components';
import ColumnHeader from './ColumnHeader';
// import './Table.scss';

const propTypes = {
  /** Table data. Must be an array of objects */
  data: PropTypes.arrayOf(PropTypes.shape({})),
  /** Array of column specifications */
  columns: PropTypes.arrayOf(
    PropTypes.shape({
      /** Optional cell data getter method. By default it will grab data at the provided dataKey */
      cellDataGetter: PropTypes.func,
      /** Optional cell renderer method. */
      cellRenderer: PropTypes.func,
      /** Arbitrary additional data passed to the cell renderer for this column */
      columnData: PropTypes.any,
      /** Classname to apply to each data cell. Useful for setting explicit column widths */
      className: PropTypes.string,
      /** Unique string key defining this column */
      dataKey: PropTypes.string.isRequired,
      /** Column header text */
      label: PropTypes.node,
      /** Column header text */
      style: PropTypes.shape({}),
    }),
  ).isRequired,
  /** Provides a unique key for each table row. */
  rowKey: PropTypes.oneOfType([PropTypes.func, PropTypes.string]),
  /** Render table in fixed-layout mode */
  fixed: PropTypes.bool,
  /** Optional additional table className */
  className: PropTypes.string,
  /** Optional additional table style to add column header icons */
  sortable: PropTypes.bool,
  /** Optional object to decribe the current sorting state for styling */
  sortedColumn: PropTypes.shape({
    /** Descibes sort direction in either asc or desc */
    direction: PropTypes.string,
    /** Descibes the column being sorted using the column dataKey  */
    sortDataKey: PropTypes.string,
  }),
  /** Function that will return direction and dataKey on every sort action  */
  sortFunc: PropTypes.func,
  style: PropTypes.shape({}),
  /** Optional boolean to cause horizontal scrolling when table extends past the container */
  horizontalSroll: PropTypes.bool,
  /** Optional boolean to cause the first column to be fixed when horizontalScrool is true */
  fixedColumn: PropTypes.bool,
  /** Optional string to provider header which is visable when no data is available */
  emptyStateHeader: PropTypes.string,
  /** Optional string to provider descriptive message explaining the empty state of the table */
  emptyStateMessage: PropTypes.string,
};

const defaultProps = {
  data: [],
  rowKey: 'id',
  fixed: false,
  className: '',
  sortable: false,
  sortFunc: () => {},
  style: {},
  sortedColumn: { direction: '', sortDataKey: '' },
  horizontalSroll: false,
  fixedColumn: false,
  emptyStateHeader: 'No data available',
  emptyStateMessage: 'Prompt to action or solution',
};

const defaultColumnDefs = {
  cellDataGetter: ({ dataKey, rowData }) => rowData[dataKey],
  cellRenderer: ({ cellData }) => cellData,
  label: '',
};

class Table extends Component {
  columnHeaderCallBack = (direction, dataKey) => {
    const { sortFunc } = this.props;
    // console.log('TABle', dataFromCH);
    sortFunc(direction, dataKey);
  };

  render() {
    const {
      data,
      columns,
      fixed,
      rowKey,
      className,
      sortable,
      sortedColumn,
      // searchable,
      fixedColumn,
      horizontalSroll,
      emptyStateHeader,
      emptyStateMessage,
      ...rest
    } = this.props;
    return (
      <div
        className={classNames(
          { 'rc-table-fixed-column': fixedColumn },
          { 'rc-table-horizontal-scroll': horizontalSroll },
        )}
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
            sortable={sortable}
            sortedColumn={sortedColumn}
            columnHeaderCallBack={this.columnHeaderCallBack}
          />
          <tbody>
            {data.map((rowData, rowIndex) => (
              <tr
                className="rc-table-row"
                key={
                  typeof rowKey === 'string' ? rowData[rowKey] : rowKey(rowData)
                }
              >
                {columns.map((column, columnIndex) => {
                  const {
                    cellDataGetter,
                    cellRenderer,
                    columnData,
                    dataKey,
                    className: cellClassName,
                    style,
                  } = {
                    ...defaultColumnDefs,
                    ...column,
                  };

                  return (
                    <td
                      key={dataKey}
                      className={classNames('rc-table-cell', cellClassName)}
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
            ))}
          </tbody>
        </table>
        {data.length < 1 ? (
          <div className="table-empty-state-container">
            <Heading as="h3" color="medium">
              {emptyStateHeader}
            </Heading>
            <Heading as="h4" color="medium">
              {emptyStateMessage}
            </Heading>
          </div>
        ) : (
          <div />
        )}
      </div>
    );
  }
}

Table.propTypes = propTypes;
Table.defaultProps = defaultProps;

export default Table;
