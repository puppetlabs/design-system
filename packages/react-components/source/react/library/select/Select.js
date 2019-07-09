import React, { Component } from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import OptionMenuList from '../../internal/option-menu-list';
import { anchorOrientation } from '../../helpers/customPropTypes';
import Icon from '../icon';
import Input from '../input';
import SelectTarget from './SelectTarget';
import { getDropdownPosition, focus } from '../../helpers/statics';
import { ENTER_KEY_CODE, DOWN_KEY_CODE, UP_KEY_CODE } from '../../constants';

const SELECT = 'select';
const MULTISELECT = 'multiselect';
const AUTOCOMPLETE = 'autocomplete';

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
  /** Select or autocomplete. Multiselection is NOT yet fully supported */
  type: PropTypes.oneOf([SELECT, AUTOCOMPLETE, MULTISELECT]),
  /**
   * Text to render as the action label in multiple mode
   * @ignore
   */
  /** Menulist filtering handler. For use with autocomplete. Will receive the user input */
  onFilter: PropTypes.func,
  /** Is the menulist being filtered? */
  filtering: PropTypes.bool,
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
  onFilter: null,
  filtering: false,
  actionLabel: undefined,
  anchor: 'bottom left',
  disabled: false,
  required: false,
  error: '',
  className: '',
  style: {},
};

const isControlled = ({ type, applyImmediately }) =>
  type !== MULTISELECT || applyImmediately;

const getActionLabel = ({ actionLabel, applyImmediately }) =>
  actionLabel || (applyImmediately ? 'Done' : 'Apply');

class Select extends Component {
  constructor(props) {
    super(props);

    this.state = {
      open: false,
      menuStyle: {},
      // The focused menulist item index
      focusedIndex: 0,
      // The options that match the user's input
      filteredOptions: props.options,
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
    this.onKeyDown = this.onKeyDown.bind(this);
    this.onMouseEnterItem = this.onMouseEnterItem.bind(this);
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
    const { onChange, type, options, onFilter } = this.props;

    if (isControlled(this.props)) {
      onChange(listValue);
    } else {
      this.setState({ listValue });
    }

    if (type === AUTOCOMPLETE) {
      if (onFilter) {
        onFilter(listValue);
      } else {
        const filteredOptions = options.filter(
          option =>
            option.value.toLowerCase().indexOf(listValue.toLowerCase()) > -1,
        );

        this.setState({ filteredOptions, focusedIndex: 0 });
      }
    }

    if (type === SELECT) {
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

  // TODO: We now have key handling here in Select and also in the OptionMenuList.
  // When we introduce hooks, we should refactor and merge this logic.

  // For use in conjunction with autocomplete
  onKeyDown(e) {
    const { filteredOptions, focusedIndex } = this.state;

    // User pressed the enter key, update input value
    if (e.keyCode === ENTER_KEY_CODE) {
      this.onValueChange(filteredOptions[focusedIndex].value);
    }
    // User pressed the up arrow, decrement the index
    else if (e.keyCode === UP_KEY_CODE) {
      if (focusedIndex === 0) {
        return;
      }

      this.setState({ focusedIndex: focusedIndex - 1 });
    }
    // User pressed the down arrow, increment the index
    else if (e.keyCode === DOWN_KEY_CODE) {
      if (focusedIndex + 1 === filteredOptions.length) {
        return;
      }

      this.setState({ focusedIndex: focusedIndex + 1 });
    }
  }

  onMouseEnterItem(focusedIndex) {
    this.setState({ focusedIndex });
  }

  getButtonLabel() {
    const { type, options, value } = this.props;

    if (type === MULTISELECT || !value) {
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
    const { type } = this.props;

    if (this.menu && !(type === AUTOCOMPLETE)) {
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
      getButtonLabel,
      onKeyDown,
      onMouseEnterItem,
      open: onOpen,
    } = this;
    const {
      open,
      menuStyle,
      listValue,
      filteredOptions,
      focusedIndex,
    } = this.state;
    const {
      name,
      type,
      disabled,
      className,
      style,
      error,
      value,
      placeholder,
      required,
      filtering,
    } = this.props;

    let input;

    switch (type) {
      case 'autocomplete':
        input = (
          <Input
            id={`${name}-label`}
            role="combobox"
            type="text"
            name={name}
            value={value || ''}
            placeholder={placeholder}
            required={required}
            disabled={disabled}
            error={error}
            aria-expanded={open}
            aria-haspopup="listbox"
            aria-owns={`${name}-menu`}
            aria-controls={`${name}-menu`}
            aria-autocomplete="list"
            onFocus={onOpen}
            onClick={onOpen}
            onKeyDown={onKeyDown}
            inputRef={button => {
              this.button = button;
            }}
            onChange={onValueChange}
          />
        );
        break;
      default:
        input = (
          <>
            <SelectTarget
              id={`${name}-label`}
              disabled={disabled}
              error={error}
              aria-haspopup="listbox"
              aria-controls={`${name}-menu`}
              aria-expanded={open}
              onClick={onClickButton}
              value={getButtonLabel()}
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
          </>
        );
        break;
    }

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
        {input}
        <OptionMenuList
          id={`${name}-menu`}
          multiple={type === MULTISELECT}
          options={filteredOptions}
          selected={listValue}
          focusedIndex={focusedIndex}
          aria-labelledby={`${name}-label`}
          role="listbox"
          onActionClick={onActionClick}
          onEscape={closeAndFocusButton}
          onChange={onValueChange}
          onMouseEnterItem={onMouseEnterItem}
          filtering={filtering}
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
