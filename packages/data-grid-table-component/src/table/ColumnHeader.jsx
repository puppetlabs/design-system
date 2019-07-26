import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
// import { Heading } from '@puppet/react-components';

const propTypes = {
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
  sortable: PropTypes.bool,
  columnHeaderCallBack: PropTypes.func,
  sortedColumn: PropTypes.shape({
    direction: PropTypes.string,
    sortDataKey: PropTypes.string,
  }),
};

const defaultProps = {
  sortable: false,
  columnHeaderCallBack: null,
  sortedColumn: { direction: '', sortDataKey: '' },
};

class ColumnHeader extends Component {
  onClick(e, direction, dataKey) {
    e.preventDefault();
    const { columnHeaderCallBack } = this.props;
    columnHeaderCallBack(direction, dataKey);
  }

  onClickToggle(e, direction, dataKey) {
    e.preventDefault();
    const { columnHeaderCallBack } = this.props;
    columnHeaderCallBack(direction, dataKey);
  }

  render() {
    const { columns, sortable, sortedColumn } = this.props;
    const { direction, sortDataKey } = sortedColumn;

    return (
      <thead>
        <tr className="rc-table-header">
          {columns.map(
            ({ label, dataKey, className: cellClassName, style }) => (
              <th
                className={classnames('rc-table-header-cell', cellClassName)}
                key={dataKey}
                style={style}
              >
                <span
                  as="h6"
                  color="medium"
                  className={classnames({
                    'rc-column-header-label-active': dataKey === sortDataKey,
                  })}
                >
                  {label}
                </span>

                {sortable === true ? (
                  <span
                    className={classnames(
                      {
                        [direction]: dataKey === sortDataKey,
                      },
                      'rc-column-header-icon-container',
                    )}
                  >
                    <icon
                      className="rc-column-header-icon-up"
                      onClick={e => this.onClick(e, 'asc', dataKey)}
                      size="large"
                    >
                      ▲
                    </icon>
                    <icon
                      className="rc-column-header-icon-down"
                      onClick={e => this.onClick(e, 'desc', dataKey)}
                      size="large"
                    >
                      ▼
                    </icon>
                  </span>
                ) : (
                  <div />
                )}
              </th>
            ),
          )}
        </tr>
      </thead>
    );
  }
}

ColumnHeader.propTypes = propTypes;
ColumnHeader.defaultProps = defaultProps;

export default ColumnHeader;
