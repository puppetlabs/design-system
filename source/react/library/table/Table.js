import PropTypes from 'prop-types';
import React from 'react';
import classnames from 'classnames';
import Column from './Column';
import ColumnHeader from './ColumnHeader';
import ColumnCheckbox from './ColumnCheckbox';

const propTypes = {
  selectable: PropTypes.bool,
  striped: PropTypes.bool,
  fixed: PropTypes.bool,
  data: PropTypes.arrayOf(PropTypes.shape({})),
  columns: PropTypes.arrayOf(PropTypes.shape({})),
  className: PropTypes.string,
  onChange: PropTypes.func,
  onSelectChange: PropTypes.func,
  getRowKey: PropTypes.func,
};

// This is included for backward compatibility with the initial implementation
// of <Table>. You should always specify your own getRowKey function if
// possible.
//
// Original justification is as follows:
//
// This is a hack specific to the data modeling wizard table. column name and
// table name are all we need to identify the row. we don't want to include any
// other columns, as they are changable by the user.
//
// NB: The slice(1, 3) pulls the first two sorted elements (the first key in the
// object is always `meta`).
const defaultGetRowKey = datum =>
  Object.getOwnPropertyNames(datum)
    .slice(1, 3)
    .map(k => datum[k])
    .join(':');

const defaultProps = {
  selectable: false,
  striped: true,
  fixed: false,
  data: [],
  columns: [],
  className: '',
  onChange: null,
  onSelectChange: null,
  getRowKey: defaultGetRowKey,
};

function isSortable(value) {
  return typeof value === 'string';
}

/**
 * `Table` is a component for rendering tabular data.
 */

class Table extends React.Component {
  constructor(props) {
    super(props);

    const { columns } = this.props;

    let sort = {
      direction: 'asc',
    };

    columns.forEach(column => {
      if (column.sort) {
        sort = {
          column: column.column,
          direction: column.sort,
        };
      }
    });

    this.state = { sort };

    this.onChange = this.onChange.bind(this);
    this.onSelectChange = this.onSelectChange.bind(this);
    this.onHeaderClick = this.onHeaderClick.bind(this);
  }

  onChange(rowData, checked) {
    const onChange = this.props;

    if (onChange) {
      onChange(rowData, checked);
    }
  }

  onSelectChange(rowData, checked) {
    const { onSelectChange } = this.props;

    if (onSelectChange) {
      onSelectChange(rowData, checked);
    }
  }

  onHeaderClick(column) {
    let sortable = true;
    const { data } = this.props;
    const { sort } = this.state;

    // This is to make sure we don't try to sort rows by non string types
    Object.values(data).forEach(value => {
      if (sortable && !isSortable(value[column.column])) {
        sortable = false;
      }
    });

    if (!sortable) {
      return;
    }

    const sameColumn = sort.column === column.column;
    let direction = 'asc';

    if (sameColumn && sort.direction === 'asc') {
      direction = 'desc';
    } else if (!sort.column) {
      direction = 'desc';
    }

    this.setState({
      sort: {
        column: column.column,
        direction,
      },
    });
  }

  getMetaData(column) {
    const { columns } = this.props;
    let rowData;

    columns.forEach(obj => {
      if (obj.column === column) {
        rowData = obj;
      }
    });

    return rowData;
  }

  getHeaders(data) {
    const headers = [];
    const { selectable, columns } = this.props;

    if (selectable) {
      headers.push(
        <th key="all-selector" className="rc-table-column-checkbox">
          &nbsp;
          <div>&nbsp;</div>
        </th>,
      );
    }

    if (data.length > 0) {
      columns.forEach(column => {
        headers.push(
          <ColumnHeader
            key={`${column.column}-header`}
            column={column}
            onClick={this.onHeaderClick}
          />,
        );
      });
    }

    return (
      <thead>
        <tr>{headers}</tr>
      </thead>
    );
  }

  getColumn(rowData, column) {
    const metaData = this.getMetaData(column);
    const props = {
      key: column,
      component: metaData.component,
      options: metaData.options,
      data: rowData[column],
      onChange: this.onChange,
      column,
      rowData,
    };

    return <Column {...props} />;
  }

  getBody(data) {
    const { sort } = this.state;
    const { selectable } = this.props;
    const rows = [];
    let revisedData = data;

    if (sort && sort.column) {
      revisedData = revisedData.sort((a, b) => {
        const columnA = a[sort.column].toLowerCase();
        const columnB = b[sort.column].toLowerCase();

        if (columnA < columnB) {
          return -1;
        }

        if (columnA > columnB) {
          return 1;
        }

        // names must be equal
        return 0;
      });

      if (sort.direction === 'desc') {
        revisedData = revisedData.reverse();
      }
    }

    if (revisedData.length > 0) {
      revisedData.forEach(datum => {
        const columns = [];

        if (selectable) {
          columns.push(
            <td
              key={`${datum.rowKey}-selector`}
              className="rc-table-column-checkbox"
            >
              <ColumnCheckbox
                onChange={this.onSelectChange}
                checked={datum.meta.selected}
                rowData={datum}
              />
            </td>,
          );
        }

        Object.keys(datum).forEach(column => {
          const metaData = this.getMetaData(column);

          if (metaData) {
            columns.push(
              <td
                key={`${datum.rowKey}-${column}`}
                className={metaData.className}
              >
                {this.getColumn(datum, column)}
              </td>,
            );
          }
        });

        rows.push(<tr key={datum.rowKey}>{columns}</tr>);
      });
    } else {
      rows.push(
        <tr key="no-results">
          <td>No results to display</td>
        </tr>,
      );
    }

    return <tbody>{rows}</tbody>;
  }

  sortedData() {
    const { data, columns: metaData, getRowKey } = this.props;
    const sortedMetaData = metaData.sort((a, b) => a.order - b.order);

    return data.map(datum => {
      const sortedRow = { meta: datum.meta };

      sortedMetaData.forEach(metaObj => {
        sortedRow[metaObj.column] = datum[metaObj.column];
      });

      sortedRow.rowKey = getRowKey(sortedRow);

      return sortedRow;
    });
  }

  render() {
    const { fixed, striped, className } = this.props;
    const data = this.sortedData();
    const headers = this.getHeaders(data);
    const body = this.getBody(data);
    const tableClass = classnames(className, 'rc-table', {
      'rc-table-fixed': fixed,
      'rc-table-striped': striped,
    });

    return (
      <table className={tableClass}>
        {headers}
        {body}
      </table>
    );
  }
}

Table.propTypes = propTypes;
Table.defaultProps = defaultProps;

export default Table;
