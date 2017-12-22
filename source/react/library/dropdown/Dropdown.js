import React from 'react';
import equals from 'deep-equal';
import DropdownMenu from './DropdownMenu';
import DropdownLabel from './DropdownLabel';

const propTypes = {
  size: React.PropTypes.string,
  select: React.PropTypes.bool,
  onChange: React.PropTypes.func,
  options: React.PropTypes.array,
  actions: React.PropTypes.array,
  hint: React.PropTypes.string,
  margin: React.PropTypes.number,
  anchor: React.PropTypes.string,
  placeholder: React.PropTypes.string,
  blank: React.PropTypes.string,
  label: React.PropTypes.string,
  multiple: React.PropTypes.bool,
  required: React.PropTypes.bool,
  disabled: React.PropTypes.bool,
  tabIndex: React.PropTypes.number,
  error: React.PropTypes.string,
  disablePortal: React.PropTypes.bool,
  selected: React.PropTypes.oneOfType([
    React.PropTypes.string,
    React.PropTypes.number,
    React.PropTypes.array,
  ]),
  onActionClick: React.PropTypes.func,
};

const defaultProps = {
  size: '',
  select: false,
  options: [],
  actions: [],
  hint: '',
  margin: -60,
  anchor: '',
  placeholder: '',
  blank: '',
  label: '',
  multiple: false,
  required: false,
  disabled: false,
  tabIndex: 0,
  error: '',
  disablePortal: false,
  selected: null,
  onChange: null,
};

const getSelected = function (props) {
  let selected = props.selected;

  selected = Array.isArray(selected) ? selected : [selected];

  return selected;
};

/**
 * `Dropdpown` displays a list of items.
 *
 * @example ../../../../docs/Dropdown.md
 */

class Dropdown extends React.Component {
  constructor(props) {
    super(props);

    const selected = getSelected(props);

    this.state = { selected, displayed: selected };

    this.onClose = this.onClose.bind(this);
    this.onChange = this.onChange.bind(this);
    this.onApply = this.onApply.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    const selectedChanged = !equals(this.props.selected, nextProps.selected);

    if ({}.hasOwnProperty.call(nextProps, 'selected') && selectedChanged) {
      const selected = getSelected(nextProps);

      this.setState({ selected, displayed: selected });
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
      if (!this.props.multiple) {
        this.setState({ displayed: nextSelected });

        if (this.props.onChange) {
          this.props.onChange(nextSelected);
        }
      }
    });
  }

  onClose() {
    this.setState({ displayed: this.state.selected });

    if (this.props.multiple && this.props.onChange) {
      this.props.onChange(this.state.selected);
    }
  }

  onApply() {
    if (this.props.onChange) {
      this.props.onChange(this.state.selected);
    }
  }

  onActionClick(option) {
    if (this.props.onActionClick) {
      this.props.onActionClick(option);
    }
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

  renderToggle() {
    const options = this.getOptions();
    const selected = options.filter(e => this.state.displayed.indexOf(e.id) >= 0);
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
    }

    return (
      <DropdownLabel
        error={ this.props.error }
        tabIndex={ this.props.tabIndex }
        disabled={ this.props.disabled }
        select={ this.props.select }
        placeholder={ this.props.placeholder }
        label={ label }
      />
    );
  }

  renderDropdownMenu() {
    const options = this.getOptions();
    const button = this.renderToggle();

    return (
      <DropdownMenu
        anchor={ this.props.anchor }
        size={ this.props.size }
        onClose={ this.onClose }
        margin={ this.props.margin }
        blank={ this.props.blank }
        hint={ this.props.hint }
        multiple={ this.props.multiple }
        target={ button }
        onChange={ this.onChange }
        onApply={ this.onApply }
        options={ options }
        actions={ this.props.actions }
        selected={ this.state.selected }
        required={ this.props.required }
        disablePortal={ this.props.disablePortal }
        onActionClick={ this.props.onActionClick }
      />
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
Dropdown.defaultProps = defaultProps;

export default Dropdown;
