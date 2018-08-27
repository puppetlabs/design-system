import PropTypes from 'prop-types';
import React from 'react';
import clone from 'clone';
import classnames from 'classnames';

import {
  ENTER_KEY_CODE,
  DOWN_KEY_CODE,
  BACK_KEY_CODE,
  TAB_KEY_CODE,
  ESC_KEY_CODE,
  UP_KEY_CODE,
} from '../../constants';

import Icon from '../icon/Icon';
import Input from '../input/Input';
import Menu from '../menu';
import Popover from '../popover/Popover';
import Button from '../buttons/Button';

import SelectItem from './SelectItem';

const propTypes = {
  name: PropTypes.string,
  autoOpen: PropTypes.bool,
  onSelect: PropTypes.func,
  options: PropTypes.arrayOf(
    PropTypes.oneOfType([PropTypes.string, PropTypes.shape({})]),
  ),
  disabled: PropTypes.bool,
  multiple: PropTypes.bool,
  typeahead: PropTypes.bool,
  clearable: PropTypes.bool,
  valueless: PropTypes.bool,
  className: PropTypes.string,
  placeholder: PropTypes.string,
  disablePortal: PropTypes.bool,
  onPendingDeleteChange: PropTypes.func,
  onNewOption: PropTypes.func,
  newOptionLabel: PropTypes.string,
  popoverClassName: PropTypes.string,
  size: PropTypes.oneOf(['tiny', 'small', 'medium']),
  selected: PropTypes.oneOfType([PropTypes.string, PropTypes.array]),
};

const defaultProps = {
  onPendingDeleteChange: () => {},
  placeholder: 'Select...',
  disablePortal: false,
  clearable: false,
  valueless: false,
  typeahead: true,
  disabled: false,
  multiple: false,
  autoOpen: false,
  onSelect: null,
  className: '',
  size: 'medium',
  options: [],
  name: '',
  newOptionLabel: 'Add new',
  selected: null,
  popoverClassName: '',
  onNewOption: null,
};

const getNextIdx = (currentIdx, options) => {
  let newIdx;

  if (currentIdx + 1 >= options.length) {
    newIdx = 0;
  } else {
    newIdx = currentIdx + 1;
  }

  return newIdx;
};

const getLastIdx = (currentIdx, options) => {
  let newIdx;

  if (currentIdx - 1 < 0) {
    newIdx = options.length - 1;
  } else {
    newIdx = currentIdx - 1;
  }

  return newIdx;
};

const filterOptions = (options, filter) =>
  options.filter(
    o => !filter || o.label.toLowerCase().indexOf(filter.toLowerCase()) > -1,
  );

const formatOptions = options => {
  // we should never modify props due to object reference issues so we make a clone of the options
  // prop that gets passed in
  const clonedOptions = clone(options);

  return clonedOptions.map(o => {
    let option = o;

    if (typeof o === 'string') {
      option = { id: o, value: o, label: o };
    } else if (typeof o.id === 'undefined') {
      option.id = o.value;
    }

    return option;
  });
};

const selectOptions = (selected, options) => {
  let newOptions = options;

  // If a selected prop is set then override any selected key values on the options provided
  if (selected) {
    let selectedArray = Array.isArray(selected) ? selected : [selected];

    selectedArray = selectedArray.map(s => (s.value ? s.value : s));

    newOptions = options.map(o => {
      const option = o;

      option.selected = selectedArray.indexOf(option.value) >= 0;

      return option;
    });
  }

  return newOptions.filter(o => o.selected);
};

const hasClass = (elem, className) => {
  if (!elem.className) {
    return false;
  }

  const classes = elem.className.split(' ');

  return classes.findIndex(c => c === className) >= 0;
};

const updateScrollPosition = ({ list }) => {
  const parent = list.parentElement;
  const children = Array.from(list.children);
  const selectedChildren = children.filter(c =>
    hasClass(c, 'rc-menu-item-focused'),
  );

  if (selectedChildren.length) {
    const selected = selectedChildren[0];
    const selectedIndex = children.indexOf(selected);
    const siblings = children.slice(0, selectedIndex);

    if (siblings.length) {
      const heights = siblings.map(e => e.getBoundingClientRect().height);
      const top = heights.reduce((c, t) => c + t);

      parent.scrollTop = top;
    } else {
      parent.scrollTop = 0;
    }
  }
};

/**
 * `Select` allows the user to select an item from a list. Selects provide for three use cases:
 *   * Selecting an option from a list
 *   * Selecting multiple options from a list
 *   * Creating a list of options.
 *
 * `Select` is a stateful component but allows the user to modify the state by passing an updated
 * `options` prop, or listen to changes to the state by passing a callback to the `onSelect` prop.
 */
class Select extends React.Component {
  constructor(props) {
    super(props);

    const formattedOptions = formatOptions(props.options);
    const selected = selectOptions(props.selected, formattedOptions);

    this.state = {
      pendingBackDelete: false,
      inputValue: undefined,
      focusedId: null,
      open: false,
      selected,
    };

    this.onKeyUp = this.onKeyUp.bind(this);
    this.onKeyDownClear = this.onKeyDownClear.bind(this);
    this.onKeyDownChevron = this.onKeyDownChevron.bind(this);
    this.onClear = this.onClear.bind(this);
    this.onRemove = this.onRemove.bind(this);
    this.onChange = this.onChange.bind(this);
    this.onSelect = this.onSelect.bind(this);
    this.onPopoverOpen = this.onPopoverOpen.bind(this);
    this.onInputChange = this.onInputChange.bind(this);
    this.onPopoverClose = this.onPopoverClose.bind(this);
    this.onChevronClick = this.onChevronClick.bind(this);
  }

  componentDidMount() {
    const { autoOpen } = this.props;

    if (autoOpen) {
      this.open();
    }
  }

  componentWillReceiveProps(newProps) {
    const formattedOptions = formatOptions(newProps.options);
    const selected = selectOptions(newProps.selected, formattedOptions);

    this.setState({ selected });
  }

  onKeyDownClear(e) {
    if (e.keyCode === ENTER_KEY_CODE) {
      this.onClear(e);
    }
  }

  onKeyDownChevron(e) {
    if (e.keyCode === ENTER_KEY_CODE) {
      this.onChevronClick(e);
    }
  }

  onChange(selected, option) {
    const { multiple, onSelect } = this.props;
    let selection = selected;

    if (!multiple) {
      [selection] = selected;
    }

    if (onSelect) {
      onSelect(selection, option);
    }
  }

  onClear(e) {
    if (e) {
      e.preventDefault();
    }

    this.onChange([]);

    this.clearInput();
    this.setState({ open: false, pendingBackDelete: false }, this.close);
  }

  onRemove(optionId) {
    const { selected } = this.state;
    const removed = selected.filter(o => o.id === optionId)[0];
    const selection = selected.filter(o => o.id !== optionId);

    this.setState({ selected: selection }, () => {
      this.onChange(selection, removed);
    });
  }

  onBackPress() {
    const {
      inputValue,
      pendingBackDelete,
      selected: selectedState,
    } = this.state;
    const { onPendingDeleteChange } = this.props;

    if (typeof inputValue !== 'undefined') {
      return;
    }
    const newState = {};

    if (pendingBackDelete) {
      const selected = selectedState;
      const removed = selected.pop();

      this.onChange(selected, removed);

      newState.selected = selected;
      newState.pendingBackDelete = false;
    } else {
      newState.pendingBackDelete = true;
    }

    onPendingDeleteChange(newState.pendingBackDelete);
    this.setState(newState);
  }

  onChevronClick(e) {
    if (e) {
      e.preventDefault();
    }

    this.open();
  }

  onPopoverOpen() {
    this.setState({ open: true });
  }

  onPopoverClose() {
    this.setState({
      pendingBackDelete: false,
      open: false,
    });
  }

  onKeyUp(e) {
    switch (e.keyCode) {
      case BACK_KEY_CODE:
        this.onBackPress();

        break;
      case TAB_KEY_CODE:
      case ESC_KEY_CODE:
        this.setState({ open: false }, this.close);

        break;
      case ENTER_KEY_CODE:
        this.selectFocused();

        break;
      case UP_KEY_CODE:
        this.focus('last');

        break;
      case DOWN_KEY_CODE:
        this.focus('next');

        break;
      default:
        break;
    }
  }

  onSelect(option) {
    const newState = {
      pendingBackDelete: false,
      inputValue: undefined,
      focusedId: null,
    };

    const { selected } = this.state;
    const { clearable, multiple, valueless } = this.props;

    if (option.selectable || typeof option.selectable === 'undefined') {
      if (selected.map(s => s.id).indexOf(option.id) >= 0 && clearable) {
        newState.selected = selected.filter(o => o.id !== option.id);
      } else if (multiple) {
        newState.selected = [...selected, option];
      } else {
        newState.selected = [option];
      }
    }

    // We want to leave this open if we're acting like a multiselect.
    if (!multiple || valueless) {
      newState.open = false;

      this.close();
    }

    // Focus the input again so the user can keep typing.
    if (multiple) {
      this.input.focus();
    }

    this.onChange(newState.selected || selected, option);

    this.setState(newState);
  }

  onInputChange(e) {
    let inputValue = e.target.value;
    const { multiple } = this.props;

    // Clear the full inputValue out for multiselects to allow user to use backspace to delete
    // existing items. TODO: Clean this up somehow.
    if (inputValue === '' && multiple) {
      inputValue = undefined;
    }

    const newState = {
      pendingBackDelete: false,
      inputValue,
    };

    const options = this.getOptions(inputValue);

    if (options.length === 1) {
      newState.focusedId = options[0].id;
    }

    this.setState(newState);
  }

  getInputValue() {
    let value = '';
    const { inputValue, selected } = this.state;
    const { multiple } = this.props;

    if (typeof inputValue !== 'undefined') {
      value = inputValue;
    } else if (selected.length && !multiple) {
      value = selected[0].label;
    }

    return value;
  }

  getOptions(filter) {
    const { options: optionsProp, typeahead } = this.props;
    let options = formatOptions(optionsProp);

    if (typeahead) {
      options = filterOptions(options, filter);
    }

    return options;
  }

  selectFocused() {
    const { inputValue, focusedId } = this.state;
    const options = this.getOptions(inputValue);
    let focused;

    // Select either the focused option, or the first option in the list.
    if (focusedId) {
      [focused] = options.filter(o => o.id === focusedId);
    } else {
      [focused] = options;
    }

    this.onSelect(focused);
  }

  focus(direction) {
    const { inputValue, focusedId } = this.state;
    const options = this.getOptions(inputValue);
    const newState = {};

    if (focusedId) {
      let newIdx;
      const current = options.filter(o => o.id === focusedId)[0];
      const currentIdx = options.indexOf(current);

      switch (direction) {
        case 'next':
          newIdx = getNextIdx(currentIdx, options);

          break;
        case 'last':
          newIdx = getLastIdx(currentIdx, options);

          break;
        default:
          break;
      }

      newState.focusedId = options[newIdx].id;
    } else {
      newState.focusedId = options[0].id;
    }

    this.setState(newState, () => {
      updateScrollPosition(this.menuList);
    });
  }

  clearInput() {
    this.setState({ inputValue: undefined, selected: [] });
  }

  open() {
    this.popover.open();
    this.input.focus();
  }

  close() {
    const { onPendingDeleteChange } = this.props;
    this.popover.close();
    this.input.blur();

    this.setState({ pendingBackDelete: false });
    onPendingDeleteChange(false);
  }

  renderMenuList() {
    const { inputValue, selected: selectedState, focusedId } = this.state;
    const { size } = this.props;
    const options = this.getOptions(inputValue);

    const selected = selectedState.map(o => o.id);

    return (
      <Menu.List
        ref={c => {
          this.menuList = c;
        }}
        selected={selected}
        size={size}
        options={options}
        onChange={this.onSelect}
        onFocus={this.onFocus}
        focused={focusedId}
      />
    );
  }

  renderNewOptionControls() {
    let jsx;
    const { onNewOption, newOptionLabel } = this.props;

    if (onNewOption) {
      jsx = (
        <Menu.Actions centered>
          <Menu.Actions.Buttons>
            <Button primary simple onClick={onNewOption} icon="plus">
              {newOptionLabel}
            </Button>
          </Menu.Actions.Buttons>
        </Menu.Actions>
      );
    }

    return jsx;
  }

  renderMenu() {
    const { size } = this.props;
    const menuList = this.renderMenuList();
    const actions = this.renderNewOptionControls();
    const className = classnames('rc-select-menu-options', {
      'rc-no-bottom-radius': actions,
    });

    const jsx = (
      <Menu className="rc-select-menu" size={size}>
        <Menu.Section className={className}>{menuList}</Menu.Section>
        {actions}
      </Menu>
    );

    return jsx;
  }

  renderActions() {
    const { selected } = this.state;
    const { clearable } = this.props;
    const value = this.getInputValue();
    const actions = [];

    if (clearable && (value || selected.length)) {
      actions.push(
        // eslint-disable-next-line jsx-a11y/anchor-is-valid
        <a
          key="clear"
          role="button"
          tabIndex={0}
          className="rc-select-action"
          onClick={this.onClear}
          onKeyDown={this.onKeyDownClear}
        >
          <Icon width="10px" height="10px" type="close" />
        </a>,
      );
    }

    actions.push(
      // eslint-disable-next-line jsx-a11y/anchor-is-valid
      <a
        key="open"
        role="button"
        tabIndex={0}
        className="rc-select-action"
        onClick={this.onChevronClick}
        onKeyDown={this.onKeyDownChevron}
      >
        <Icon width="12px" height="12px" type="chevron-down" />
      </a>,
    );

    return <div className="rc-select-actions">{actions}</div>;
  }

  renderContent() {
    const { multiple, valueless, size } = this.props;
    const { selected: selectedState, pendingBackDelete } = this.state;
    const input = this.renderInput();
    let selected = [];

    if (multiple && !valueless) {
      const selectedCount = selectedState.length;

      selected = selectedState.map((option, index) => (
        <SelectItem
          onRemove={() => this.onRemove(option.id)}
          key={`select-item-${option.id}`}
          highlighted={pendingBackDelete && index === selectedCount - 1}
          value={option.label}
          size={size}
        />
      ));
    }

    return (
      <div className="rc-select-content">
        {selected}
        {input}
      </div>
    );
  }

  renderInput() {
    const {
      multiple,
      valueless,
      placeholder: placeholderProp,
      size,
      disabled,
      name,
    } = this.props;
    const { selected } = this.state;
    let placeholder;

    if (!multiple || !selected.length || valueless) {
      placeholder = placeholderProp;
    }

    const input = (
      <Input
        dropdown
        autoComplete={false}
        placeholder={placeholder}
        name={name}
        onKeyUp={this.onKeyUp}
        onChange={this.onInputChange}
        value={this.getInputValue()}
        size={size}
        ref={c => {
          this.input = c;
        }}
        disabled={disabled}
      />
    );

    return input;
  }

  render() {
    const { open } = this.state;
    const {
      popoverClassName,
      className,
      disabled,
      multiple,
      size,
      disablePortal,
    } = this.props;
    const actions = this.renderActions();
    const items = this.renderContent();
    const wrapperClassName = classnames('rc-select-wrapper', {
      'rc-select-wrapper-open': open === true,
    });
    const popoverClassNames = classnames(
      'rc-select-popover',
      'rc-popover-visible-overflow',
      popoverClassName,
    );
    const classNames = classnames(
      'rc-select',
      'rc-select-popover-wrapper',
      className,
      {
        'rc-select-disabled': disabled,
        'rc-select-multiple': multiple,
        [`rc-select-${size}`]: size,
      },
    );

    const content = (
      <div className="rc-select-input">
        {items}
        {actions}
      </div>
    );
    let jsx;

    // If the Select is disabled, there's no need to render the whole Popover ordeal.
    if (disabled) {
      jsx = <div className={classNames}>{content}</div>;
    } else {
      const menu = this.renderMenu();

      jsx = (
        <Popover
          ref={c => {
            this.popover = c;
          }}
          target={content}
          disablePortal={disablePortal}
          className={popoverClassNames}
          wrapperClassName={classNames}
          inheritTargetWidth
          onOpen={this.onPopoverOpen}
          onClose={this.onPopoverClose}
          margin={4}
          allowBubble
          border={false}
          padding={false}
        >
          {menu}
        </Popover>
      );
    }

    return <div className={wrapperClassName}>{jsx}</div>;
  }
}

Select.propTypes = propTypes;
Select.defaultProps = defaultProps;

export default Select;
