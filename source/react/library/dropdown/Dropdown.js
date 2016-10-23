import React from 'react';
import DropdownMenu from './DropdownMenu';

const propTypes = {
  onChange: React.PropTypes.func,
  options: React.PropTypes.array,
  hint: React.PropTypes.string,
  multiple: React.PropTypes.bool,
  required: React.PropTypes.bool,
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
    this.setState({ open: false, selected }, () => {
      if (this.props.onChange) {
        this.props.onChange(selected);
      }
    });
  }

  getOptions() {
    return this.props.options.map((o) => {
      let obj;

      if (typeof o === 'string') {
        obj = { id: o, value: o };
      } else {
        obj = o;
      }

      return obj;
    });
  }

  renderDropdownMenu() {
    const options = this.getOptions();
    let jsx;

    if (this.state.open && this.trigger) {
      jsx = (
        <DropdownMenu
          width="260px"
          hint={ this.props.hint }
          multiple={ this.props.multiple }
          trigger={ this.trigger }
          onChange={ this.onChange }
          options={ options }
          selected={ this.state.selected }
        />
      );
    }

    return jsx;
  }

  renderLabel() {
    const options = this.getOptions();
    const selected = options.filter(e => this.state.selected.indexOf(e.id) >= 0);
    const values = selected.map(s => s.value);
    let label;

    if (values.length > 1) {
      const lastIndex = values.length - 1;
      values[lastIndex] = `and ${values[lastIndex]}`;
      label = values;
    } else {
      label = values;
    }

    label = values.join(', ');

    if (!label) {
      label = 'Select One';
    }

    return <span className="rc-dropdown-label">{ label }</span>;
  }

  render() {
    const dropdownMenu = this.renderDropdownMenu();
    const label = this.renderLabel();

    return (
      <span className="rc-dropdown">
        <a href="dropdown" ref={ (c) => { this.trigger = c; } } onClick={ this.onClick }>
          { label }
        </a>
        { dropdownMenu }
      </span>
    );
  }
}

Dropdown.propTypes = propTypes;

export default Dropdown;
