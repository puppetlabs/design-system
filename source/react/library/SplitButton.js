import React from 'react';
import Button from './Button';
import Icon from './Icon';
import DropdownMenu from './dropdown/DropdownMenu';

const propTypes = {
  onClick: React.PropTypes.func.isRequired,
  onOptionClick: React.PropTypes.func.isRequired,
  options: React.PropTypes.array.isRequired,
  label: React.PropTypes.string.isRequired,
  dropdownWidth: React.PropTypes.string,
  dropdownSize: React.PropTypes.string,
  disablePortal: React.PropTypes.bool,
  disabled: React.PropTypes.bool,
  disabledMenu: React.PropTypes.bool,
  size: React.PropTypes.string,
};

const defaultProps = {
  dropdownWidth: '125px',
};

class SplitButton extends React.Component {
  constructor(props) {
    super(props);

    this.onClick = this.onClick.bind(this);
    this.onOptionClick = this.onOptionClick.bind(this);
  }

  onClick() {
    this.props.onClick();
  }

  onOptionClick(option) {
    if (this.props.onOptionClick && typeof option !== 'undefined') {
      this.props.onOptionClick(option);
    }
  }

  renderDropdownTarget() {
    let iconSize = '20px';

    if (this.props.size === 'tiny') {
      iconSize = '14px';
    } else if (this.props.size === 'small') {
      iconSize = '15px';
    }

    const disabledMenu = this.props.disabledMenu;

    return (
      <Button className="rc-button-menu" size={ this.props.size } disabled={ disabledMenu }>
        <div className="rc-button-menu-inner">
          <Icon height={ iconSize } width={ iconSize } type="chevron-down" />
        </div>
      </Button>
    );
  }

  renderDropdown() {
    const target = this.renderDropdownTarget();
    const { size, options, dropdownWidth, disablePortal, dropdownSize } = this.props;

    return (
      <DropdownMenu
        anchor="bottom right"
        size={ dropdownSize || size }
        width={ dropdownWidth }
        margin={ 5 }
        onChange={ this.onOptionClick }
        target={ target }
        options={ options }
        disablePortal={ disablePortal }
      />
    );
  }

  render() {
    const dropdown = this.renderDropdown();
    const { label, size, disabled } = this.props;

    return (
      <div className="rc-split-button">
        <Button
          size={ size }
          onClick={ this.onClick }
          label={ label }
          disabled={ disabled }
          className="rc-button-main"
        />
        { dropdown }
      </div>
    );
  }
}

SplitButton.propTypes = propTypes;
SplitButton.defaultProps = defaultProps;

export default SplitButton;
