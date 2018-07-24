import React from 'react';
import PropTypes from 'prop-types';

const propTypes = {
  children: PropTypes.any,
};

const Row = props => (
  <div className="rc-grid-row">{ props.children }</div>
);

Row.propTypes = propTypes;

export default Row;
