import PropTypes from 'prop-types';
import React from 'react';
import classNames from 'classnames';

const propTypes = {
  children: PropTypes.oneOfType([PropTypes.element, PropTypes.array]),
};

const defaultProps = {
  children: null,
};

const ButtonGroup = ({ children, className, ...rest }) => (
  <div className={classNames('rc-button-group', className)} {...rest} />
);

ButtonGroup.propTypes = propTypes;
ButtonGroup.defaultProps = defaultProps;

export default ButtonGroup;
