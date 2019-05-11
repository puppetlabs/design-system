import React, { Component } from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import Button from '../buttons/Button';
import OptionMenuList from '../../internal/option-menu-list';
import { anchorOrientation } from '../../helpers/customPropTypes';
import Icon from '../icon';
import { getDropdownPosition } from '../../helpers/statics';

const propTypes = {
  /** Unique id */
  id: PropTypes.string.isRequired,
  /** Is this a multiple button select? */
  multiple: PropTypes.bool,
  /** An Array of select options */
  options: PropTypes.arrayOf(
    PropTypes.shape({
      /** Select option value */
      value: PropTypes.string.isRequired,
      /** Select option label */
      label: PropTypes.string.isRequired,
      /** Optional alternate label rendered in the main button element if the option is selected. */
      selectedLabel: PropTypes.string,
      /** Optional icon associated with this option */
      icon: PropTypes.oneOf(Icon.AVAILABLE_ICONS),
    }),
  ),
  /** Currently selected value or values */
  value: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.arrayOf(PropTypes.string),
  ]),
  /** Text rendered when no value is selected */
  placeholder: PropTypes.string,
  /** Main visual variant */
  type: PropTypes.oneOf([
    'primary',
    'secondary',
    'tertiary',
    'danger',
    'transparent',
    'text',
  ]),
  /** Additional property used for connotative variants (such as danger) to choose between a strong and soft version */
  weight: PropTypes.oneOf(['bold', 'subtle']),
  /** Anchor orientation of the dropdown menu */
  anchor: anchorOrientation,
  /** Optional icon to be rendered instead of / in addition to button text. If both an icon and text are present, the icon will be rendered before the text */
  icon: PropTypes.oneOf(Icon.AVAILABLE_ICONS),
  /** Is the button disabled?  */
  disabled: PropTypes.bool,
  /** If true, button will render with a loading spinner */
  loading: PropTypes.bool,
  /** Optional additional className passed to the outer element */
  className: PropTypes.string,
  /** Optional inline style passed to the outer element */
  style: PropTypes.shape({}),
};

const defaultProps = {
  multiple: false,
  options: [],
  value: null,
  placeholder: 'Select',
  type: 'primary',
  weight: 'bold',
  anchor: 'bottom left',
  icon: null,
  loading: false,
  disabled: false,
  className: '',
  style: {},
};

class ButtonSelect extends Component {
  constructor(props) {
    super(props);

    this.state = {
      open: false,
      menuStyle: {},
    };

    this.open = this.open.bind(this);
    this.close = this.close.bind(this);
    this.onClickButton = this.onClickButton.bind(this);
    this.focusButton = this.focusButton.bind(this);
    this.focusMenu = this.focusMenu.bind(this);
    this.closeAndFocusButton = this.closeAndFocusButton.bind(this);
    this.onMenuBlur = this.onMenuBlur.bind(this);
  }

  onClickButton() {
    const { open } = this.state;

    if (open) {
      this.close();
    } else {
      this.open();
    }
  }

  onMenuBlur(e) {
    if (!this.container.contains(e.relatedTarget)) {
      this.close();
    }
  }

  closeAndFocusButton() {
    this.close();
    this.focusButton();
  }

  open() {
    const { anchor } = this.props;

    this.setState(
      { open: true, menuStyle: getDropdownPosition(this.button, anchor, 8) },
      this.focusMenu,
    );
  }

  close() {
    this.setState({ open: false });
  }

  focusMenu() {
    if (this.menu) {
      this.menu.focusMenu();
    }
  }

  focusButton() {
    if (this.button) {
      this.button.focus();
    }
  }

  render() {
    const { open, menuStyle } = this.state;
    const {
      id,
      multiple,
      value,
      placeholder,
      type,
      icon,
      disabled,
      loading,
      options,
      weight,
      className,
      style,
    } = this.props;

    return (
      <div
        className={classNames(
          'rc-button-select',
          {
            'rc-button-select-open': open,
            'rc-button-select-closed': !open,
          },
          className,
        )}
        style={style}
        ref={container => {
          this.container = container;
        }}
      >
        <Button
          type={type}
          weight={weight}
          icon={icon}
          trailingIcon={icon ? null : 'chevron-down'}
          disabled={disabled}
          loading={loading}
          aria-haspopup="true"
          aria-controls={`${id}-menu`}
          aria-expanded={open}
          onClick={this.onClickButton}
          ref={button => {
            this.button = button;
          }}
        >
          {placeholder}
        </Button>
        <OptionMenuList
          id={`${id}-menu`}
          multiple={multiple}
          options={options}
          selected={value}
          aria-labelledby={id}
          onActionClick={this.closeAndFocusButton}
          onBlur={this.onMenuBlur}
          onEscape={this.closeAndFocusButton}
          style={menuStyle}
          ref={menu => {
            this.menu = menu;
          }}
        />
      </div>
    );
  }
}

ButtonSelect.propTypes = propTypes;
ButtonSelect.defaultProps = defaultProps;

export default ButtonSelect;
