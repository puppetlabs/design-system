import PropTypes from 'prop-types';
import React from 'react';
import classNames from 'classnames';

const propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
};

const defaultProps = {
  children: null,
  className: '',
};

const ButtonGroup = ({ children, className, ...rest }) => (
  <div className={classNames('rc-button-group', className)} {...rest}>
    {children}
  </div>
);

ButtonGroup.propTypes = propTypes;
ButtonGroup.defaultProps = defaultProps;

export default ButtonGroup;
