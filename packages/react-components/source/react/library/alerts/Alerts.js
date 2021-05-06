import React from 'react';
import PropTypes from 'prop-types';

const propTypes = {
  /** Main content where a collection of Alert components can be passed */
  children: PropTypes.node,
};
const defaultProps = {
  children: '',
};

/** Alerts is a container for floating "growl" notifications. */
const Alerts = ({ children }) => <div className="rc-alerts">{children}</div>;

Alerts.propTypes = propTypes;
Alerts.defaultProps = defaultProps;

export default Alerts;
