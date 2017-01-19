import React from 'react';
import equals from 'deep-equal';
import DropdownMenu from './DropdownMenu';
import Icon from '../Icon';

const propTypes = {
  onChange: React.PropTypes.func,
  options: React.PropTypes.array,
  hint: React.PropTypes.string,
  blank: React.PropTypes.string,
  label: React.PropTypes.string,
  multiple: React.PropTypes.bool,
  required: React.PropTypes.bool,
  selected: React.PropTypes.oneOfType([
    React.PropTypes.string,
    React.PropTypes.number,
    React.PropTypes.array,
  ]),
};

class Dropdown extends React.Component {
  constructor(props) {
    super(props);

    const selected = this.getSelected();

    this.state = { selected };

    this.onChange = this.onChange.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    const selectedChanged = equals(this.props.selected, nextProps.selected);

    if ({}.hasOwnProperty.call(nextProps, 'selected') && selectedChanged) {
      const selected = this.getSelected();

      this.setState({ selected });
    }
  }

  onChange(option) {
    const prevSelected = this.state.selected;
    const options = this.getOptions();
    let nextSelected = [];

    options.forEach((o) => {
      const id = o.id;
      const wasSelected = prevSelected.indexOf(id) >= 0;

      if (id !== option.id && this.props.multiple && wasSelected) {
        nextSelected.push(id);
      }

      if (id === option.id && !wasSelected) {
        nextSelected.push(id);
      }
    });

    if (this.props.required && nextSelected.length === 0) {
      nextSelected = prevSelected;
    }

    this.setState({ selected: nextSelected }, () => {
      if (this.props.onChange) {
        this.props.onChange(nextSelected);
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

  getSelected() {
    let selected = this.props.selected;

    selected = Array.isArray(selected) ? selected : [selected];

    return selected;
  }

  renderDropdownMenu() {
    const options = this.getOptions();
    const label = this.renderLabel();
    const button = <a className="rc-dropdown-toggle">{ label }</a>;

    return (
      <DropdownMenu
        width="260px"
        margin={ -60 }
        blank={ this.props.blank }
        hint={ this.props.hint }
        multiple={ this.props.multiple }
        target={ button }
        onChange={ this.onChange }
        options={ options }
        selected={ this.state.selected }
        required={ this.props.required }
      />
    );
  }

  renderLabel() {
    const options = this.getOptions();
    const selected = options.filter(e => this.state.selected.indexOf(e.id) >= 0);
    const values = selected.map(s => s.value);
    let label;

    if (this.props.label) {
      label = this.props.label;
    } else {
      if (values.length > 1) {
        const lastIndex = values.length - 1;
        values[lastIndex] = `and ${values[lastIndex]}`;
      }

      if (values.length === 2) {
        label = values.join(' ');
      } else {
        label = values.join(', ');
      }

      if (!label) {
        label = 'Select One';
      }
    }

    return (
      <span className="rc-dropdown-label">
        <span className="rc-dropdown-label-text">{ label }</span> <Icon type="chevron-down" />
      </span>
    );
  }

  render() {
    const dropdownMenu = this.renderDropdownMenu();

    return (
      <span className="rc-dropdown">
        { dropdownMenu }
      </span>
    );
  }
}

Dropdown.propTypes = propTypes;

export default Dropdown;
