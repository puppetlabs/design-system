import PropTypes from 'prop-types';
import React from 'react';

import clone from 'clone';
import { filterOperators } from '../../constants';
import Form from '../form';

const propTypes = {
  filter: PropTypes.object,
  removable: PropTypes.bool,
  onSubmit: PropTypes.func,
  onCancel: PropTypes.func,
  fields: PropTypes.array,
  operators: PropTypes.array,
  labels: PropTypes.object,
};

const defaultProps = {
  onSubmit: () => {},
  onCancel: () => {},
  onUpdate: () => {},
  removable: false,
  fields: [],
  filter: {},
  operators: filterOperators,
  labels: {},
};

const isValueless = (op, operators) => {
  let valueless = false;
  let ops;

  if (typeof op !== 'undefined') {
    ops = operators
      .filter(o => o.symbol === op)
      .filter(o => typeof o.noValue !== 'undefined');

    if (ops.length === 1) {
      valueless = ops[0].noValue;
    }
  }

  return valueless;
};

class FilterForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      filter: clone(props.filter),
    };

    this.onUpdate = this.onUpdate.bind(this);
    this.onCancel = this.onCancel.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onSubmit() {
    this.setState({ filter: defaultProps.filter });

    this.props.onSubmit(this.state.filter);
  }

  onCancel() {
    this.setState({ filter: defaultProps.filter });

    this.props.onCancel();
  }

  onUpdate(field, values) {
    const value = values[field];
    const newState = {
      filter: this.state.filter,
    };

    switch (field) {
      case 'filterField':
        newState.filter.field = value.id;
        break;
      case 'filterOperator':
        newState.filter.op = value.id;

        if (isValueless(value.id, this.props.operators)) {
          delete newState.filter.value;
        }

        break;
      case 'filterValue':
        newState.filter.value = value;
        break;
      case 'filterRemovable':
        newState.filter.removable = value;
        break;
      default:
    }

    this.setState(newState);
  }

  getFields() {
    const filter = this.state.filter;

    return this.props.fields.map(field => ({
      id: field,
      label: field,
      value: field,
      selected: filter.field === field,
    }));
  }

  getOperators() {
    const filter = this.state.filter;
    const { operators } = this.props;

    return operators.map(op => ({
      id: op.symbol,
      label: op.label,
      value: op.symbol,
      selected: filter.op === op.symbol,
    }));
  }

  renderRemovableField() {
    const filter = this.state.filter;
    const label =  this.props.labels.filterRemovable || 'removable';
    let jsx;

    if (this.props.removable) {
      jsx = (
        <Form.Field
          value={ filter.removable }
          type="checkbox"
          name="filterRemovable"
          label={label}
          inline
        />
      );
    }

    return jsx;
  }

  renderValueField() {
    const valueless = isValueless(this.state.filter.op, this.props.operators);
    const label =  this.props.labels.filterValue || 'value';
    const placeHolderLabel =  this.props.labels.filterValuePlaceholder || 'A string (e.g. Jim) or a number (1500)';
    let jsx;

    if (!valueless) {
      jsx = (
        <Form.Field
          type="input"
          name="filterValue"
          label={label}
          value={ this.state.filter.value || '' }
          elementProps={ { placeholder: placeHolderLabel } }
        />
      );
    }

    return jsx;
  }

  render() {
    const removableField = this.renderRemovableField();
    const valueField = this.renderValueField();
    const operators = this.getOperators();
    const fields = this.getFields();

    const filterFieldLabel =  this.props.labels.filterField || 'field';
    const filterFieldPlaceholderLabel =  this.props.labels.filterFieldPlaceholder || 'Choose a field...';

    const filterOperatorLabel =  this.props.labels.filterOperator || 'operation';
    const filterOperatorPlaceholderLabel =  this.props.labels.filterOperatorPlaceholder || 'Choose an operation...';

    const filterCancelLabel = this.props.labels.filterCancel;
    const filterSubmitLabel = this.props.labels.filterSubmit;

    return (
      <Form
        submittable
        cancellable
        onChange={ this.onUpdate }
        onCancel={ this.onCancel }
        onSubmit={ this.onSubmit }
        size="small"
        cancelLabel={filterCancelLabel}
        submitLabel={filterSubmitLabel}
      >
        <Form.Field
          type="select"
          name="filterField"
          label={filterFieldLabel}
          elementProps={ {
            disablePortal: true,
            options: fields,
            placeholder: filterFieldPlaceholderLabel,
          } }
        />
        <Form.Field
          type="select"
          name="filterOperator"
          label={filterOperatorLabel}
          elementProps={ {
            disablePortal: true,
            options: operators,
            placeholder: filterOperatorPlaceholderLabel,
          } }
        />
        { valueField }
        { removableField }
      </Form>
    );
  }
}

FilterForm.propTypes = propTypes;
FilterForm.defaultProps = defaultProps;

export default FilterForm;
