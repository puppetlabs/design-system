import React, { Component } from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import OptionMenuList from '../../internal/option-menu-list';
import { anchorOrientation } from '../../helpers/customPropTypes';
import Icon from '../icon';
import Input from '../input';
import SelectTarget from './SelectTarget';
import { getDropdownPosition, focus, cancelEvent } from '../../helpers/statics';
import {
  ENTER_KEY_CODE,
  DOWN_KEY_CODE,
  UP_KEY_CODE,
  ESC_KEY_CODE,
} from '../../constants';

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
  /** Autocomplete prop: Fires when search is updated */
  onFilter: PropTypes.func,
  /** Autocomplete prop: Is the list being filtered? */
  filtering: PropTypes.bool,
  /** Autocomplete prop: Are there more results? */
  paginated: PropTypes.bool,
  /** Autocomplete prop: How should we relay that more results exist? */
  paginationWarning: PropTypes.string,
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
  paginated: false,
  paginationWarning: 'Viewing the first page of results.',
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
    this.onFocusItem = this.onFocusItem.bind(this);
    this.getButtonLabel = this.getButtonLabel.bind(this);
    this.getOptions = this.getOptions.bind(this);
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
    const { onChange, type, onFilter, options } = this.props;

    if (isControlled(this.props)) {
      onChange(listValue);
    } else {
      this.setState({ listValue });
    }

    if (type === AUTOCOMPLETE) {
      if (onFilter) {
        onFilter(listValue);
      }

      this.setState({ focusedIndex: 0 });
    }

    if (options.filter(option => option.value === listValue).length) {
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
  // When we introduce hooks, we should combine this logic under a custom `useFocusIndex` hook.

  // For use in conjunction with autocomplete
  onKeyDown(e) {
    const filteredOptions = this.getOptions();
    const { focusedIndex, open } = this.state;

    if (open) {
      switch (e.keyCode) {
        case UP_KEY_CODE: {
          cancelEvent(e);

          if (focusedIndex === 0) return;

          this.setState({ focusedIndex: focusedIndex - 1 });
          break;
        }
        case DOWN_KEY_CODE: {
          cancelEvent(e);

          if (focusedIndex + 1 === filteredOptions.length) return;

          this.setState({ focusedIndex: focusedIndex + 1 });
          break;
        }
        case ENTER_KEY_CODE: {
          cancelEvent(e);

          if (filteredOptions[focusedIndex]) {
            this.onValueChange(filteredOptions[focusedIndex].value);
          }
          break;
        }
        case ESC_KEY_CODE: {
          cancelEvent(e);

          this.closeAndFocusButton();
          break;
        }
        default:
          break;
      }
    } else {
      this.setState({ open: !open });
    }
  }

  onFocusItem(focusedIndex) {
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

  getOptions() {
    const { options, value, type } = this.props;

    let filteredOptions = options;

    if (value && type === AUTOCOMPLETE) {
      filteredOptions = options.filter(
        option => option.value.toLowerCase().indexOf(value.toLowerCase()) > -1,
      );
    }

    return filteredOptions;
  }

  closeAndFocusButton() {
    this.focusButton();
    this.close();
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
      onFocusItem,
      getOptions,
      open: onOpen,
    } = this;
    const { open, menuStyle, listValue, focusedIndex } = this.state;
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
      paginated,
      paginationWarning,
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
            aria-label={placeholder}
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
              aria-label={placeholder}
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
          options={getOptions()}
          selected={listValue}
          focusedIndex={focusedIndex}
          aria-labelledby={`${name}-label`}
          role="listbox"
          onActionClick={onActionClick}
          onEscape={closeAndFocusButton}
          onChange={onValueChange}
          onFocusItem={onFocusItem}
          filtering={filtering}
          paginated={paginated}
          paginationWarning={paginationWarning}
          style={menuStyle}
          actionLabel={getActionLabel(this.props)}
          ref={menu => {
            this.menu = menu;
          }}
          tabIndex={type === AUTOCOMPLETE ? -1 : 0}
        />
      </div>
    );
  }
}

Select.propTypes = propTypes;
Select.defaultProps = defaultProps;

export default Select;
