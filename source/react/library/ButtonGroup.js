import React from 'react';
import classnames from 'classnames';

const propTypes = {
  children: React.PropTypes.oneOfType([
    React.PropTypes.element,
    React.PropTypes.array,
  ]),
  collapsed: React.PropTypes.bool,
};

const defaultProps = {
  collapsed: false,
  children: null,
};

/**
 * `ButtonGroup` allows you to render buttons next to eachother.
 *
 * @example ../../../docs/ButtonGroup.md
 */
const ButtonGroup = (props) => {
  const classname = classnames('rc-button-group', {
    'rc-button-group-collapsed': props.collapsed,
  });

  return (
    <div className={ classname }>{ props.children }</div>
  );
};

ButtonGroup.propTypes = propTypes;
ButtonGroup.defaultProps = defaultProps;

export default ButtonGroup;
