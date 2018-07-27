import React from 'react';
import PropTypes from 'prop-types';

const propTypes = {
  children: PropTypes.any,
  height: PropTypes.number,
};

const Row = (props) => {
  const { height } = props;
  const style = {};

  if (props.height) {
    style.height = `${height}px`;
  }

  return (
    <div className="rc-grid-row" style={ style }>{ props.children }</div>
  );
};

Row.propTypes = propTypes;

export default Row;
