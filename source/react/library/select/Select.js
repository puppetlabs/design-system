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
};

const filterOptions = (options, filter) => options
  .filter(o => !filter || o.label.toLowerCase().indexOf(filter.toLowerCase()) > -1);

const formatOptions = options => options.map((o, idx) => {
  let option = o;

  if (typeof o === 'string') {
    option = { id: o, value: o, label: o };
  } else if (typeof o.id === 'undefined') {
    o.id = idx;
  }

  return option;
});

/**
 * `Select` allows the user to select an item from a list. Selects provide for three use cases:
 *   * Selecting an option from a list
 *   * Selecting multiple options from a list
 *   * TODO: Creating a list of options.
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
    this.onChange = this.onChange.bind(this);
    this.onSelect = this.onSelect.bind(this);
    this.onInputChange = this.onInputChange.bind(this);
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
    this.setState({ open: false }, this.close);
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
        this.focusLast();

        break;
      case DOWN_KEY_CODE:
        this.focusNext();

        break;
      default:
        break;
    }
  }

  onSelect(option) {
    const newState = { inputValue: undefined };

    if (option.selectable || typeof option.selectable === 'undefined') {
      if (this.state.selected.indexOf(option) >= 0) {
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

    if (inputValue === '') {
      inputValue = undefined;
    }

    this.setState({ inputValue, pendingBackDelete: false });
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

  getOptions() {
    let options = formatOptions(this.props.options);

    if (this.props.typeahead) {
      options = filterOptions(options, this.state.inputValue);
    }

    return options;
  }

  selectFocused() {
    const options = this.getOptions();
    const selected = options
      .filter(o => o.id === this.state.focusedId)[0];

    if (selected) {
      this.onSelect(selected);
    }
  }

  focusLast() {
    const options = this.getOptions();
    const newState = {};

    if (this.state.focusedId) {
      let newIdx;
      const current = options
        .filter(o => o.id === this.state.focusedId)[0];
      const currentIdx = options.indexOf(current);

      if (currentIdx - 1 < 0) {
        newIdx = options.length - 1;
      } else {
        newIdx = currentIdx - 1;
      }

      newState.focusedId = options[newIdx].id;
    } else {
      newState.focusedId = options[0].id;
    }

    this.setState(newState);
  }

  focusNext() {
    const options = this.getOptions();
    const newState = {};

    if (this.state.focusedId) {
      let newIdx;
      const current = options
        .filter(o => o.id === this.state.focusedId)[0];
      const currentIdx = options.indexOf(current);

      if (currentIdx + 1 >= options.length) {
        newIdx = 0;
      } else {
        newIdx = currentIdx + 1;
      }

      newState.focusedId = options[newIdx].id;
    } else {
      newState.focusedId = options[0].id;
    }

    this.setState(newState);
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
    const options = this.getOptions();

    const selected = this.state.selected
      .map(o => o.id);

    return (
      <Menu.List
        selected={ selected }
        size={ this.props.size }
        options={ options }
        onChange={ this.onSelect }
        onFocus={ this.onFocus }
        focused={ this.state.focusedId }
      />
    );
  }

  renderMenu() {
    const menuList = this.renderMenuList();

    const jsx = (
      <Menu className="rc-select-menu" size={ this.props.size }>
        { menuList }
      </Menu>
    );

    return jsx;
  }

  renderActions() {
    const selected = this.renderSelected();
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

  renderSelected() {
    let selected = [];

    if (this.props.multiple && !this.props.valueless) {
      const selectedCount = this.state.selected.length;

      selected = this.state.selected
        .map((option, index) => (
          <SelectItem
            highlighted={ this.state.pendingBackDelete && index === selectedCount - 1 }
            value={ option.label }
          />
        ));
    }

    return (
      <div className="rc-select-items">
        { selected }
      </div>
    );
  }

  renderInput() {
    const selected = this.renderSelected();
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

    return (
      <div className="rc-select-input">
        { selected }
        { input }
      </div>
    );
  }

  render() {
    const actions = this.renderActions();
    const menu = this.renderMenu();
    const input = this.renderInput();
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
    let jsx = (
      <div className={ className }>
        { input }
      </div>
    );

    if (!this.props.disabled) {
      jsx = (
        <Popover
          ref={ (c) => { this.popover = c; } }
          target={ input }
          disablePortal={ this.props.disablePortal }
          className={ popoverClassName }
          wrapperClassName={ className }
          inheritTargetWidth
          onOpen={ () => { this.setState({ open: true }); } }
          onClose={ () => { this.setState({ open: false }); } }
          margin={ 4 }
          allowBubble
          padding={ false }
        >
          { menu }
        </Popover>
      );
    }

    return (
      <div className={ wrapperClassName }>
        { jsx }
        { actions }
      </div>
    );
  }
}

Select.propTypes = propTypes;
Select.defaultProps = defaultProps;

export default Select;
