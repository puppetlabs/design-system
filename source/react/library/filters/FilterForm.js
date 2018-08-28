import PropTypes from 'prop-types';
import React from 'react';

import clone from 'clone';
import { filterOperators } from '../../constants';
import Form from '../form';

const propTypes = {
  filter: PropTypes.shape({
    field: PropTypes.string,
    op: PropTypes.string,
    value: PropTypes.string,
  }),
  removable: PropTypes.bool,
  onSubmit: PropTypes.func,
  onCancel: PropTypes.func,
  fields: PropTypes.arrayOf(PropTypes.string),
  /** Defaults to the standard set as defined in constants. */
  operators: PropTypes.arrayOf(PropTypes.object),
  strings: PropTypes.shape({
    /* Custom remove label */
    filterRemovable: PropTypes.string.isRequired,
    /* Custom label for value input */
    filterValue: PropTypes.string.isRequired,
    /* Custom placeholder for value input */
    filterValuePlaceholder: PropTypes.string.isRequired,
    /* Custom label for field dropdown */
    filterField: PropTypes.string.isRequired,
    /* Custom label used as placholder in the field input */
    filterFieldPlaceholder: PropTypes.string.isRequired,
    /* Custom label for operator dropdown */
    filterOperator: PropTypes.string.isRequired,
    /* Custom label used as placholder in the operator input */
    filterOperatorPlaceholder: PropTypes.string.isRequired,
    /* Custom label for cancel button */
    filterCancel: PropTypes.string.isRequired,
    /* Custom label for submit button */
    filterSubmit: PropTypes.string.isRequired,
  }),
};

const defaultStrings = {
  filterRemovable: 'removable',
  filterValue: 'value',
  filterValuePlaceholder: 'A string (e.g. Jim) or a number (1500)',
  filterField: 'field',
  filterFieldPlaceholder: 'Choose a field...',
  filterOperator: 'operation',
  filterOperatorPlaceholder: 'Choose an operation...',
  filterCancel: 'Cancel',
  filterSubmit: 'Submit',
};

const defaultProps = {
  onSubmit: () => {},
  onCancel: () => {},
  removable: false,
  fields: [],
  filter: {},
  operators: filterOperators,
  strings: defaultStrings,
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
    const { onSubmit } = this.props;
    const { filter } = this.state;

    this.setState({ filter: defaultProps.filter });

    onSubmit(filter);
  }

  onCancel() {
    const { onCancel } = this.props;

    this.setState({ filter: defaultProps.filter });

    onCancel();
  }

  onUpdate(field, values) {
    const { filter } = this.state;
    const { operators } = this.props;
    const value = values[field];
    const newState = {
      filter,
    };

    switch (field) {
      case 'filterField':
        newState.filter.field = value.id;
        break;
      case 'filterOperator':
        newState.filter.op = value.id;

        if (isValueless(value.id, operators)) {
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
    const { fields } = this.props;
    const { filter } = this.state;

    return fields.map(field => ({
      id: field,
      label: field,
      value: field,
      selected: filter.field === field,
    }));
  }

  getOperators() {
    const { filter } = this.state;
    const { operators } = this.props;

    return operators.map(op => ({
      id: op.symbol,
      label: op.label,
      value: op.symbol,
      selected: filter.op === op.symbol,
    }));
  }

  renderRemovableField() {
    const { filter } = this.state;
    const { removable, strings } = this.props;

    let jsx;

    if (removable) {
      jsx = (
        <Form.Field
          value={filter.removable}
          type="checkbox"
          name="filterRemovable"
          label={strings.filterRemovable}
          inline
        />
      );
    }

    return jsx;
  }

  renderValueField() {
    const {
      filter: { op, value = '' },
    } = this.state;

    const { operators, strings } = this.props;
    const valueless = isValueless(op, operators);

    let jsx;

    if (!valueless) {
      jsx = (
        <Form.Field
          type="input"
          name="filterValue"
          label={strings.filterValue}
          value={value}
          elementProps={{ placeholder: strings.filterValuePlaceholder }}
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

    const { strings } = this.props;

    return (
      <Form
        submittable
        cancellable
        onChange={this.onUpdate}
        onCancel={this.onCancel}
        onSubmit={this.onSubmit}
        size="small"
        cancelLabel={strings.filterCancel}
        submitLabel={strings.filterSubmit}
      >
        <Form.Field
          type="select"
          name="filterField"
          label={strings.filterField}
          elementProps={{
            disablePortal: true,
            options: fields,
            placeholder: strings.filterFieldPlaceholder,
          }}
        />
        <Form.Field
          type="select"
          name="filterOperator"
          label={strings.filterOperator}
          elementProps={{
            disablePortal: true,
            options: operators,
            placeholder: strings.filterOperatorPlaceholder,
          }}
        />
        {valueField}
        {removableField}
      </Form>
    );
  }
}

FilterForm.propTypes = propTypes;
FilterForm.defaultProps = defaultProps;

export default FilterForm;
