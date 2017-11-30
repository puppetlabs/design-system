import React from 'react';

import Icon from '../Icon';
import Tag from '../Tag';
import Form from '../form';

const propTypes = {
  filters: React.PropTypes.array,
  onChange: React.PropTypes.func,
};

const defaultProps = {
  filters: [],
  onChange: () => {},
};

/**
 * `Filters` allows users to list, edit, and add filters.
 */
class Filters extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      adding: false,
      editing: false,
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

  onRemove() {
  
  }

  renderFilters() {
    return this.props.filters.map(filter => (
      <Tag className="rc-filters-filter" onRemove={ this.onRemove }>
        { filter.field } { filter.op } { filter.value }
      </Tag>
    ));
  }

  renderAction() {
    let jsx;

    if (!this.state.edding && !this.state.adding) {
      jsx = (
        <a href="/add-filter" onClick={ this.onAdd } className="rc-filters-action">
          <Icon type="plus" height="12px" width="12px" /> Add filter
        </a>
      );
    }

    return jsx;
  }

  renderAddForm() {
    let jsx;

    if (this.state.adding) {
      const fields = ['Name', 'Date'];

      return (
        <Form submittable onSubmit={ this.onSubmitFilter }>
          <Form.Field
            type="select"
            name="filterField"
            label="field"
            elementProps={ { options: fields } }
          />
          <Form.Field
            type="select"
            name="filterOperator"
            label="operation"
            elementProps={ { options: fields } }
          />
          <Form.Field
            type="input"
            name="filterValue"
            label="value"
          />
        </Form>
      );
    }

    return jsx;
  }

  render() {
    const filters = this.renderFilters();
    const action = this.renderAction();
    const form = this.renderAddForm();

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
