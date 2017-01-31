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

    this.getOption = this.getOption.bind(this);
  }

  getOption(option) {
    option.type = option.type || 'field';

    if (option.type === 'dropdownOption') {
      const action = `on${option.value}`;
      this.props[action]();
    } else {
      this.setState({ [option.type]: option.value });
    }
  }

  renderSplitButton() {
    const dropdownOptions = [
      { value: 'Duplicate', type: 'dropdownOption', id: 0 },
      { value: 'Delete', type: 'dropdownOption', id: 1 },
    ];

    return (
      <SplitButton
        size="small"
        onOptionClick={ this.getOption }
        onClick={ this.props.onDelete }
        options={ dropdownOptions }
        label="Delete"
        dropdownWidth="100px"
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
        onChange={ this.getOption }
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
        onChange={ this.getOption }
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
