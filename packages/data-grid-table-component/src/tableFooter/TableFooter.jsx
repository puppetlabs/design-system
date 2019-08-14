import React from 'react';
import PropTypes from 'prop-types';
import { Text } from '@puppet/react-components';
import './TableFooter.scss';

const propTypes = {
  /** Optional feature to display number of rows in table */
  rowCount: PropTypes.shape({
    /** Provide the number of rows displayed */
    count: PropTypes.string,
    /** Optional change label displayed after count. Current default "rows" */
    label: PropTypes.string,
  }),
  children: PropTypes.node,
};

const defaultProps = {
  rowCount: {},
  children: undefined,
};

function TableFooter({ children, rowCount }) {
  return (
    <div className="dg-table-footer-container">
      {children === undefined ? (
        <Text as="h3" color="medium" className="dg-table-row-count">
          {rowCount.count} {rowCount.label ? rowCount.label : null}
        </Text>
      ) : (
        children
      )}
    </div>
  );
}

TableFooter.propTypes = propTypes;
TableFooter.defaultProps = defaultProps;

export default TableFooter;
