import React from 'react';
import classnames from 'classnames';

const propTypes = {
  children: React.PropTypes.oneOfType([
    React.PropTypes.element,
    React.PropTypes.array,
  ]),
  collapsed: React.PropTypes.bool,
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

export default ButtonGroup;
