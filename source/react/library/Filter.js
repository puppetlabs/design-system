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
      buttonAction: 'Delete',
      field: '',
      operator: '',
      value: '',
    };

    this.onClick = this.onClick.bind(this);
    this.getSelectOption = this.getSelectOption.bind(this);
  }

  onClick() {
    const action = this.state.buttonAction;

    if (action === 'Delete') {
      this.props.onDelete();
    } else if (action === 'Duplicate') {
      this.props.onDuplicate();
    }
  }

  getSelectOption(option) {
    option.type = option.type || 'field';
    this.setState({ [option.type]: option.value });
  }

  renderSplitButton() {
    const buttonActions = [
      { value: 'Delete', type: 'buttonAction', id: 0 },
      { value: 'Duplicate', type: 'buttonAction', id: 1 },
    ];

    return (
      <SplitButton
        size="small"
        onOptionClick={ this.getSelectOption }
        onClick={ this.onClick }
        options={ buttonActions }
        label={ this.state.buttonAction }
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
        onChange={ this.getSelectOption }
        clearable={ false }
        className="Select-small Select-left"
      />
    );
  }

  renderOperatorSelect() {
    const operators = [
      { value: '=', label: 'Equal to', type: 'operator', id: 0 },
      { value: '>', label: 'Greater than', type: 'operator', id: 1 },
      { value: '<', label: 'Less than', type: 'operator', id: 2 },
      { value: '>=', label: 'Greater than or Equal to', type: 'operator', id: 3 },
      { value: '<=', label: 'Less than or Equal to', type: 'operator', id: 4 },
    ];

    return (
      <Select
        name="operator-select"
        placeholder="Operator"
        value={ this.state.operator }
        options={ operators }
        onChange={ this.getSelectOption }
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
          <div className="Select-row">
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
