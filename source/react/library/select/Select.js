import React, { Component } from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import OptionMenuList from '../../internal/option-menu-list';
import { anchorOrientation } from '../../helpers/customPropTypes';
import Icon from '../icon';
import SelectTarget from './SelectTarget';
import { getDropdownPosition, focus } from '../../helpers/statics';

const propTypes = {
  /** Unique id */
  name: PropTypes.string.isRequired,
  /** An Array of select options */
  options: PropTypes.arrayOf(
    PropTypes.shape({
      /** Select option value */
      value: PropTypes.string.isRequired,
      /** Select option label */
      label: PropTypes.string.isRequired,
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
  /**
   * When in multiselect mode, should the selected items be applied immediately?
   * @ignore
   */
  applyImmediately: PropTypes.bool, // eslint-disable-line
  /** Text rendered when no value is selected */
  placeholder: PropTypes.string,
  /**
   * Select or multiselect. This is a secret prop as multiselection is not fully supported
   *
   * @ignore
   */
  type: PropTypes.oneOf(['select', 'multiselect']),
  /**
   * Text to render as the action label in multiple mode
   * @ignore
   */
  actionLabel: PropTypes.string, //eslint-disable-line
  /** Anchor orientation of the dropdown menu */
  anchor: anchorOrientation,
  /** Is a value required?  */
  required: PropTypes.bool,
  /** Is the input disabled?  */
  disabled: PropTypes.bool,
  /** Form error, causing element to render red when present */
  error: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
  /** Optional additional className passed to the outer element */
  className: PropTypes.string,
  /** Optional inline style passed to the outer element */
  style: PropTypes.shape({}),
};

const defaultProps = {
  options: [],
  applyImmediately: false,
  value: null,
  onChange() {},
  placeholder: 'Select',
  type: 'select',
  actionLabel: undefined,
  anchor: 'bottom left',
  disabled: false,
  required: false,
  error: '',
  className: '',
  style: {},
};

const isControlled = ({ type, applyImmediately }) =>
  type !== 'multiselect' || applyImmediately;

const getActionLabel = ({ actionLabel, applyImmediately }) =>
  actionLabel || (applyImmediately ? 'Done' : 'Apply');

class Select extends Component {
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
    this.onBlur = this.onBlur.bind(this);
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

  onBlur(e) {
    if (!this.container.contains(e.relatedTarget)) {
      this.close();
    }
  }

  onValueChange(listValue) {
    const { onChange, type } = this.props;

    if (isControlled(this.props)) {
      onChange(listValue);
    } else {
      this.setState({ listValue });
    }

    if (type !== 'multiselect') {
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
    const { type, options, value } = this.props;

    if (type === 'multiselect' || !value) {
      return null;
    }

    const selectedOption = options.find(option => option.value === value);

    return selectedOption.label;
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
    focus(this.button);
  }

  render() {
    const {
      onValueChange,
      onClickButton,
      onBlur,
      closeAndFocusButton,
      onActionClick,
    } = this;
    const { open, menuStyle, listValue } = this.state;
    const {
      name,
      type,
      disabled,
      options,
      className,
      style,
      error,
      value,
      placeholder,
      required,
    } = this.props;

    return (
      <div
        className={classNames(
          'rc-select',
          {
            'rc-select-open': open,
            'rc-select-closed': !open,
          },
          className,
        )}
        style={style}
        onBlur={onBlur}
        ref={container => {
          this.container = container;
        }}
      >
        <SelectTarget
          id={`${name}-label`}
          disabled={disabled}
          error={error}
          aria-haspopup="true"
          aria-controls={`${name}-menu`}
          aria-expanded={open}
          onClick={onClickButton}
          value={this.getButtonLabel()}
          placeholder={placeholder}
          ref={button => {
            this.button = button;
          }}
        />
        <input
          type="hidden"
          name={name}
          value={value || ''}
          required={required}
        />
        <OptionMenuList
          id={`${name}-menu`}
          multiple={type === 'multiselect'}
          options={options}
          selected={listValue}
          aria-labelledby={`${name}-label`}
          onActionClick={onActionClick}
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

Select.propTypes = propTypes;
Select.defaultProps = defaultProps;

export default Select;
