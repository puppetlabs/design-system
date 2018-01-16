import React from 'react';
import classnames from 'classnames';

import {
  ENTER_KEY_CODE,
  DOWN_KEY_CODE,
  BACK_KEY_CODE,
  TAB_KEY_CODE,
  ESC_KEY_CODE,
  UP_KEY_CODE,
} from '../../constants';

import Icon from '../Icon';
import Input from '../Input';
import Menu from '../menu';
import Popover from '../Popover';
import Button from '../Button';

import SelectItem from './SelectItem';

const propTypes = {
  name: React.PropTypes.string,
  autoOpen: React.PropTypes.bool,
  onSelect: React.PropTypes.func,
  options: React.PropTypes.array,
  disabled: React.PropTypes.bool,
  multiple: React.PropTypes.bool,
  typeahead: React.PropTypes.bool,
  clearable: React.PropTypes.bool,
  valueless: React.PropTypes.bool,
  className: React.PropTypes.string,
  placeholder: React.PropTypes.string,
  disablePortal: React.PropTypes.bool,
  onPendingDeleteChange: React.PropTypes.func,
  onNewOption: React.PropTypes.func,
  newOptionLabel: React.PropTypes.string,
  popoverClassName: React.PropTypes.string,
  size: React.PropTypes.oneOf(['small', 'medium']),
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

const filterOptions = (options, filter) => options
  .filter(o => !filter || o.label.toLowerCase().indexOf(filter.toLowerCase()) > -1);

const formatOptions = options => options.map((o) => {
  let option = o;

  if (typeof o === 'string') {
    option = { id: o, value: o, label: o };
  } else if (typeof o.id === 'undefined') {
    o.id = o.value;
  }

  return option;
});

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
  const selected = children.find(c => hasClass(c, 'rc-menu-item-focused'));

  if (selected) {
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

    const selected = formatOptions(props.options)
      .filter(o => o.selected);

    this.state = {
      pendingBackDelete: false,
      inputValue: undefined,
      focusedId: null,
      open: false,
      selected,
    };

    this.onKeyUp = this.onKeyUp.bind(this);
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
    if (this.props.autoOpen) {
      this.open();
    }
  }

  componentWillReceiveProps(newProps) {
    const selected = formatOptions(newProps.options)
      .filter(o => o.selected);

    this.setState({ selected });
  }

  onChange(selected, option) {
    if (!this.props.multiple) {
      selected = selected[0];
    }

    if (this.props.onSelect) {
      this.props.onSelect(selected, option);
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
    const removed = this.state.selected
      .filter(o => o.id === optionId)[0];
    const selected = this.state.selected
      .filter(o => o.id !== optionId);

    this.setState({ selected }, () => {
      this.onChange(selected, removed);
    });
  }

  onBackPress() {
    if (typeof this.state.inputValue !== 'undefined') {
      return;
    }
    const newState = {};

    if (this.state.pendingBackDelete) {
      const selected = this.state.selected;
      const removed = selected.pop();

      this.onChange(selected, removed);

      newState.selected = selected;
      newState.pendingBackDelete = false;
    } else {
      newState.pendingBackDelete = true;
    }

    this.props.onPendingDeleteChange(newState.pendingBackDelete);
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

    if (option.selectable || typeof option.selectable === 'undefined') {
      if (this.state.selected.map(s => s.id).indexOf(option.id) >= 0) {
        newState.selected = this.state.selected.filter(o => o.id !== option.id);
      } else if (this.props.multiple) {
        newState.selected = [...this.state.selected, option];
      } else {
        newState.selected = [option];
      }
    }

    // We want to leave this open if we're acting like a multiselect.
    if (!this.props.multiple || this.props.valueless) {
      newState.open = false;

      this.close();
    }

    // Focus the input again so the user can keep typing.
    if (this.props.multiple) {
      this.input.focus();
    }

    this.onChange(newState.selected || this.state.selected, option);

    this.setState(newState);
  }

  onInputChange(e) {
    let inputValue = e.target.value;

    // Clear the full inputValue out for multiselects to allow user to use backspace to delete
    // existing items. TODO: Clean this up somehow.
    if (inputValue === '' && this.props.multiple) {
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

    if (typeof this.state.inputValue !== 'undefined') {
      value = this.state.inputValue;
    } else if (this.state.selected.length && !this.props.multiple) {
      value = this.state.selected[0].label;
    }

    return value;
  }

  getOptions(filter) {
    let options = formatOptions(this.props.options);

    if (this.props.typeahead) {
      options = filterOptions(options, filter);
    }

    return options;
  }

  selectFocused() {
    const options = this.getOptions(this.state.inputValue);
    let focused;

    // Select either the focused option, or the first option in the list.
    if (this.state.focusedId) {
      focused = options
        .filter(o => o.id === this.state.focusedId)[0];
    } else {
      focused = options[0];
    }

    this.onSelect(focused);
  }

  focus(direction) {
    const options = this.getOptions(this.state.inputValue);
    const newState = {};

    if (this.state.focusedId) {
      let newIdx;
      const current = options
        .filter(o => o.id === this.state.focusedId)[0];
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

    this.setState(newState, () => { updateScrollPosition(this.menuList); });
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

    this.setState({ pendingBackDelete: false });
    this.props.onPendingDeleteChange(false);
  }

  renderMenuList() {
    const options = this.getOptions(this.state.inputValue);

    const selected = this.state.selected
      .map(o => o.id);

    return (
      <Menu.List
        ref={ (c) => { this.menuList = c; } }
        selected={ selected }
        size={ this.props.size }
        options={ options }
        onChange={ this.onSelect }
        onFocus={ this.onFocus }
        focused={ this.state.focusedId }
      />
    );
  }

  renderNewOptionControls() {
    let jsx;

    if (this.props.onNewOption) {
      jsx = (
        <Menu.Actions centered>
          <Menu.Actions.Buttons>
            <Button primary simple onClick={ this.props.onNewOption } icon="plus">
              { this.props.newOptionLabel }
            </Button>
          </Menu.Actions.Buttons>
        </Menu.Actions>
      );
    }

    return jsx;
  }

  renderMenu() {
    const menuList = this.renderMenuList();

    const jsx = (
      <Menu className="rc-select-menu" size={ this.props.size }>
        <Menu.Section className="rc-select-menu-options">
          { menuList }
        </Menu.Section>
        { this.renderNewOptionControls() }
      </Menu>
    );

    return jsx;
  }

  renderActions() {
    const selected = this.state.selected;
    const value = this.getInputValue();
    const actions = [];

    if (this.props.clearable && (value || selected.length)) {
      actions.push(
        <a key="clear" role="button" tabIndex={ 0 } className="rc-select-action" onClick={ this.onClear } >
          <Icon width="10px" height="100%" type="close" />
        </a>,
      );
    }

    actions.push(
      <a key="open" role="button" tabIndex={ 0 } className="rc-select-action" onClick={ this.onChevronClick } >
        <Icon width="10px" height="100%" type="chevron-down" />
      </a>,
    );

    return (
      <div className="rc-select-actions">
        { actions }
      </div>
    );
  }

  renderContent() {
    const input = this.renderInput();
    let selected = [];

    if (this.props.multiple && !this.props.valueless) {
      const selectedCount = this.state.selected.length;

      selected = this.state.selected
        .map((option, index) => (
          <SelectItem
            onRemove={ () => this.onRemove(option.id) }
            key={ `select-item-${option.id}` }
            highlighted={ this.state.pendingBackDelete && index === selectedCount - 1 }
            value={ option.label }
          />
        ));
    }

    return (
      <div className="rc-select-content">
        { selected }
        { input }
      </div>
    );
  }

  renderInput() {
    const selected = this.state.selected;
    let placeholder;

    if (!this.props.multiple || !selected.length) {
      placeholder = this.props.placeholder;
    }

    const input = (
      <Input
        dropdown
        placeholder={ placeholder }
        name={ this.props.name }
        onKeyUp={ this.onKeyUp }
        onChange={ this.onInputChange }
        value={ this.getInputValue() }
        size={ this.props.size }
        ref={ (c) => { this.input = c; } }
        disabled={ this.props.disabled }
      />
    );

    return input;
  }

  render() {
    const actions = this.renderActions();
    const items = this.renderContent();
    const wrapperClassName = classnames('rc-select-wrapper', {
      'rc-select-wrapper-open': this.state.open === true,
    });
    const popoverClassName =
      classnames('rc-select-popover', 'rc-popover-visible-overflow', this.props.popoverClassName);
    const className = classnames('rc-select', 'rc-select-popover-wrapper', this.props.className, {
      'rc-select-disabled': this.props.disabled,
      'rc-select-multiple': this.props.multiple,
      [`rc-select-${this.props.size}`]: this.props.size,
    });

    const content = (
      <div className="rc-select-input">
        { items }
        { actions }
      </div>
    );
    let jsx;

    // If the Select is disabled, there's no need to render the whole Popover ordeal.
    if (this.props.disabled) {
      jsx = (
        <div className={ className }>
          { content }
        </div>
      );
    } else {
      const menu = this.renderMenu();

      jsx = (
        <Popover
          ref={ (c) => { this.popover = c; } }
          target={ content }
          disablePortal={ this.props.disablePortal }
          className={ popoverClassName }
          wrapperClassName={ className }
          inheritTargetWidth
          onOpen={ this.onPopoverOpen }
          onClose={ this.onPopoverClose }
          margin={ 4 }
          allowBubble
          border={ false }
          padding={ false }
        >
          { menu }
        </Popover>
      );
    }

    return (
      <div className={ wrapperClassName }>
        { jsx }
      </div>
    );
  }
}

Select.propTypes = propTypes;
Select.defaultProps = defaultProps;

export default Select;
