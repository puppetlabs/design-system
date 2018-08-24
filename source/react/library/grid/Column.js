import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { mapColumnsToText } from '../../helpers/statics';

const propTypes = {
  children: PropTypes.node.isRequired,
  columns: PropTypes.number,
};

const defaultProps = {
  columns: null,
};

const Column = props => {
  const { columns, children } = props;
  const columnText = mapColumnsToText[columns];

  const classNames = classnames('rc-grid-column', {
    [`rc-grid-column-${columnText}-columns`]: columnText,
  });

  return <div className={classNames}>{children}</div>;
};

Column.propTypes = propTypes;
Column.defaultProps = defaultProps;

export default Column;
