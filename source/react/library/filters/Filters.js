import PropTypes from 'prop-types';
import React from 'react';
import clone from 'clone';

import Filter from './FilterItem';
import Form from './FilterForm';

import Button from '../buttons/Button';
import List from '../list/List';

const propTypes = {
  fields: PropTypes.array,
  filters: PropTypes.array,
  addCTA: PropTypes.string,
  onChange: PropTypes.func,
  onSwitchView: PropTypes.func,
  removableToggle: PropTypes.bool,
  operators: PropTypes.array,
};

const defaultProps = {
  fields: [],
  filters: [],
  onChange: () => {},
  addCTA: 'Add filter',
  onSwitchView: () => {},
  removableToggle: false,
  operators: null,
};

const LIST_VIEW = 'LIST_VIEW';
const FORM_VIEW = 'FORM_VIEW';

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
  }

  onAdd(e) {
    if (e) {
      e.preventDefault();
    }

    this.props.onSwitchView(FORM_VIEW);
    this.setState({ adding: true });
  }

  onCancel() {
    this.props.onSwitchView(LIST_VIEW);
    this.setState({
      editing: null,
      adding: false,
      filter: {},
    });
  }

  onSubmitFilter(filter) {
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
    this.props.onSwitchView(LIST_VIEW);
    this.setState({ adding: false, editing: null, filter: {} });
  }

  onEdit(filter) {
    const key = getFilterKey(filter);

    return () => {
      this.props.onSwitchView(FORM_VIEW);

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
    const { operators } = this.props;
    const filters = this.props.filters.map((filter) => {
      const key = getFilterKey(filter);

      return (
        <Filter
          onEdit={ this.onEdit(filter) }
          onRemove={ this.onRemove(filter) }
          filter={ filter }
          key={ key }
          operators={ operators }
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
          label={ this.props.addCTA }
          onClick={ this.onAdd }
        />
      );
    }

    return jsx;
  }

  renderForm() {
    return (
      <Form
        removable={ this.props.removableToggle }
        fields={ this.props.fields }
        filter={ this.state.filter }
        operators={ this.props.operators }
        onCancel={ this.onCancel }
        onSubmit={ this.onSubmitFilter }
      />
    );
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

Filters.Form = Form;

export default Filters;
