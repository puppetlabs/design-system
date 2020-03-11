import React from 'react';
import PropTypes from 'prop-types';

const propTypes = {
  /** Contents are typically buttons */
  children: PropTypes.node,
  /** Class to add to .rc-tabs-actions */
  className: PropTypes.string,
};

const defaultProps = {
  children: null,
  className: '',
};

const Actions = ({ children, className }) => (
  <div className={`rc-tabs-actions ${className}`}>{children}</div>
);

Actions.propTypes = propTypes;
Actions.defaultProps = defaultProps;

export default Actions;
