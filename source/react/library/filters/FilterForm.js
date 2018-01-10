import React from 'react';

import { filterOperators } from '../../constants';
import Form from '../Form';

const propTypes = {
  filter: React.PropTypes.object,
  removable: React.PropTypes.bool,
  onSubmit: React.PropTypes.func,
  onCancel: React.PropTypes.func,
  fields: React.PropTypes.array,
};

const defaultProps = {
  onSubmit: () => {},
  onCancel: () => {},
  onUpdate: () => {},
  removable: false,
  fields: [],
  filter: {},
};

class FilterForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      filter: props.filter,
    };

    this.onUpdate = this.onUpdate.bind(this);
    this.onCancel = this.onCancel.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onSubmit() {
    this.props.onSubmit(this.state.filter);
  }

  onCancel() {
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

    return filterOperators.map(op => ({
      id: op.symbol,
      label: op.label,
      value: op.symbol,
      selected: filter.op === op.symbol,
    }));
  }

  renderRemovableField() {
    const filter = this.state.filter;
    let jsx;

    if (this.props.removable) {
      jsx = (
        <Form.Field
          value={ filter.removable }
          type="checkbox"
          name="filterRemovable"
          label="removable"
          inline
        />
      );
    }

    return jsx;
  }

  render() {
    const removableField = this.renderRemovableField();
    const operators = this.getOperators();
    const filter = this.state.filter;
    const fields = this.getFields();

    return (
      <Form
        submittable
        cancellable
        onChange={ this.onUpdate }
        onCancel={ this.onCancel }
        onSubmit={ this.onSubmit }
        size="small"
      >
        <Form.Field
          type="select"
          name="filterField"
          label="field"
          elementProps={ {
            disablePortal: true,
            options: fields,
            placeholder: 'Choose a field...',
          } }
        />
        <Form.Field
          type="select"
          name="filterOperator"
          label="operation"
          elementProps={ {
            disablePortal: true,
            options: operators,
            placeholder: 'Please choose...',
          } }
        />
        <Form.Field
          type="input"
          name="filterValue"
          label="value"
          value={ filter.value }
          elementProps={ { placeholder: 'e.g. Jim, 15, etc.' } }
        />
        { removableField }
      </Form>
    );
  }
}

FilterForm.propTypes = propTypes;
FilterForm.defaultProps = defaultProps;

export default FilterForm;
