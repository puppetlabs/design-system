import React, { Component } from 'react';
import PropTypes from 'prop-types';
// import './TablePageSelector.scss';
import { Button, Text } from '@puppet/react-components';

const propTypes = {
  paginationCountText: PropTypes.string,
  currentPage: PropTypes.number,
  pageCount: PropTypes.number,
  onClickHandler: PropTypes.func.isRequired,
  delta: PropTypes.number,
  disableDescArrow: PropTypes.bool,
  disableAscArrow: PropTypes.bool,
};

const defaultProps = {
  paginationCountText: null,
  currentPage: undefined,
  pageCount: undefined,
  delta: 1,
  disableDescArrow: false,
  disableAscArrow: false,
};

class TablePageSelector extends Component {
  // On click handler that returns the new page number to the parent component depending on which button was clicked
  changePage = (
    e,
    onClickHandler,
    currentPage,
    direction,
    selectedPage,
    pageCount,
  ) => {
    // update the current page
    let newPage;
    if (direction === 'asc' && currentPage !== pageCount) {
      //   newPage = currentPage + 1;
      newPage = 'NextPage';
    }
    if (direction === 'desc' && currentPage !== 1) {
      //   newPage = currentPage - 1;
      newPage = 'PreviousPage';
    }
    if (selectedPage === '...') {
      return;
    }
    if (selectedPage) {
      newPage = selectedPage;
    }
    if (newPage !== undefined) {
      onClickHandler(newPage);
    }
  };

  // takes current page and total number of pages and returns a new array with button values
  pagination = (c, m, d) => {
    const current = c;
    const last = m;
    const delta = d;
    const left = current - delta;
    const right = current + delta + 1;
    const range = [];
    const rangeWithDots = [];
    let l = 0;

    for (let i = 1; i <= last; i += 1) {
      if (i === 1 || i === last || (i >= left && i < right)) {
        range.push(i);
        // i= numbers to be displayed
      }
    }
    // console.log(range);
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
      onClickHandler,
      delta,
      disableDescArrow,
      disableAscArrow,
    } = this.props;
    const display = this.pagination(currentPage, pageCount, delta);

    return (
      <>
        <Text color="medium" size="small" className="dg-table-row-count">
          {paginationCountText || null}
        </Text>
        <div className="rc-page-selector-container">
          <Button
            className="rc-page-select-icon-desc"
            type="transparent"
            disabled={disableDescArrow}
            onClick={e =>
              this.changePage(e, onClickHandler, currentPage, 'desc')
            }
          >
            {'<'}
          </Button>
          {display.map((i, index) => {
            return (
              <Button
                type={i === currentPage ? 'primary' : 'transparent'}
                key={(i, index)}
                onClick={e =>
                  this.changePage(e, onClickHandler, currentPage, null, i)
                }
              >
                {i}
              </Button>
            );
          })}
          <Button
            className="rc-page-select-icon-asc"
            type="transparent"
            disabled={disableAscArrow}
            onClick={e =>
              this.changePage(
                e,
                onClickHandler,
                currentPage,
                'asc',
                null,
                null,
                pageCount,
              )
            }
          >
            {'>'}
          </Button>
        </div>
      </>
    );
  }
}

TablePageSelector.propTypes = propTypes;
TablePageSelector.defaultProps = defaultProps;

export default TablePageSelector;
