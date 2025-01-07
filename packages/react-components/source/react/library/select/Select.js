import React, { Component } from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import OptionMenuList from '../../internal/option-menu-list';
import {
  anchorOrientation,
  optionMenuItemShape,
} from '../../helpers/customPropTypes';
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
    PropTypes.oneOfType([
      PropTypes.shape(optionMenuItemShape),
      PropTypes.shape({
        ...optionMenuItemShape,
        value: PropTypes.arrayOf(PropTypes.shape(optionMenuItemShape)),
      }),
    ]),
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
  actionLabel: PropTypes.string, //eslint-disable-line
  /** Autocomplete prop: Fires when search is updated */
  onFilter: PropTypes.func,
  /** Optional ability to append node (ie. disclaimer) to bottom of menu list */
  footer: PropTypes.node,
  /** Anchor orientation of the dropdown menu */
  anchor: anchorOrientation,
  /** Is a value required?  */
  required: PropTypes.bool,
  /** Is the input disabled?  */
  disabled: PropTypes.bool,
  /** Form error, causing element to render red when present */
  error: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
  /** Optional additional className passed to the outer element */
  className: PropTypes.string,
  /** Optional inline style passed to the outer element */
  style: PropTypes.shape({}),
  /** Control whether the options menu is open or closed with the `open` boolean prop. (Note that, for special cases, because the select dropdown will open when this prop changes to a different and truthy value, you can pass a different string to keep the dropdown open.) */
  open: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
  /** onBlur handler */
  onBlur: PropTypes.func,
};

const defaultProps = {
  options: [],
  applyImmediately: false,
  value: null,
  onChange() {},
  placeholder: 'Select',
  type: 'select',
  onFilter: null,
  footer: null,
  actionLabel: undefined,
  anchor: 'bottom left',
  disabled: false,
  required: false,
  error: '',
  className: '',
  style: {},
  open: null,
  onBlur() {},
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

  static getDerivedStateFromProps(props) {
    if (isControlled(props)) {
      return {
        listValue: props.value,
      };
    }
    return null;
  }

  // If `open` prop is passed as default, let's trigger menu open
  componentDidMount() {
    const { open } = this.props;

    if (open) {
      this.open();
    }
  }

  // If `open` prop is updated, let's trigger menu open
  componentDidUpdate(prevProps) {
    const { open } = this.props;

    if (open && open !== prevProps.open) {
      this.open();
    }
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
    const { onBlur } = this.props;
    if (!this.container.contains(e.relatedTarget)) {
      this.close();
      onBlur();
    }
  }

  onValueChange(listValue) {
    const { onChange, type, onFilter } = this.props;

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

    if (type !== MULTISELECT && type !== AUTOCOMPLETE) {
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

            this.closeAndFocusButton();
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
      switch (e.keyCode) {
        case UP_KEY_CODE: {
          // prevent cursor going to beginning of input
          cancelEvent(e);
          break;
        }
        case DOWN_KEY_CODE: {
          // prevent cursor going to end of input
          cancelEvent(e);
          break;
        }
        case ENTER_KEY_CODE: {
          // prevent form submission
          cancelEvent(e);
          break;
        }
        default:
          break;
      }

      this.setState({ open: !open });
    }
  }

  onFocusItem(focusedIndex) {
    this.setState({ focusedIndex });
  }

  getButtonLabel() {
    const { type, value, placeholder } = this.props;

    if (!value || value.length === 0) {
      return placeholder;
    }

    if (type === MULTISELECT) {
      const selectedOptions = this.getOptions()
        .filter((option) => value.includes(option.value))
        .map((option) => option.selectedLabel || option.label);

      return selectedOptions.join(', ');
    }

    const selectedOption = this.getOptions().find(
      (option) => option.value === value,
    );

    if (!selectedOption) {
      return placeholder;
    }

    return selectedOption.label;
  }

  getOptions() {
    const { options, value, type, onFilter } = this.props;
    let opts = options
      .map((opt) => (Array.isArray(opt.value) ? opt.value : opt))
      .flat();

    // If the ingesting app uses the onFilter event handler, it should provide the filtered options
    // Otherwise, let's filter the presumably static list here
    if (value && type === AUTOCOMPLETE && !onFilter) {
      opts = opts.filter(
        (option) =>
          option.value.toLowerCase().indexOf(value.toLowerCase()) > -1,
      );
    }

    return opts;
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
      open: onOpen,
    } = this;
    const { open, menuStyle, listValue, focusedIndex } = this.state;
    const {
      applyImmediately,
      className,
      disabled,
      error,
      footer,
      name,
      options,
      placeholder,
      required,
      style,
      type,
      value,
      actionLabel,
      onChange,
      onFilter,
      onBlur: onBlurProp,
      ...restProps
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
            aria-expanded={!!open}
            aria-haspopup="listbox"
            aria-owns={`${name}-menu`}
            aria-controls={`${name}-menu`}
            aria-autocomplete="list"
            onFocus={onOpen}
            onClick={onOpen}
            onKeyDown={onKeyDown}
            inputRef={(button) => {
              this.button = button;
            }}
            onChange={onValueChange}
            autoComplete="off"
            {...restProps}
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
              aria-expanded={!!open}
              onClick={onClickButton}
              value={getButtonLabel()}
              placeholder={placeholder}
              aria-label={placeholder}
              ref={(button) => {
                this.button = button;
              }}
              {...restProps}
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
        ref={(container) => {
          this.container = container;
        }}
      >
        {input}
        <OptionMenuList
          id={`${name}-menu`}
          multiple={type === MULTISELECT}
          autocomplete={type === AUTOCOMPLETE}
          showCancel={type === MULTISELECT && !applyImmediately}
          options={options}
          selected={listValue}
          focusedIndex={focusedIndex}
          aria-labelledby={`${name}-label`}
          role="listbox"
          onActionClick={onActionClick}
          onEscape={closeAndFocusButton}
          onChange={onValueChange}
          onFocusItem={onFocusItem}
          footer={footer}
          style={menuStyle}
          actionLabel={getActionLabel(this.props)}
          ref={(menu) => {
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
