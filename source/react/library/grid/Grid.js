import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import Row from './Row';
import Column from './Column';

const propTypes = {
  children: PropTypes.any,
  columns: PropTypes.number,
  collapsed: PropTypes.bool,
  className: PropTypes.string,
};

const defaultProps = {
  columns: 3,
  collapsed: false,
};

const Grid = (props) => {
  const { columns, children, collapsed, className } = props;
  const mapColumnsToText = {
    1: 'one',
    2: 'two',
    3: 'three',
    4: 'four',
    5: 'five',
    6: 'six',
    7: 'seven',
    8: 'eight',
    9: 'nine',
    10: 'ten',
    11: 'eleven',
    12: 'twelve',
  };
  const columnText = mapColumnsToText[columns];

  const classNames = classnames('rc-grid', className, {
    [`rc-grid-${columnText}-columns`]: columnText,
    'rc-grid-collapsed': collapsed,
  });

  return (
    <div className={ classNames }>{ children }</div>
  );
};

Grid.propTypes = propTypes;
Grid.defaultProps = defaultProps;

Grid.Row = Row;
Grid.Column = Column;

export default Grid;
