import React from 'react';

const propTypes = {
  children: React.PropTypes.oneOfType([
    React.PropTypes.element,
    React.PropTypes.array,
  ]),
};

/**
 * `ButtonGroup` allows you to render buttons next to eachother.
 *
 * @example ../../../docs/ButtonGroup.md
 */
const ButtonGroup = props => <div className="rc-button-group">{ props.children }</div>;

ButtonGroup.propTypes = propTypes;

export default ButtonGroup;
