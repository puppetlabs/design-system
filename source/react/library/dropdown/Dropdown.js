import PropTypes from 'prop-types';
import React from 'react';
import equals from 'deep-equal';
import DropdownMenu from './DropdownMenu';
import DropdownLabel from './DropdownLabel';

const propTypes = {
  size: PropTypes.string,
  select: PropTypes.bool,
  onChange: PropTypes.func,
  options: PropTypes.array,
  actions: PropTypes.any,
  hint: PropTypes.string,
  margin: PropTypes.number,
  anchor: PropTypes.string,
  placeholder: PropTypes.string,
  blank: PropTypes.string,
  label: PropTypes.string,
  multiple: PropTypes.bool,
  required: PropTypes.bool,
  disabled: PropTypes.bool,
  tabIndex: PropTypes.number,
  error: PropTypes.string,
  disablePortal: PropTypes.bool,
  selected: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
    PropTypes.array,
  ]),
  onActionClick: PropTypes.func,
};

const defaultProps = {
  select: false,
  options: [],
  hint: '',
  margin: -60,
  placeholder: '',
  blank: '',
  label: '',
  multiple: false,
  required: false,
  disabled: false,
  tabIndex: 0,
  error: '',
  selected: [],
  disablePortal: false,
  onChange: null,
};

const getSelected = (props) => {
  let selected = props.selected;

  if (!Array.isArray(selected) && typeof selected !== 'undefined') {
    selected = [selected];
  }

  return selected;
};

/**
 * `Dropdpown` displays a list of items which are selectable by the user.
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
    const hasMultiple = nextProps.selected.length > 1;

    if ({}.hasOwnProperty.call(nextProps, 'selected') && (selectedChanged || hasMultiple)) {
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
    const selected = this.state.selected
      .map(s => (typeof s === 'string' ? s : s.id));

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
        selected={ selected }
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
