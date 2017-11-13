import React from 'react';
import classnames from 'classnames';

import Icon from '../Icon';
import Input from '../Input';
import Menu from '../menu/Menu';
import MenuList from '../menu/MenuList';

const propTypes = {
  autoOpen: React.PropTypes.bool,
  onSelect: React.PropTypes.func,
  options: React.PropTypes.array,
  className: React.PropTypes.string,
  placeholder: React.PropTypes.string,
  size: React.PropTypes.oneOf(['small', 'tiny']),
};

const defaultProps = {
  placeholder: 'Select...',
  onSelect: () => {},
  autoOpen: false,
  size: 'small',
  options: [],
};

const formatOptions = options => options.map((o, idx) => {
  let option = o;

  if (typeof o === 'string') {
    option = { id: o, value: o, label: o };
  } else if (typeof o.id === 'undefined') {
    o.id = idx;
  }

  return option;
});

const shouldComponentUpdate = (currentOptions, newOptions) => {
  let update = false;
  newOptions = formatOptions(newOptions);

  newOptions.forEach((option, i) => {
    if (!update && currentOptions[i].id !== option.id) {
      update = true;
    }
  });

  return update;
};

/**
 * `Select` allows the user to select an item from a list.
 */
class Select extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      inputValue: undefined,
      open: this.props.autoOpen,
      options: formatOptions(props.options),
    };

    this.onSelect = this.onSelect.bind(this);
    this.onInputClick = this.onInputClick.bind(this);
  }

  componentDidMount() {
    if (this.props.autoOpen) {
      this.input.focus();
    }
  }

  componentWillReceiveProps(newProps) {
    if (shouldComponentUpdate(newProps.options, this.state.options)) {
      // TODO: conditionally do this
      this.setState({ options: formatOptions(newProps.options) });
    }
  }

  onInputClick() {
    this.setState({ open: true });
  }

  onSelect(option) {
    const options = this.state.options.map((o) => {
      if (o.id === option.id) {
        o.selected = true;
      } else {
        o.selected = false;
      }

      return o;
    });

    this.props.onSelect(option);
    this.setState({
      inputValue: undefined,
      open: false,
      options,
    });
  }

  getCurrentValue() {
    let value = '';

    if (typeof this.state.inputValue !== 'undefined') {
      value = this.state.inputValue;
    } else {
      this.state.options.forEach((option) => {
        if (option.selected) {
          value = option.label;
        }
      });
    }

    return value;
  }

  renderOption(o) {
    const className = classnames('rc-select-menu-item', {
      'rc-select-menu-item-selected': o.selected,
    });

    return (
      <a
        href=""
        onClick={ e => e && e.preventDefault() }
        className={ className }
        onMouseDown={ this.onSelect(o) }
        key={ o.id }
      >
        { o.label }
      </a>
    );
  }

  renderMenuList() {
    let selected;
    const menuItemProps = {
      onClick: () => {},
    }

    selected = this.state.options.filter(o => o.selected);

    if (selected && selected.length) {
      selected = selected[0].id;
    }

    return (
      <MenuList
        selected={ selected }
        options={ this.state.options }
        onChange={ this.onSelect }
        menuItemProps={ menuItemProps }
      />
    );
  }

  renderMenu() {
    let jsx;

    if (this.state.open) {
      const menuList = this.renderMenuList();
//      const options = this.state.options.map(o => this.renderOption(o));

      jsx = (
        <Menu className="rc-select-menu" size={ this.props.size }>
          { menuList }
        </Menu>
      );
    }

    return jsx;
  }

  renderInput() {
    const input = (
      <Input
        dropdown
        onClick={ this.onInputClick }
        onChange={ e => this.setState({ inputValue: e.target.value }) }
        value={ this.getCurrentValue() }
        size={ this.props.size }
//        onBlur={ () => this.setState({ open: false }) }
        ref={ (c) => { this.input = c; } }
        focused={ this.state.open }
        onFocus={ () => this.setState({ open: true }) }
        placeholder={ this.props.placeholder }
      />
    );

    return (
      <div className="rc-select-input">
        { input }
        <Icon width="10px" height="10px" type="chevron-down" />
      </div>
    );
  }

  render() {
    const menu = this.renderMenu();
    const input = this.renderInput();
    const className = classnames('rc-select', this.props.className, {
      open: this.state.open,
      small: this.props.size === 'small',
      tiny: this.props.size === 'tiny',
    });

    return (
      <div className={ className }>
        { input }
        { menu }
      </div>
    );
  }
}

Select.propTypes = propTypes;
Select.defaultProps = defaultProps;

export default Select;
