import React from 'react';
import PropTypes from 'prop-types';
import { Text, ButtonSelect } from '@puppet/react-components';
import classnames from 'classnames';
import TablePageSelector from '../tablePageSelector';

import './TableFooter.scss';

const propTypes = {
  /** Optional feature to display number of rows in table. Provide both the count and 'item' label in a string. */
  rowCountText: PropTypes.string,
  /** Optional bool that when true displays the rows Per Page feature. */
  rowsPerPage: PropTypes.bool,
  /** Optional overrides the default text on the rowPerPage feature. */
  rowsPerPageText: PropTypes.string,
  /** Sets the value of the rowPerPage ButtonSelect. */
  rowsPerPageValue: (
    { rowsPerPage, PageSelector, rowsPerPageValue },
    componentName,
  ) => {
    if (rowsPerPage || rowsPerPageValue) {
      if (rowsPerPage === true && PageSelector === false) {
        return new Error(
          `Rows Per Page feature relays on the Page Selector, please set PageSelector to true in ${componentName}`,
        );
      }
      if (
        typeof rowsPerPageValue !== 'number' ||
        rowsPerPageValue === undefined
      ) {
        return new Error(
          `Please provide a rowPerPageValue of type "number" to ${componentName}`,
        );
      }
    }
    return null;
  },
  /** Function that is to be returned on a row selection, returns value users selected. */
  onRowPerPageSelect: (
    { rowsPerPage, onRowPerPageSelect, PageSelector },
    componentName,
  ) => {
    if (rowsPerPage || onRowPerPageSelect) {
      if (rowsPerPage === true && PageSelector === false) {
        return new Error(
          `Rows Per Page feature relays on the Page Selector, please set PageSelector to true in ${componentName}`,
        );
      }
      if (
        typeof onRowPerPageSelect !== 'function' ||
        onRowPerPageSelect === undefined
      ) {
        return new Error(
          `Please provide a onRowPerPageSelect of type "function" to ${componentName}`,
        );
      }
    }
    return null;
  },
  /** Optional bool that when true displays the rows Per Page feature. */
  PageSelector: PropTypes.bool,
  /** Current page number. */
  currentPage: ({ PageSelector, currentPage }, componentName) => {
    if (PageSelector || currentPage) {
      if (typeof currentPage !== 'number' || currentPage === undefined) {
        return new Error(
          `Please provide a currentPage prop of type "number" to ${componentName}`,
        );
      }
    }
    return null;
  },
  /** Total number of pages. */
  pageCount: ({ PageSelector, pageCount }, propName, componentName) => {
    if (PageSelector || pageCount) {
      if (typeof pageCount !== 'number' || pageCount === undefined) {
        return new Error(
          `Please provide a pageCount prop of type "number" to ${componentName}`,
        );
      }
    }
    return null;
  },
  /** Function that updates the current page to the page the user clicks. Takes new page as an argument. */
  updatePage: ({ PageSelector, updatePage }, propName, componentName) => {
    if (PageSelector || updatePage) {
      if (typeof updatePage !== 'function' || updatePage === undefined) {
        return new Error(
          `Please provide a updatePage of type "function" to ${componentName}`,
        );
      }
    }
    return null;
  },
  /** The number of nearest neighbors of the currently selected page that are shown in the numbers list. */
  delta: PropTypes.number,
  children: PropTypes.node,
  /** Optional The options available in the rows per page selector drop down */
  rowsPerPageOptions: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.number,
      label: PropTypes.string,
    }),
  ),
};

const defaultProps = {
  rowCountText: null,
  rowsPerPage: false,
  rowsPerPageText: 'Rows Per Page',
  rowsPerPageValue: 10,
  onRowPerPageSelect: () => {},
  PageSelector: false,
  currentPage: 1,
  pageCount: 1,
  updatePage: () => {},
  delta: 1,
  children: undefined,
  rowsPerPageOptions: [
    { value: 5, label: '5' },
    { value: 10, label: '10' },
    { value: 25, label: '25' },
    { value: 50, label: '50' },
  ],
};

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
  rowsPerPageOptions,
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
                  className="dg-table-footer-rows-per-page-select"
                  options={rowsPerPageOptions}
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
