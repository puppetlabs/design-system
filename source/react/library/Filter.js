import React from 'react';
import clone from 'clone';
import classnames from 'classnames';
import equals from 'deep-equal';
import Input from './Input';
import Select from './select/Select';
import SplitButton from './SplitButton';

const propTypes = {
  onDelete: React.PropTypes.func.isRequired,
  fields: React.PropTypes.array.isRequired,
  onDuplicate: React.PropTypes.func,
  onChange: React.PropTypes.func,
  /** The filter operators that we support */
  operators: React.PropTypes.arrayOf(React.PropTypes.shape({
    symbol: React.PropTypes.string,
    label: React.PropTypes.string,
    noValue: React.PropTypes.bool,
  })),
  /** A filter that the user can modify */
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
  operators: [],
  filter: {
    field: '',
    op: '',
    value: '',
  },
  onDuplicate: null,
};

/**
 * `Filter` is a control for creating and editing filters.
 *
 * @example ../../../docs/Filter.md
 */

class Filter extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      filter: props.filter,
      valid: this.isValid(props.filter),
    };

    this.isValid = this.isValid.bind(this);
    this.onFilterChange = this.onFilterChange.bind(this);
    this.onOptionSelect = this.onOptionSelect.bind(this);
    this.onDropdownSelect = this.onDropdownSelect.bind(this);
  }

  componentWillReceiveProps(newProps) {
    if (!equals(newProps.filter, this.state.filter)) {
      const valid = this.isValid(newProps.filter);

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
    const newState = {};
    const newFilter = clone(this.state.filter);
    newFilter[prop] = value;
    newState.filter = newFilter;

    // We want to check any changes to op, as value is sometimes not used.
    if (prop === 'op') {
      const isValid = this.isValid(newFilter);

      newState.valid = isValid;

      const fullOp = this.getFullValuelessOperator(value);

      // If the op is valueless, lets clear a previously set value.
      if (fullOp) {
        newState.filter.value = defaultProps.filter.value;
      }
    }

    this.setState(newState);
  }

  onOptionSelect(type) {
    return ({ value }) => {
      this.onFilterChange(type, value);
    };
  }

  onDropdownSelect(option) {
    switch (option.value) {
      case 'Duplicate':
        if (this.props.onDuplicate) {
          this.props.onDuplicate();
        }

        break;
      case 'Delete':
        if (this.props.onDelete) {
          this.props.onDelete();
        }

        break;
      default:
        // do nothing
    }
  }

  getFullValuelessOperator(shortOp) {
    return this.props.operators.filter(op => op.noValue && op.symbol === shortOp)[0];
  }

  isValid(filter) {
    let valid = !!(filter.field && filter.op && filter.value);

    if (filter.op && !filter.value) {
      const fullOp = this.getFullValuelessOperator(filter.op);

      if (fullOp) {
        valid = !!(filter.field && filter.op);
      }
    }

    return valid;
  }

  shouldRenderValue() {
    let render = true;

    // Find the current operator in the props.operators array, where noValue is true
    const fullOp = this.getFullValuelessOperator(this.state.filter.op);

    if (fullOp) {
      render = false;
    }

    return render;
  }

  renderSplitButton() {
    const dropdownOptions = [
      { value: 'Delete', id: 0 },
    ];

    if (this.props.onDuplicate) {
      dropdownOptions.push(
        { value: 'Duplicate', id: 1 },
      );
    }

    return (
      <SplitButton
        size="tiny"
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
    const options = fields.map((field) => {
      if (this.state.filter.field === field.value) {
        field.selected = true;
      }

      return field;
    });

    return (
      <Select
        name="field-select"
        placeholder="Field"
        options={ options }
        onSelect={ this.onOptionSelect('field') }
        className="rc-select-left"
      />
    );
  }

  renderOperatorSelect() {
    let operators = this.props.operators.map((type, i) => ({
      value: type.symbol,
      label: type.label,
      selected: type.symbol === this.state.filter.op,
      type: 'operator',
      id: i,
    }));

    if (!operators.length) {
      operators = [{
        value: this.state.filter.op,
        label: this.state.filter.op,
        selected: true,
        type: 'operator',
        id: 0,
      }];
    }

    return (
      <Select
        name="operator-select"
        placeholder="Operator"
        options={ operators }
        onSelect={ this.onOptionSelect('op') }
        className="rc-select-right"
      />
    );
  }

  renderValueInput() {
    const onChange = (e) => {
      this.onFilterChange('value', e.target.value);
    };

    const onBlur = () => {
      const valid = this.isValid(this.state.filter);

      this.setState({ valid });
    };

    const onFocus = () => {
      // When focused we don't want to communicate changes.
      // We'll wait to do that until onBlur
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
    const shouldRenderValue = this.shouldRenderValue();
    const className = classnames('rc-filter-form', {
      'rc-filter-form-no-value': !shouldRenderValue,
    });
    let valueInput;

    if (shouldRenderValue) {
      valueInput = this.renderValueInput();
    }

    return (
      <div className={ className }>
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
