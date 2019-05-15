import React, { Component } from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import Button from '../buttons/Button';
import OptionMenuList from '../../internal/option-menu-list';
import { anchorOrientation } from '../../helpers/customPropTypes';
import Icon from '../icon';
import { getDropdownPosition } from '../../helpers/statics';
import withId from '../../helpers/withId';

const propTypes = {
  /**
   * This prop is automatically passed from the withID HOC
   * @ignore
   */
  id: PropTypes.string.isRequired,
  /** Are multiple selections allowed? */
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
    //eslint-disable-line
    PropTypes.string,
    PropTypes.arrayOf(PropTypes.string),
  ]),
  /** Value change handler. Will receive the new value */
  onChange: PropTypes.func,
  /** When in multiple mode, should the selected items be applied immediately? */
  applyImmediately: PropTypes.bool, // eslint-disable-line
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
  /** Text to render as the action label in multiple mode */
  actionLabel: PropTypes.string, //eslint-disable-line
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
  applyImmediately: false,
  value: null,
  onChange() {},
  placeholder: 'Select',
  type: 'primary',
  actionLabel: undefined,
  weight: 'bold',
  anchor: 'bottom left',
  icon: null,
  loading: false,
  disabled: false,
  className: '',
  style: {},
};

const isControlled = ({ multiple, applyImmediately }) =>
  !multiple || applyImmediately;

const getActionLabel = ({ actionLabel, applyImmediately }) =>
  actionLabel || (applyImmediately ? 'Done' : 'Apply');

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
    this.onValueChange = this.onValueChange.bind(this);
    this.onActionClick = this.onActionClick.bind(this);
    this.getButtonLabel = this.getButtonLabel.bind(this);
  }

  static getDerivedStateFromProps(props, state) {
    if (isControlled(props) || !state.open) {
      return {
        listValue: props.value,
      };
    }

    return null;
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

  onValueChange(listValue) {
    const { onChange, multiple } = this.props;

    if (isControlled(this.props)) {
      onChange(listValue);
    } else {
      this.setState({ listValue });
    }

    if (!multiple) {
      this.closeAndFocusButton();
    }
  }

  onActionClick() {
    const { onChange } = this.props;
    const { listValue } = this.state;

    if (!isControlled(this.props)) {
      onChange(listValue);
    }

    this.closeAndFocusButton();
  }

  getButtonLabel() {
    const { placeholder, multiple, options, value } = this.props;

    if (multiple || !value) {
      return placeholder;
    }

    const selectedOption = options.find(option => option.value === value);

    return selectedOption.selectedLabel || selectedOption.label;
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
    const {
      onValueChange,
      onClickButton,
      onMenuBlur,
      closeAndFocusButton,
      onActionClick,
    } = this;
    const { open, menuStyle, listValue } = this.state;
    const {
      id,
      multiple,
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
          className="rc-button-select-target"
          type={type}
          weight={weight}
          icon={icon}
          trailingIcon={icon ? null : 'chevron-down'}
          disabled={disabled}
          loading={loading}
          aria-haspopup="true"
          aria-controls={`${id}-menu`}
          aria-expanded={open}
          onClick={onClickButton}
          ref={button => {
            this.button = button;
          }}
        >
          {this.getButtonLabel()}
        </Button>
        <OptionMenuList
          id={`${id}-menu`}
          multiple={multiple}
          options={options}
          selected={listValue}
          aria-labelledby={id}
          onActionClick={onActionClick}
          onBlur={onMenuBlur}
          onEscape={closeAndFocusButton}
          onChange={onValueChange}
          style={menuStyle}
          actionLabel={getActionLabel(this.props)}
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

export default withId(ButtonSelect);
