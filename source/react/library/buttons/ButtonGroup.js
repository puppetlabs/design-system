import PropTypes from 'prop-types';
import React from 'react';
import classnames from 'classnames';

const propTypes = {
  children: PropTypes.oneOfType([PropTypes.element, PropTypes.array]),
  collapsed: PropTypes.bool,
};

const defaultProps = {
  collapsed: false,
  children: null,
};

/**
 * `ButtonGroup` allows you to render buttons next to eachother.
 */
const ButtonGroup = ({ collapsed, children }) => {
  const classname = classnames('rc-button-group', {
    'rc-button-group-collapsed': collapsed,
  });

  return <div className={classname}>{children}</div>;
};

ButtonGroup.propTypes = propTypes;
ButtonGroup.defaultProps = defaultProps;

export default ButtonGroup;
