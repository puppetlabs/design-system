import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Button, Text } from '@puppet/react-components';

import './TablePageSelector.scss';

const propTypes = {
  /** Optional feature to display number of items currently displayed in table. Usually formatted as `${currentItem - itemsPerPage + 1} - ${currentItem} of ${totalNumItems} items.` */
  paginationCountText: PropTypes.string,
  /** Current page number. */
  currentPage: PropTypes.number,
  /** Total number of pages. */
  pageCount: PropTypes.number,
  /** Function that updates the current page to the page the user clicks. Takes new page as an argument. */
  updatePage: PropTypes.func.isRequired,
  /** The number of nearest neighbors of the currently selected page that are shown in the numbres list. */
  delta: PropTypes.number,
};

const defaultProps = {
  paginationCountText: null,
  currentPage: undefined,
  pageCount: undefined,
  delta: 1,
};

class TablePageSelector extends Component {
  // takes current page and total number of pages and returns a new array with button values
  pagination = (current, last, delta) => {
    const left = current - delta;
    const right = current + delta;
    const range = []; // page numbers to be displayed
    const rangeWithDots = [];
    let l = 0;

    for (let i = 1; i <= last; i += 1) {
      if (i === 1 || i === last || (i >= left && i <= right)) {
        range.push(i);
      }
    }
    // eslint-disable-next-line
    for (let i of range) {
      if (l) {
        // after three clicks add dots
        if (i - l === 2) {
          rangeWithDots.push(l + 1);
        } else if (i - l !== 1) {
          rangeWithDots.push('...');
        }
      }
      rangeWithDots.push(i);

      l = i;
    }

    return rangeWithDots;
  };

  render() {
    const {
      paginationCountText,
      pageCount,
      currentPage,
      updatePage,
      delta,
    } = this.props;
    const display = this.pagination(currentPage, pageCount, delta);

    return (
      <>
        {paginationCountText ? (
          <Text color="medium" size="small" className="dg-table-row-count">
            {paginationCountText}
          </Text>
        ) : (
          <div />
        )}
        <div className="rc-page-selector-container">
          <Button
            className="rc-page-selector-button"
            type="transparent"
            icon="chevron-left"
            disabled={!currentPage || currentPage === 1}
            onClick={() => updatePage(currentPage - 1)}
          />
          {display.map((i, index) => {
            return (
              <Button
                className="rc-page-selector-button"
                type={i === currentPage ? 'primary' : 'transparent'}
                key={(i, index)}
                disabled={i === '...'}
                onClick={() => updatePage(i)}
              >
                {i}
              </Button>
            );
          })}
          <Button
            className="rc-page-selector-button"
            type="transparent"
            icon="chevron-right"
            disabled={!currentPage || currentPage === pageCount}
            onClick={() => updatePage(currentPage + 1)}
          />
        </div>
      </>
    );
  }
}

TablePageSelector.propTypes = propTypes;
TablePageSelector.defaultProps = defaultProps;

export default TablePageSelector;
