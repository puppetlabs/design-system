import React from 'react';
import clone from 'clone';

import Filter from './FilterItem';

import { filterOperators } from '../../constants';
import Icon from '../Icon';
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
    };

    this.onAdd = this.onAdd.bind(this);
    this.onRemove = this.onRemove.bind(this);
    this.onSubmitFilter = this.onSubmitFilter.bind(this);
  }

  onAdd(e) {
    if (e) {
      e.preventDefault();
    }

    this.setState({ adding: true });
  }

  onSubmitFilter({ values }) {
    const filter = this.formatFilterForm(values);
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
    this.setState({ adding: false, editing: null });
  }

  onEdit(filter) {
    const key = getFilterKey(filter);

    return () => {
      this.setState({ editing: key });
    };
  }

  onRemove(removed) {
    return () => {
      const newFilters = this.props.filters
        .filter(filter => !(getFilterKey(removed) === getFilterKey(filter)));

      this.props.onChange(newFilters);
    };
  }

  // Convert the form representation into one of our Filter representations.
  formatFilterForm(form) {
    const filter = {
      field: form.filterField.id,
      value: form.filterValue,
    };

    if (form.filterOperator) {
      filter.op = form.filterOperator.id;
    }

    if (this.props.removableToggle && typeof form.filterRemovable !== 'undefined') {
      filter.removable = form.filterRemovable;
    }

    return filter;
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
        <a href="/add-filter" onClick={ this.onAdd } className="rc-filters-action">
          <Icon type="plus" height="8px" width="8px" /> Add filter
        </a>
      );
    }

    return jsx;
  }

  renderForm() {
    let jsx;
    let filter = {};
    let removableField;
    let currentOp;
    let currentField;

    if (this.state.editing) {
      filter = this.props.filters
        .filter(f => getFilterKey(f) === this.state.editing)[0];
    }

    if (this.state.adding || this.state.editing) {
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

      if (filter.op) {
        const operator = filterOperators
          .filter(op => op.symbol === filter.op)[0];

        if (operator) {
          currentOp = {
            id: operator.symbol,
            label: operator.label,
            value: operator.symbol,
          };
        }
      }

      if (filter.field) {
        const field = this.props.fields
          .filter(f => f === filter.field)[0];

        if (field) {
          currentField = {
            id: field,
            label: field,
            value: field,
          };
        }
      }

      return (
        <Form
          submittable
          cancellable
          onCancel={ () => { this.setState({ editing: null, adding: false }); } }
          onSubmit={ this.onSubmitFilter }
          size="tiny"
          key={ `${this.state.editing}-form` }
        >
          <Form.Field
            value={ currentField }
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
            value={ currentOp }
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
            value={ filter.value }
            type="input"
            name="filterValue"
            label="value"
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
