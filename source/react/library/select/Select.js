import PropTypes from 'prop-types';
import React from 'react';
import clone from 'clone';
import classnames from 'classnames';

import {
  ENTER_KEY_CODE,
  DOWN_KEY_CODE,
  TAB_KEY_CODE,
  ESC_KEY_CODE,
  UP_KEY_CODE,
} from '../../constants';

import Icon from '../icon/Icon';
import Loading from '../loading/Loading';
import Input from '../input/Input';
import Menu from '../menu';
import Popover from '../popover/Popover';
import Button from '../buttons/Button';
import Text from '../text/Text';

import Tag from '../tag/Tag';

const propTypes = {
  /** Input name */
  name: PropTypes.string.isRequired,
  /** Select type. 'select' is the default single-select, where 'multiselect' allows multiple options */
  type: PropTypes.oneOf(['select', 'multiselect']),
  /** Current value of the input. Should be a string for 'select' type and an array for 'multiline' */
  value: (props, ...rest) => {
    if (props.type === 'select') {
      return PropTypes.string(props, ...rest);
    }

    return PropTypes.arrayOf(PropTypes.string)(props, ...rest);
  },
  /** If true the select will automatically open on mount */
  autoOpen: PropTypes.bool,
  /** Change handler. Passed the new value */
  onChange: PropTypes.func,
  /** Array of select options. TODO: standardize this API */
  options: PropTypes.arrayOf(
    PropTypes.oneOfType([PropTypes.string, PropTypes.shape({})]),
  ),
  /** Is the input disabled? */
  disabled: PropTypes.bool,
  /** Is data for the Select loading */
  loading: PropTypes.bool,
  /** Placeholder text to show while loading */
  loadingText: PropTypes.string,
  /** Is the input required? */
  required: PropTypes.bool,
  /** If true, the user is free to type in the input box, automatically filtering results. TODO: determine if this is still default true */
  typeahead: PropTypes.bool,
  /** If true an 'x' icon button will render next to the input for clearing */
  clearable: PropTypes.bool,
  /** Optional override to hide value display, for certain cases when the values are displayed elsewhere */
  valueless: PropTypes.bool,
  /** Input placeholder */
  placeholder: PropTypes.string,
  /** Disables default 'portal' usage, rendering menu in normal dom structure */
  disablePortal: PropTypes.bool,
  /** Optional boolean flag that adds a custom action at the bottom of the dropdown
   * @ignore
   */
  newOption: PropTypes.bool,
  /** Handler for when the user clicks the custom action at the bottom of the dropdown
   * @ignore
   */
  onNewOption: PropTypes.func,
  /** Label for the custom actions shown at bottom of the dropdown
   * @ignore
   */
  newOptionLabel: PropTypes.string,
  /** Custom user-provided className */
  className: PropTypes.string,
  /** Custom user-provided inline styles */
  style: PropTypes.shape({}),
  /** Text to render when no options are present */
  noResultsLabel: PropTypes.string,
  /** Custom user styles for popover. TODO: Maybe remove this prop */
  popoverClassName: PropTypes.string,
};

const defaultProps = {
  placeholder: '',
  value: null,
  type: 'select',
  disablePortal: false,
  clearable: false,
  valueless: false,
  typeahead: true,
  disabled: false,
  loading: false,
  loadingText: 'Loading...',
  required: false,
  autoOpen: false,
  onChange() {},
  className: '',
  style: {},
  options: [],
  noResultsLabel: 'No results found',
  popoverClassName: '',
  newOption: false,
  onNewOption: null,
  newOptionLabel: 'Add new',
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

const selectOptions = (value, options) => {
  let newOptions = options;

  // If a value prop is set then override any selected key values on the options provided
  if (value) {
    let selectedArray = Array.isArray(value) ? value : [value];

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
    const selected = selectOptions(props.value, formattedOptions);

    this.state = {
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
    const selected = selectOptions(newProps.value, formattedOptions);

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

  onChange(selected, changed) {
    const { type, onChange } = this.props;
    let selection = selected.map(s => s.value);

    if (type === 'select') {
      [selection] = selection;
    }

    onChange(selection, changed);
  }

  onClear(e) {
    if (e) {
      e.preventDefault();
    }

    this.onChange([]);

    this.clearInput();
    this.setState({ open: false }, this.close);
  }

  onRemove(optionId) {
    const { selected } = this.state;
    const removed = selected.filter(o => o.id === optionId)[0];
    const selection = selected.filter(o => o.id !== optionId);

    this.setState({ selected: selection }, () => {
      this.onChange(selection, removed);
    });
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
    const { selected, inputValue } = this.state;
    const { type } = this.props;

    // TODO: multi-select input validation
    if (type === 'select') {
      const hasInvalidInput = inputValue && inputValue !== selected[0];

      // If no option is selected, clear input
      // If an option was selected, but the input is now invalid, revert to last selected
      if (!selected.length || hasInvalidInput) {
        const option = selected.length ? selected[0] : {};
        this.clearInput();

        if (hasInvalidInput) {
          this.onSelect(option);
        }
      }
    }

    this.setState({
      open: false,
    });
  }

  onKeyUp(e) {
    switch (e.keyCode) {
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
      inputValue: undefined,
      focusedId: null,
    };

    const { selected } = this.state;
    const { clearable, type, valueless } = this.props;

    if (option.selectable || typeof option.selectable === 'undefined') {
      if (selected.map(s => s.id).indexOf(option.id) >= 0 && clearable) {
        newState.selected = selected.filter(o => o.id !== option.id);
      } else if (type === 'multiselect') {
        newState.selected = [...selected, option];
      } else {
        newState.selected = [option];
      }
    }

    // We want to leave this open if we're acting like a multiselect.
    if (type === 'select' || valueless) {
      newState.open = false;

      this.close();
    }

    // Focus the input again so the user can keep typing.
    if (type === 'multiselect') {
      this.input.focus();
    }

    this.onChange(newState.selected || selected, option);

    this.setState(newState);
  }

  onInputChange(value) {
    let inputValue = value;
    const { type } = this.props;

    // Clear the full inputValue out for multiselects to allow user to use backspace to delete
    // existing items. TODO: Clean this up somehow.
    if (inputValue === '' && type === 'multiselect') {
      inputValue = undefined;
    }

    const newState = {
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
    const { type } = this.props;

    if (typeof inputValue !== 'undefined') {
      value = inputValue;
    } else if (selected.length && type === 'select') {
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
    this.popover.close();
    this.input.blur();
  }

  renderMenuList() {
    const { inputValue, selected: selectedState, focusedId } = this.state;
    const options = this.getOptions(inputValue);

    const selected = selectedState.map(o => o.id);

    return (
      <Menu.List
        ref={c => {
          this.menuList = c;
        }}
        selected={selected}
        options={options}
        onChange={this.onSelect}
        onFocus={this.onFocus}
        focused={focusedId}
      />
    );
  }

  renderNewOptionControls() {
    let jsx;
    const { newOption, onNewOption, newOptionLabel } = this.props;

    if (newOption) {
      jsx = (
        <Menu.Actions centered>
          <Menu.Actions.Buttons>
            <Button simple onClick={onNewOption} icon="plus">
              {newOptionLabel}
            </Button>
          </Menu.Actions.Buttons>
        </Menu.Actions>
      );
    }

    return jsx;
  }

  renderMenu() {
    const { noResultsLabel } = this.props;
    let menuList = this.renderMenuList();
    if (!menuList.props.options.length) {
      menuList = (
        <Text color="subtle" className="rc-menu-item">
          {noResultsLabel}
        </Text>
      );
    }
    const actions = this.renderNewOptionControls();
    const className = classnames('rc-select-menu-options', {
      'rc-no-bottom-radius': actions,
    });

    const jsx = (
      <Menu className="rc-select-menu">
        <Menu.Section className={className}>{menuList}</Menu.Section>
        {actions}
      </Menu>
    );

    return jsx;
  }

  renderActions() {
    const { selected } = this.state;
    const { clearable, disabled, loading } = this.props;
    const value = this.getInputValue();
    const actions = [];

    if (clearable && !disabled && !loading && (value || selected.length)) {
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
          <Icon style={{ height: '10px', width: '10px' }} type="close" />
        </a>,
      );
    }

    if (loading) {
      actions.push(<Loading style={{ height: '12px', width: '12px' }} />);
    }

    if (!loading) {
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
          <Icon type="chevron-down" size="small" />
        </a>,
      );
    }

    return <div className="rc-select-actions">{actions}</div>;
  }

  renderContent() {
    const { type, valueless } = this.props;
    const { selected: selectedState } = this.state;
    const input = this.renderInput();
    let selected = [];

    if (type === 'multiselect' && !valueless) {
      selected = selectedState.map(option => (
        <Tag
          onRemove={() => this.onRemove(option.id)}
          key={`select-item-${option.id}`}
        >
          {option.label}
        </Tag>
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
      type,
      placeholder: placeholderProp,
      disabled,
      loading,
      loadingText,
      name,
      required,
      valueless,
    } = this.props;
    const { selected } = this.state;
    let placeholder;

    if (type === 'select' || !selected.length || valueless) {
      placeholder = placeholderProp;
    }
    if (loading) placeholder = loadingText;

    const input = (
      <Input
        autoComplete="off"
        placeholder={placeholder}
        name={name}
        onKeyUp={this.onKeyUp}
        onChange={this.onInputChange}
        value={this.getInputValue()}
        required={required}
        inputRef={c => {
          this.input = c;
        }}
        disabled={disabled || loading}
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
      loading,
      type,
      disablePortal,
      style,
    } = this.props;
    const actions = this.renderActions();
    const items = this.renderContent();
    const wrapperClassNames = classnames(
      'rc-select-wrapper',
      {
        'rc-select-wrapper-open': open === true,
        'rc-select-wrapper-loading': loading === true,
      },
      className,
    );
    const popoverClassNames = classnames(
      'rc-select-popover',
      'rc-popover-visible-overflow',
      popoverClassName,
    );
    const classNames = classnames('rc-select', 'rc-select-popover-wrapper', {
      'rc-select-disabled': disabled || loading,
      'rc-select-multiple': type === 'multiselect',
    });

    const content = (
      <div className="rc-select-input">
        {items}
        {actions}
      </div>
    );
    let jsx;

    // If the Select is disabled, there's no need to render the whole Popover ordeal.
    if (disabled || loading) {
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

    return (
      <div className={wrapperClassNames} style={style}>
        {jsx}
      </div>
    );
  }
}

Select.propTypes = propTypes;
Select.defaultProps = defaultProps;

export default Select;
