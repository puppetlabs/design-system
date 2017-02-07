import React from 'react';
import Select from 'react-select';
import Input from './Input';
import SplitButton from './SplitButton';

const propTypes = {
  fields: React.PropTypes.array.isRequired,
  onDelete: React.PropTypes.func.isRequired,
  onDuplicate: React.PropTypes.func.isRequired,
};

class Filter extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      field: '',
      operator: '',
      value: '',
    };

    this.onOptionSelect = this.onOptionSelect.bind(this);
    this.onDropdownSelect = this.onDropdownSelect.bind(this);
  }

  onOptionSelect(option) {
    option.type = option.type || 'field';

    this.setState({ [option.type]: option.value });
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
      { value: 'Duplicate', id: 0 },
      { value: 'Delete', id: 1 },
    ];

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
        value={ this.state.field }
        options={ fields }
        onChange={ this.onOptionSelect }
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
        value={ this.state.operator }
        options={ operators }
        onChange={ this.onOptionSelect }
        clearable={ false }
        className="Select-small Select-right"
      />
    );
  }

  renderValueInput() {
    const getValue = (e) => {
      this.setState({ value: e.target.value });
    };

    return (
      <Input
        placeholder="Value"
        onChange={ getValue }
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

export default Filter;
