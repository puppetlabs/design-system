import PropTypes from 'prop-types';
import React from 'react';
import equals from 'deep-equal';
import DropdownMenu from './DropdownMenu';
import DropdownLabel from './DropdownLabel';

const propTypes = {
  size: PropTypes.string,
  select: PropTypes.bool,
  onChange: PropTypes.func,
  options: PropTypes.arrayOf(PropTypes.object),
  actions: PropTypes.node,
  title: PropTypes.string,
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
  anchor: 'bottom left',
  actions: null,
  size: 'small',
  select: false,
  options: [],
  title: '',
  margin: 8,
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
  onActionClick: null,
};

const getSelected = ({ selected }) => {
  if (!Array.isArray(selected) && typeof selected !== 'undefined') {
    return [selected];
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
    const { selected } = this.props;
    const selectedChanged = !equals(selected, nextProps.selected);
    const hasMultiple = nextProps.selected.length > 1;

    if (
      {}.hasOwnProperty.call(nextProps, 'selected') &&
      (selectedChanged || hasMultiple)
    ) {
      const newSelection = getSelected(nextProps);
      this.setState({ selected: newSelection, displayed: newSelection });
    }
  }

  onChange(option) {
    const { selected: prevSelected } = this.state;
    const { multiple, required, onChange } = this.props;
    const options = this.getOptions();
    let nextSelected = [];

    options.forEach(o => {
      const { id } = o;
      const wasSelected = prevSelected.indexOf(id) >= 0;

      if (id !== option.id && multiple && wasSelected) {
        nextSelected.push(id);
      }

      if (id === option.id && !wasSelected) {
        nextSelected.push(id);
      }
    });

    if (required && nextSelected.length === 0) {
      nextSelected = prevSelected;
    }

    this.setState({ selected: nextSelected }, () => {
      if (!multiple) {
        this.setState({ displayed: nextSelected });

        if (onChange) {
          onChange(nextSelected);
        }
      }
    });
  }

  onClose() {
    const { selected } = this.state;
    const { multiple, onChange } = this.props;
    this.setState({ displayed: selected });

    if (multiple && onChange) {
      onChange(selected);
    }
  }

  onApply() {
    const { onChange } = this.props;
    const { selected } = this.state;
    if (onChange) {
      onChange(selected);
    }
  }

  onActionClick(option) {
    const { onActionClick } = this.props;
    if (onActionClick) {
      onActionClick(option);
    }
  }

  getOptions() {
    const { options } = this.props;
    return options.map(o => {
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
    const { displayed } = this.state;
    const {
      label: propsLabel,
      error,
      tabIndex,
      disabled,
      select,
      placeholder,
    } = this.props;
    const options = this.getOptions();
    const selected = options.filter(e => displayed.indexOf(e.id) >= 0);
    const values = selected.map(s => s.value);
    let label;

    if (propsLabel) {
      label = propsLabel;
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
        error={error}
        tabIndex={tabIndex}
        disabled={disabled}
        select={select}
        placeholder={placeholder}
        label={label}
      />
    );
  }

  renderDropdownMenu() {
    const { selected: selectedState } = this.state;
    const {
      anchor,
      size,
      margin,
      blank,
      title,
      multiple,
      actions,
      required,
      disablePortal,
      onActionClick,
    } = this.props;
    const options = this.getOptions();
    const button = this.renderToggle();
    const selected = selectedState.map(s => (typeof s === 'string' ? s : s.id));

    return (
      <DropdownMenu
        anchor={anchor}
        size={size}
        onClose={this.onClose}
        margin={margin}
        blank={blank}
        title={title}
        multiple={multiple}
        target={button}
        onChange={this.onChange}
        onApply={this.onApply}
        options={options}
        actions={actions}
        selected={selected}
        required={required}
        disablePortal={disablePortal}
        onActionClick={onActionClick}
      />
    );
  }

  render() {
    const dropdownMenu = this.renderDropdownMenu();

    return <span className="rc-dropdown">{dropdownMenu}</span>;
  }
}

Dropdown.propTypes = propTypes;
Dropdown.defaultProps = defaultProps;

export default Dropdown;
