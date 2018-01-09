import React from 'react';
import clone from 'clone';

import Filter from './FilterItem';

import { filterOperators } from '../../constants';
import Button from '../Button';
import Form from '../form';
import List from '../list/List';

const propTypes = {
  fields: React.PropTypes.array,
  filters: React.PropTypes.array,
  onChange: React.PropTypes.func,
  removableToggle: React.PropTypes.bool,
};

const defaultProps = {
  fields: [],
  filters: [],
  onChange: () => {},
  removableToggle: false,
};

const getFilterKey = filter =>
  [filter.field, filter.op, filter.value, filter.values, filter.removable].join('');

/**
 * `Filters` allows users to list, edit, and add filters.
 */
class Filters extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      adding: false,
      editing: null,
      filter: {},
    };

    this.onAdd = this.onAdd.bind(this);
    this.onCancel = this.onCancel.bind(this);
    this.onRemove = this.onRemove.bind(this);
    this.onSubmitFilter = this.onSubmitFilter.bind(this);
    this.onUpdateFilter = this.onUpdateFilter.bind(this);
  }

  onAdd(e) {
    if (e) {
      e.preventDefault();
    }

    this.setState({ adding: true });
  }

  onCancel() {
    this.setState({
      editing: null,
      adding: false,
      filter: {},
    });
  }

  onUpdateFilter(field, values) {
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

  onSubmitFilter() {
    const filter = this.state.filter;
    let newFilters = [];

    if (this.state.editing) {
      const index = this.props.filters
        .findIndex(f => getFilterKey(f) === this.state.editing);

      newFilters = clone(this.props.filters);
      newFilters[index] = filter;
    } else {
      newFilters = this.props.filters
        .concat(filter);
    }

    this.props.onChange(newFilters);
    this.setState({ adding: false, editing: null, filter: {} });
  }

  onEdit(filter) {
    const key = getFilterKey(filter);

    return () => {
      this.setState({
        editing: key,
        filter,
      });
    };
  }

  onRemove(removed) {
    return () => {
      const newFilters = this.props.filters
        .filter(filter => !(getFilterKey(removed) === getFilterKey(filter)));

      this.props.onChange(newFilters);
    };
  }

  renderFilters() {
    const filters = this.props.filters.map((filter) => {
      const key = getFilterKey(filter);

      return (
        <Filter
          onEdit={ this.onEdit(filter) }
          onRemove={ this.onRemove(filter) }
          filter={ filter }
          key={ key }
        />
      );
    });

    return (
      <List className="rc-filters-list">
        { filters }
      </List>
    );
  }

  renderAction() {
    let jsx;

    if (!this.state.editing && !this.state.adding) {
      jsx = (
        <Button
          simple
          icon="plus"
          label="Add filter"
          onClick={ this.onAdd }
        />
      );
    }

    return jsx;
  }

  renderForm() {
    let jsx;
    let removableField;
    const filter = this.state.filter;

    if (filter) {
      const fields = this.props.fields.map(field => ({
        id: field,
        label: field,
        value: field,
        selected: filter.field === field,
      }));
      const operators = filterOperators.map(op => ({
        id: op.symbol,
        label: op.label,
        value: op.symbol,
        selected: filter.op === op.symbol,
      }));

      if (this.props.removableToggle) {
        removableField = (
          <Form.Field
            value={ filter.removable }
            type="checkbox"
            name="filterRemovable"
            label="removable"
            inline
          />
        );
      }

      return (
        <Form
          submittable
          cancellable
          onChange={ this.onUpdateFilter }
          onCancel={ this.onCancel }
          onSubmit={ this.onSubmitFilter }
          size="tiny"
          key={ `${this.state.editing}-form` }
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

    return jsx;
  }

  render() {
    const action = this.renderAction();
    let filters;
    let form;

    if (this.state.adding || this.state.editing) {
      form = this.renderForm();
    } else {
      filters = this.renderFilters();
    }

    return (
      <div className="rc-filters">
        { filters }
        { action }
        { form }
      </div>
    );
  }
}

Filters.propTypes = propTypes;
Filters.defaultProps = defaultProps;

export default Filters;
