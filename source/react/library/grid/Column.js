import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { mapColumnsToText } from '../../helpers/statics';

const propTypes = {
  children: PropTypes.any,
  columns: PropTypes.number,
};

const Column = (props) => {
  const { columns } = props;
  const columnText = mapColumnsToText[columns];

  const classNames = classnames('rc-grid-column', {
    [`rc-grid-column-${columnText}-columns`]: columnText,
  });

  return (
    <div className={ classNames }>{ props.children }</div>
  );
};

Column.propTypes = propTypes;

export default Column;
