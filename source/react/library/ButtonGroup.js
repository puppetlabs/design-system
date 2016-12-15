import React from 'react';

const propTypes = {
  children: React.PropTypes.element,
};

const ButtonGroup = props => <div className="rc-button-group">{ props.children }</div>;

ButtonGroup.propTypes = propTypes;

export default ButtonGroup;
