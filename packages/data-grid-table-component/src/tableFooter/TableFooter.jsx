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
};

const defaultProps = {
  rowCount: {},
};

function TableFooter({ rowCount }) {
  return (
    <Text className="rc-table-row-count">
      {rowCount.count} {rowCount.label ? rowCount.label : null}
    </Text>
  );
}

TableFooter.propTypes = propTypes;
TableFooter.defaultProps = defaultProps;

export default TableFooter;
