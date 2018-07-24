import React from 'react';
import PropTypes from 'prop-types';

const propTypes = {
  children: PropTypes.any,
};

const Column = props => (
  <div className="rc-grid-column">{ props.children }</div>
);

Column.propTypes = propTypes;

export default Column;
