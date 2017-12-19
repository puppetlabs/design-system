import React from 'react';
import classnames from 'classnames';
import Icon from '../Icon';

const propTypes = {
  placeholder: React.PropTypes.string,
  label: React.PropTypes.string,
  select: React.PropTypes.bool,
  disabled: React.PropTypes.bool,
  error: React.PropTypes.string,
  tabIndex: React.PropTypes.number,
  onClick: React.PropTypes.func,
};

const defaultProps = {
  placeholder: '',
  label: '',
  select: false,
  disabled: false,
  error: '',
  tabIndex: 0,
  onClick: () => {},
};

const DropdownLabel = (props) => {
  let label = props.label;

  if (props.placeholder && !label) {
    label = props.placeholder;
  } else if (!label) {
    label = 'Select One';
  }

  const className = classnames('rc-dropdown-toggle', {
    'rc-dropdown-toggle-select': props.select,
    'rc-dropdown-toggle-error': props.error,
  });

  return (
    <a
      role="button"
      tabIndex={ props.tabIndex }
      disabled={ props.disabled }
      onClick={ props.onClick }
      className={ className }
    >
      <span className="rc-dropdown-label">
        <span className="rc-dropdown-label-text">{ label }</span> <Icon width="8px" height="8px" type="chevron-down" />
      </span>
    </a>
  );
};

DropdownLabel.propTypes = propTypes;
DropdownLabel.defaultProps = defaultProps;

export default DropdownLabel;
