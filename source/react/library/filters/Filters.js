import React from 'react';

import Filter from './Filter';

import Icon from '../Icon';
import Form from '../form';

const propTypes = {
  filters: React.PropTypes.array,
  onChange: React.PropTypes.func,
};

const defaultProps = {
  filters: [],
  onChange: () => {},
};

const getFilterKey = (filter) => {
  return [filter.field, filter.op, filter.value, filter.values].join('');
};

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
    e.preventDefault();

    this.setState({ adding: true });
  }

  onSubmitFilter(values) {
    console.log(values);

    this.setState({ adding: false });
  }

  onEdit(filter) {
    const key = getFilterKey(filter);

    return () => {
      this.setState({ editing: key });
    }
  }

  onRemove(removed) {
    return () => {
      const newFilters = this.props.filters
        .filter(filter => !(getFilterKey(removed) === getFilterKey(filter)));

      this.props.onChange(newFilters);
    }
  }

  renderFilters() {
    const filters = [];

    this.props.filters.forEach((filter) => {
      const key = getFilterKey(filter);

      filters.push(
        <Filter
          onEdit={ this.onEdit(filter) }
          onRemove={ this.onRemove(filter) }
          filter={ filter }
          key={ key }
        />,
      );

      if (key === this.state.editing) {
        filters.push(this.renderForm(filter));
      }
    });

    return (
      <div className="rc-filters-list">
        { filters }
      </div>
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

  renderForm(filter = {}) {
    let jsx;

    if (this.state.adding || this.state.editing) {
      const fields = ['Name', 'Date'];

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
            value={ filter.field }
            type="select"
            name="filterField"
            label="field"
            elementProps={ { options: fields, placeholder: 'Choose a field...' } }
          />
          <Form.Field
            value={ filter.op }
            type="select"
            name="filterOperator"
            label="operation"
            elementProps={ { options: fields, placeholder: 'Please choose...' } }
          />
          <Form.Field
            value={ filter.value }
            type="input"
            name="filterValue"
            label="value"
            elementProps={ { placeholder: 'e.g. Jim, 15, etc.' } }
          />
        </Form>
      );
    }

    return jsx;
  }

  render() {
    const filters = this.renderFilters();
    const action = this.renderAction();
    let form;

    if (this.state.adding) {
      form = this.renderForm();
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
Filters.defaultprops = defaultProps;

export default Filters;
