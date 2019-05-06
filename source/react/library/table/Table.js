import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

const propTypes = {
  data: PropTypes.arrayOf(PropTypes.shape({})),
  columns: PropTypes.arrayOf(
    PropTypes.shape({
      cellDataGetter: PropTypes.func,
      cellRenderer: PropTypes.func,
      className: PropTypes.string,
      columnData: PropTypes.any,
      dataKey: PropTypes.string.isRequired,
      label: PropTypes.node,
      style: PropTypes.shape({}),
    }),
  ).isRequired,
  rowKey: PropTypes.oneOfType([PropTypes.func, PropTypes.string]),
  className: PropTypes.string,
  style: PropTypes.shape({}),
};

const defaultProps = {
  data: [],
  rowKey: 'id',
  className: '',
  style: {},
};

const defaultColumnDefs = {
  cellDataGetter: ({ dataKey, rowData }) => rowData[dataKey],
  cellRenderer: ({ cellData }) => cellData,
  label: '',
};

const Table = ({ data, columns, rowKey, className, ...rest }) => (
  <table className={classNames('rc-table', className)} {...rest}>
    <thead>
      <tr className="rc-table-header">
        {columns.map(({ label, dataKey }) => (
          <th className="rc-table-header-cell" key={dataKey}>
            {label}
          </th>
        ))}
      </tr>
    </thead>
    <tbody>
      {data.map((rowData, rowIndex) => (
        <tr
          className="rc-table-row"
          key={typeof rowKey === 'string' ? rowData[rowKey] : rowKey(rowData)}
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
                    columnData,
                    dataKey,
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
);

Table.propTypes = propTypes;

Table.defaultProps = defaultProps;

export default Table;
