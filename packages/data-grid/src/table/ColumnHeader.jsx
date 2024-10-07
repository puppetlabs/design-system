import React, { Component } from 'react';
import { func, any, string, shape, bool, node, arrayOf } from 'prop-types';
import classnames from 'classnames';
import { Checkbox, Icon } from '@puppet/react-components';

const propTypes = {
  columns: arrayOf(
    shape({
      /** Optional cell data getter method. By default it will grab data at the provided dataKey */
      cellDataGetter: func,
      /** Optional cell renderer method. */
      cellRenderer: func,
      /** Arbitrary additional data passed to the cell renderer for this column */
      // eslint-disable-next-line react/forbid-prop-types
      columnData: any,
      /** Unique string key defining this column */
      dataKey: string.isRequired,
      /** Label for column header text */
      label: node,
      /** Boolean to render sorting icons in header */
      sortable: bool,
      /** Styling for column header text */
      style: shape({}),
    }),
  ).isRequired,
  /** Callback to return click action */
  onSort: func,
  /** Object containing key fields of text describing which header should be active */
  sortedColumn: shape({
    /** The direction of the active icon */
    direction: string,
    /** The datakey of the active column */
    sortDataKey: string,
  }),
  /** Boolean to render select all checkbox */
  selectable: bool,
  /** Function which handles when the checkbox on click  */
  onSelectAll: func,
  /** Allows the state of the checkbox to be defined  */
  selectAllValue: bool,
  /** Allows users to show an dash instead of a tick  */
  headerIndeterminateState: bool,
};

const defaultProps = {
  onSort: () => {},
  sortedColumn: { direction: '', sortDataKey: '' },
  selectable: false,
  onSelectAll: () => {},
  selectAllValue: false,
  headerIndeterminateState: false,
};

const SORT_DIRECTION = { ASC: 'asc', DESC: 'desc' };

class ColumnHeader extends Component {
  sortColumn = (e, dataKey) => {
    e.preventDefault();
    const { onSort, sortedColumn } = this.props;

    let dir;
    if (sortedColumn.sortDataKey === dataKey) {
      dir =
        sortedColumn.direction === SORT_DIRECTION.ASC
          ? SORT_DIRECTION.DESC
          : SORT_DIRECTION.ASC;
    } else {
      dir = SORT_DIRECTION.ASC;
    }

    onSort(dir, dataKey);
  };

  render() {
    const {
      columns,
      sortedColumn,
      selectable,
      onSelectAll,
      selectAllValue,
      headerIndeterminateState,
    } = this.props;
    const { direction, sortDataKey } = sortedColumn;

    return (
      <thead>
        <tr className="rc-table-header">
          {selectable ? (
            <th
              className={classnames(
                'rc-table-header-cell',
                `dg-table-header-checkbox-container`,
              )}
            >
              <Checkbox
                onChange={(value) => onSelectAll(value)}
                value={selectAllValue}
                label=""
                name=""
                className="dg-table-header-checkbox"
                indeterminate={headerIndeterminateState}
              />
            </th>
          ) : null}
          {columns.map(({ label, dataKey, sortable, style }) => (
            <th
              className={classnames('rc-table-header-cell', {
                'dg-column-header-sortable': sortable === true,
              })}
              key={dataKey}
              style={style}
              onClick={(e) =>
                sortable ? this.sortColumn(e, dataKey) : () => {}
              }
              onKeyPress={(e) =>
                e.key === 'Enter' ? this.sortColumn(e, dataKey) : null
              }
              tabIndex={sortable ? 0 : null}
            >
              <span
                // eslint-disable-next-line react/no-unknown-property
                as="h6"
                color="medium"
                className={classnames({
                  'dg-column-header-label-active': dataKey === sortDataKey,
                })}
              >
                {label}
              </span>

              {sortable ? (
                <span className="dg-column-header-icon-container">
                  <Icon
                    type="increment"
                    size="medium"
                    className={classnames('dg-column-header-icon-color', {
                      [direction]: dataKey === sortDataKey,
                    })}
                  />
                </span>
              ) : null}
            </th>
          ))}
        </tr>
      </thead>
    );
  }
}

ColumnHeader.propTypes = propTypes;
ColumnHeader.defaultProps = defaultProps;

export default ColumnHeader;
