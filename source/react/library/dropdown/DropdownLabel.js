import React from 'react';
import Icon from '../Icon';

const propTypes = {
  placeholder: React.PropTypes.string,
  label: React.PropTypes.string,
  disabled: React.PropTypes.bool,
  onClick: React.PropTypes.func,
};

const DropdownLabel = (props) => {
  let label = props.label;

  if (props.placeholder && !label) {
    label = props.placeholder;
  } else if (!label) {
    label = 'Select One';
  }

  return (
    <a disabled={ props.disabled } onClick={ props.onClick } className="rc-dropdown-toggle">
      <span className="rc-dropdown-label">
        <span className="rc-dropdown-label-text">{ label }</span> <Icon type="chevron-down" />
      </span>
    </a>
  );
};

DropdownLabel.propTypes = propTypes;

export default DropdownLabel;
