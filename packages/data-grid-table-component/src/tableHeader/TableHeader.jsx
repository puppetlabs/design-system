import React from 'react';
import PropTypes from 'prop-types';
import { Text } from '@puppet/react-components';
import './TableHeader.scss';

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

function TableHeader({ rowCount }) {
  return (
    <Text className="rc-table-row-count">
      {rowCount.count} {rowCount.label ? rowCount.label : null}
    </Text>
  );
}

TableHeader.propTypes = propTypes;
TableHeader.defaultProps = defaultProps;

export default TableHeader;
