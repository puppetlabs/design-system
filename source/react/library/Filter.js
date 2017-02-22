import React from 'react';
import Select from 'react-select';
import clone from 'clone';
import equals from 'deep-equal';
import Input from './Input';
import SplitButton from './SplitButton';

const propTypes = {
  onDelete: React.PropTypes.func.isRequired,
  fields: React.PropTypes.array.isRequired,
  onDuplicate: React.PropTypes.func,
  onChange: React.PropTypes.func,
  filter: React.PropTypes.shape({
    field: React.PropTypes.string,
    value: React.PropTypes.oneOfType([
      React.PropTypes.string,
      React.PropTypes.number,
    ]),
    op: React.PropTypes.string,
  }),
};

const defaultProps = {
  onChange: () => {},
  filter: {
    field: '',
    op: '',
    value: '',
  },
};

const isValid = filter => !!(filter.field && filter.op && filter.value);

class Filter extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      filter: props.filter,
      valid: isValid(props.filter),
    };

    this.onFilterChange = this.onFilterChange.bind(this);
    this.onOptionSelect = this.onOptionSelect.bind(this);
    this.onDropdownSelect = this.onDropdownSelect.bind(this);
  }

  componentWillReceiveProps(newProps) {
    if (!equals(newProps.filter, this.state.filter)) {
      const valid = isValid(newProps.filter);

      this.setState({ filter: newProps.filter, valid });
    }
  }

  componentDidUpdate(oldProps, oldState) {
    if (this.state.valid && !oldState.valid) {
      this.props.onChange(this.state.filter);
    } else if (!equals(oldState.filter, this.state.filter) && this.state.valid) {
      this.props.onChange(this.state.filter);
    }
  }

  onFilterChange(prop, value) {
    const newFilter = clone(this.state.filter);
    newFilter[prop] = value;

    this.setState({ filter: newFilter });
  }

  onOptionSelect(type) {
    return value => {
      this.onFilterChange(type, value);
    };
  }

  onDropdownSelect(option) {
    switch (option.value) {
      case 'Duplicate':
        this.props.onDuplicate();
        break;
      case 'Delete':
        this.props.onDelete();
        break;
      default:
        // do nothing
    }
  }

  renderSplitButton() {
    const dropdownOptions = [
      { value: 'Delete', id: 1 },
    ];

    if (this.props.onDuplicate) {
      dropdownOptions.push(
        { value: 'Duplicate', id: 0 },
      );
    }

    return (
      <SplitButton
        size="small"
        onOptionClick={ this.onDropdownSelect }
        onClick={ this.props.onDelete }
        options={ dropdownOptions }
        label="Delete"
        dropdownWidth="100px"
        disablePortal
      />
    );
  }

  renderFieldSelect(fields) {
    return (
      <Select
        name="field-select"
        placeholder="Field"
        value={ this.state.filter.field }
        options={ fields }
        onChange={ this.onOptionSelect('field') }
        clearable={ false }
        className="Select-small Select-left"
      />
    );
  }

  renderOperatorSelect() {
    const operators = [
      { value: '>', label: 'Greater than', type: 'operator', id: 0 },
      { value: '<', label: 'Less than', type: 'operator', id: 1 },
      { value: '=', label: 'Equal to', type: 'operator', id: 2 },
      { value: '>=', label: 'Greater than or Equal to', type: 'operator', id: 3 },
      { value: '<=', label: 'Less than or Equal to', type: 'operator', id: 4 },
    ];

    return (
      <Select
        name="operator-select"
        placeholder="Operator"
        value={ this.state.filter.op }
        options={ operators }
        onChange={ this.onOptionSelect('op') }
        clearable={ false }
        className="Select-small Select-right"
      />
    );
  }

  renderValueInput() {
    const onChange = e => {
      this.onFilterChange('value', e.target.value);
    };

    const onBlur = () => {
      const valid = isValid(this.state.filter);

      this.setState({ valid });
    };

    const onFocus = () => {
      this.setState({ valid: false });
    };

    return (
      <Input
        placeholder="Value"
        value={ this.state.filter.value }
        onChange={ onChange }
        onFocus={ onFocus }
        onBlur={ onBlur }
        size="small"
      />
    );
  }

  render() {
    const splitButton = this.renderSplitButton();
    const fieldSelect = this.renderFieldSelect(this.props.fields);
    const operatorSelect = this.renderOperatorSelect();
    const valueInput = this.renderValueInput();

    return (
      <div className="rc-filter-form">
        { splitButton }
        <div className="rc-filter-form-fields">
          <div className="rc-selects-row">
            { fieldSelect }
            { operatorSelect }
          </div>
          { valueInput }
        </div>
      </div>
    );
  }
}

Filter.propTypes = propTypes;
Filter.defaultProps = defaultProps;

export default Filter;
