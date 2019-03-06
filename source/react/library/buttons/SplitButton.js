import PropTypes from 'prop-types';
import React from 'react';
import classnames from 'classnames';
import Button from './Button';
import DropdownMenu from '../dropdown/DropdownMenu';

const propTypes = {
  options: PropTypes.arrayOf(PropTypes.object).isRequired,
  /** Primary button label */
  label: PropTypes.string.isRequired,
  className: PropTypes.string,
  processing: PropTypes.bool,
  dropdownWidth: PropTypes.string,
  dropdownSize: PropTypes.string,
  /** Whether or not to render the Menu in a Portal */
  disablePortal: PropTypes.bool,
  disabled: PropTypes.bool,
  disabledMenu: PropTypes.bool,
  menuStatus: PropTypes.oneOf(['processing', 'success', 'disabled']),
  size: PropTypes.oneOf(['medium', 'small', 'tiny']),
  secondary: PropTypes.bool,
  /** Primary button click handler */
  onClick: PropTypes.func.isRequired,
  /** Option click handler */
  onOptionClick: PropTypes.func.isRequired,
};

const defaultProps = {
  processing: false,
  dropdownWidth: '125px',
  disablePortal: false,
  disabled: false,
  disabledMenu: false,
  className: '',
  dropdownSize: 'small',
  menuStatus: null,
  size: null,
  secondary: false,
};

/**
 * `SplitButton` is a `Button` with a `Dropdown`.
 */

class SplitButton extends React.Component {
  constructor(props) {
    super(props);

    this.onClick = this.onClick.bind(this);
    this.onOptionClick = this.onOptionClick.bind(this);
  }

  onClick() {
    const { onClick } = this.props;
    if (onClick) {
      onClick();
    }
  }

  onOptionClick(option) {
    const { onOptionClick } = this.props;
    if (onOptionClick && typeof option !== 'undefined') {
      onOptionClick(option);
    }
  }

  renderDropdownTarget() {
    const { menuStatus, disabledMenu, secondary } = this.props;

    return (
      <Button
        className="rc-split-button-menu"
        disabled={disabledMenu}
        type={secondary ? 'secondary' : 'primary'}
        icon={menuStatus === 'success' ? 'check' : 'chevron-down'}
        loading={menuStatus === 'processing'}
      />
    );
  }

  renderDropdown() {
    const target = this.renderDropdownTarget();
    const {
      size,
      options,
      dropdownWidth,
      disablePortal,
      dropdownSize,
    } = this.props;

    return (
      <DropdownMenu
        anchor="bottom right"
        size={dropdownSize || size}
        width={dropdownWidth}
        margin={5}
        onChange={this.onOptionClick}
        target={target}
        options={options}
        disablePortal={disablePortal}
      />
    );
  }

  render() {
    const dropdown = this.renderDropdown();
    const {
      label,
      size,
      disabled,
      processing,
      className,
      secondary,
    } = this.props;

    return (
      <div className={classnames('rc-split-button', className)}>
        <Button
          loading={processing}
          size={size}
          onClick={this.onClick}
          disabled={disabled}
          className="rc-split-button-main"
          type={secondary ? 'secondary' : 'primary'}
        >
          {label}
        </Button>
        {dropdown}
      </div>
    );
  }
}

SplitButton.propTypes = propTypes;
SplitButton.defaultProps = defaultProps;

export default SplitButton;
