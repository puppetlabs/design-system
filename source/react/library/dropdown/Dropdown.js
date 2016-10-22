import React from 'react';
import DropdownMenu from './DropdownMenu';

const propTypes = {
  onChange: React.PropTypes.func,
  options: React.PropTypes.array,
  multiple: React.PropTypes.bool,
  selected: React.PropTypes.oneOfType([
    React.PropTypes.string,
    React.PropTypes.array,
  ]),
};

class Dropdown extends React.Component {
  constructor(props) {
    super(props);

    const selected = Array.isArray(props.selected) ? props.selected : [props.selected];

    this.state = {
      open: false,
      selected,
    };

    this.onClick = this.onClick.bind(this);
    this.onChange = this.onChange.bind(this);
  }

  onClick(e) {
    e.preventDefault();

    this.setState({ open: !this.state.open });
  }

  onChange(selected) {
    this.setState({ selected }, () => {
      if (this.props.onChange) {
        this.props.onChange(selected);
      }
    });
  }

  renderDropdownMenu() {
    let jsx;

    if (this.state.open && this.trigger) {
      jsx = (
        <DropdownMenu
          multiple={ this.props.multiple }
          trigger={ this.trigger }
          onChange={ this.onChange }
          options={ this.props.options }
        />
      );
    }

    return jsx;
  }

  render() {
    const dropdownMenu = this.renderDropdownMenu();

    return (
      <span className="rc-dropdown">
        <a href="dropdown" ref={ (c) => { this.trigger = c; } } onClick={ this.onClick }>
          { this.props.selected }
        </a>
        { dropdownMenu }
      </span>
    );
  }
}

Dropdown.propTypes = propTypes;

export default Dropdown;
