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
  data: PropTypes.array,
  columns: PropTypes.array,
  className: PropTypes.string,
  onChange: PropTypes.func,
  onSelectChange: PropTypes.func,
};

const defaultProps = {
  selectable: false,
  striped: true,
  fixed: false,
  data: [],
  columns: [],
  className: '',
  onChange: null,
  onSelectChange: null,
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

    let sort = {
      direction: 'asc',
    };

    this.props.columns.forEach((column) => {
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
    if (this.props.onChange) {
      this.props.onChange(rowData, checked);
    }
  }

  onSelectChange(rowData, checked) {
    if (this.props.onSelectChange) {
      this.props.onSelectChange(rowData, checked);
    }
  }

  onHeaderClick(column) {
    let sortable = true;
    const data = this.props.data;

    // This is to make sure we don't try to sort rows by non string types
    Object.values(data).forEach((value) => {
      if (sortable && !isSortable(value[column.column])) {
        sortable = false;
      }
    });

    if (!sortable) {
      return;
    }

    const sort = this.state.sort;
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
    const columns = this.props.columns;
    let rowData;

    columns.forEach((obj) => {
      if (obj.column === column) {
        rowData = obj;
      }
    });

    return rowData;
  }

  getHeaders(data) {
    const headers = [];

    if (this.props.selectable) {
      headers.push(
        <th key="all-selector" className="rc-table-column-checkbox">&nbsp;<div>&nbsp;</div></th>,
      );
    }

    if (data.length > 0) {
      this.props.columns.forEach((column) => {
        headers.push(
          <ColumnHeader
            key={ `${column.column}-header` }
            column={ column }
            onClick={ this.onHeaderClick }
          />,
        );
      });
    }

    return (
      <thead>
        <tr>
          {headers}
        </tr>
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

    return <Column { ...props } />;
  }

  getBody(data) {
    const sort = this.state.sort;
    const rows = [];

    if (sort && sort.column) {
      data = data.sort((a, b) => {
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
        data = data.reverse();
      }
    }

    if (data.length > 0) {
      data.forEach((datum) => {
        const columns = [];

        if (this.props.selectable) {
          columns.push(
            <td key={ `${datum.rowKey}-selector` } className="rc-table-column-checkbox">
              <ColumnCheckbox
                onChange={ this.onSelectChange }
                checked={ datum.meta.selected }
                rowData={ datum }
              />
            </td>,
          );
        }

        Object.keys(datum).forEach((column) => {
          const metaData = this.getMetaData(column);

          if (metaData) {
            columns.push(
              <td key={ `${datum.rowKey}-${column}` } className={ metaData.className }>
                { this.getColumn(datum, column) }
              </td>,
            );
          }
        });

        rows.push(<tr key={ datum.rowKey }>{ columns }</tr>);
      });
    } else {
      rows.push(<tr key="no-results"><td>No results to display</td></tr>);
    }

    return <tbody>{rows}</tbody>;
  }

  reOrderColumns(data) {
    const metaData = this.props.columns;
    const sortedMetaData = metaData.sort((a, b) => (a.order - b.order));

    return data.map((datum) => {
      const sortedRow = { meta: datum.meta };
      const rowKey = [];

      // This is a hack specific to the data modeling wizard table.
      // column name and table name are all we need to identify the row. we don't want to include
      // any other columns, as they are changable by the user.
      rowKey.push(datum[sortedMetaData[0].column]);
      rowKey.push(datum[sortedMetaData[1].column]);


      sortedMetaData.forEach((metaObj) => {
        sortedRow[metaObj.column] = datum[metaObj.column];
      });

      sortedRow.rowKey = rowKey.join(':');

      return sortedRow;
    });
  }

  render() {
    const data = this.reOrderColumns(this.props.data);
    const headers = this.getHeaders(data);
    const body = this.getBody(data);
    const tableClass = classnames('rc-table', {
      'rc-table-fixed': this.props.fixed,
      'rc-table-striped': this.props.striped,
    }, this.props.className);

    return (
      <table className={ tableClass }>
        {headers}
        {body}
      </table>
    );
  }
}

Table.propTypes = propTypes;
Table.defaultProps = defaultProps;

export default Table;
