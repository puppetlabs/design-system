import React from 'react';
import PropTypes from 'prop-types';
import { Text, ButtonSelect } from '@puppet/react-components';
import TablePageSelector from './../tablePageSelector';
import classnames from 'classnames';

import './TableFooter.scss';

const propTypes = {
  /** Optional feature to display number of rows in table. Provide both the count and 'item' label in a string. */
  rowCountText: PropTypes.string,
  /** Optional bool that when true displays the rows Per Page feature. */
  rowsPerPage: PropTypes.bool,
  /** Optional overrides the default text on the rowPerPage feature. */
  rowsPerPageText: PropTypes.string,
  /** Sets the value of the rowPerPage ButtonSelect. */
  rowsPerPageValue: PropTypes.number,
  /** Function that is to be returned on a row selection, returns value users selected. */
  onRowPerPageSelect: PropTypes.func,
  /** Optional bool that when true displays the rows Per Page feature. */
  PageSelector: PropTypes.bool,
  /** Current page number. */
  currentPage: PropTypes.number,
  /** Total number of pages. */
  pageCount: PropTypes.number,
  /** Function that updates the current page to the page the user clicks. Takes new page as an argument. */
  updatePage: PropTypes.func,
  /** The number of nearest neighbors of the currently selected page that are shown in the numbres list. */
  delta: PropTypes.number,
  children: PropTypes.node,
};

const defaultProps = {
  rowCountText: null,
  selectedRowCountText: null,
  rowsPerPage: false,
  rowsPerPageText: 'Rows Per Page',
  rowsPerPageDefaultValue: 10,
  onRowPerPageSelect: () => {},
  PageSelector: false,
  children: undefined,
  updatePage: () => {},
};
const rowsPerPageDefaultOptions = [
  { value: 5, label: '5' },
  { value: 10, label: '10' },
  { value: 25, label: '25' },
  { value: 50, label: '50' },
];

function TableFooter({
  children,
  rowCountText,
  rowsPerPage,
  rowsPerPageText,
  rowsPerPageValue,
  onRowPerPageSelect,
  PageSelector,
  currentPage,
  pageCount,
  updatePage,
  delta,
}) {
  return (
    <div className="dg-table-footer-container">
      {children === undefined ? (
        <React.Fragment>
          {rowCountText && (
            <Text
              color="medium"
              size="small"
              className={classnames('dg-table-row-count-footer', {
                'dg-table-row-count-grouped': rowsPerPage || PageSelector,
              })}
            >
              {rowCountText || null}
            </Text>
          )}
          <div className="dg-table-footer-left-container">
            {rowsPerPage && (
              <div className="dg-table-footer-rows-per-page-container">
                <Text
                  className="dg-table-footer-rows-per-page-text"
                  color="medium"
                  size="small"
                >
                  {rowsPerPageText}
                  {':'}
                </Text>
                <ButtonSelect
                  options={rowsPerPageDefaultOptions}
                  value={rowsPerPageValue}
                  type="secondary"
                  onChange={onRowPerPageSelect}
                />
              </div>
            )}
            {PageSelector && (
              <TablePageSelector
                className="dg-table-footer-page-selector"
                currentPage={currentPage}
                pageCount={pageCount}
                updatePage={updatePage}
                delta={delta}
              />
            )}
          </div>
        </React.Fragment>
      ) : (
        children
      )}
    </div>
  );
}

TableFooter.propTypes = propTypes;
TableFooter.defaultProps = defaultProps;

export default TableFooter;
