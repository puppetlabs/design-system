import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import Row from './Row';
import Column from './Column';
import { mapColumnsToText } from '../../helpers/statics';

const propTypes = {
  children: PropTypes.any,
  columns: PropTypes.number,
  collapse: PropTypes.oneOfType(['outer', 'inner', 'all', 'all-slim-inner']),
  className: PropTypes.string,
  divided: PropTypes.oneOfType(['vertically', 'horizontally']),
};

const defaultProps = {
  collapse: false,
};

const Grid = props => {
  const { columns, children, collapse, className, divided } = props;
  const columnText = mapColumnsToText[columns];

  const classNames = classnames('rc-grid', className, {
    [`rc-grid-${columnText}-columns`]: columnText,
    [`rc-grid-collapse-${collapse}`]: collapse,
    [`rc-grid-divided-${divided}`]: divided,
  });

  return <div className={classNames}>{children}</div>;
};

Grid.propTypes = propTypes;
Grid.defaultProps = defaultProps;

Grid.Row = Row;
Grid.Column = Column;

export default Grid;
