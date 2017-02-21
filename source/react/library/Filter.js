import React from 'react';
import Select from 'react-select';
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

class Filter extends React.Component {
  constructor(props) {
    super(props);

    this.state = props.filter;

    this.onOptionSelect = this.onOptionSelect.bind(this);
    this.onDropdownSelect = this.onDropdownSelect.bind(this);
  }

  componentWillReceiveProps(newProps) {
    if (!equals(newProps.filter, this.state)) {
      this.setState(newProps.filter);
    }
  }

  componentDidUpdate(newProps, newState) {
    if (!equals(newState, this.state)) {
      this.props.onChange(this.state);
    }
  }

  onOptionSelect(type) {
    return value => {
      this.setState({ [type]: value });
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
        value={ this.state.field }
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
        value={ this.state.op }
        options={ operators }
        onChange={ this.onOptionSelect('op') }
        clearable={ false }
        className="Select-small Select-right"
      />
    );
  }

  renderValueInput() {
    const getValue = e => {
      this.setState({ value: e.target.value });
    };

    return (
      <Input
        placeholder="Value"
        value={ this.state.value }
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
Filter.defaultProps = defaultProps;

export default Filter;
