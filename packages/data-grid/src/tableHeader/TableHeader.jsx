import React from 'react';
import PropTypes from 'prop-types';
import { Text } from '@puppet/react-components';
import './TableHeader.scss';

const propTypes = {
  /** Optional feature to display number of rows in table */
  rowCount: PropTypes.shape({
    /** Provide the number of rows displayed */
    count: PropTypes.number,
    /** Optional change label displayed after count. Current default "rows" */
    label: PropTypes.string,
  }),
  children: PropTypes.node,
};

const defaultProps = {
  rowCount: {},
  children: undefined,
};

function TableHeader({ children, rowCount }) {
  return (
    <div className="dg-table-header-container">
      {children === undefined ? (
        <Text as="h5" color="medium" className="dg-table-row-count">
          {rowCount.count} {rowCount.label ? rowCount.label : null}
        </Text>
      ) : (
        children
      )}
    </div>
  );
}

TableHeader.propTypes = propTypes;
TableHeader.defaultProps = defaultProps;

export default TableHeader;
