import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

const propTypes = {
  className: PropTypes.string,
};

const defaultProps = {
  className: '',
};

const AlertActions = ({ className, ...rest }) => (
  <div className={classNames('rc-alert-actions', className)} {...rest} />
);

AlertActions.propTypes = propTypes;
AlertActions.defaultProps = defaultProps;

export default AlertActions;
