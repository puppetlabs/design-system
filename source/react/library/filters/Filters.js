import PropTypes from 'prop-types';
import React from 'react';
import clone from 'clone';

import Filter from './FilterItem';
import Form from './FilterForm';

import Button from '../buttons/Button';
import List from '../list/List';

import { filterOperators } from '../../constants';

const propTypes = {
  fields: PropTypes.arrayOf(
    PropTypes.oneOfType([PropTypes.string, PropTypes.shape({})]),
  ),
  filters: PropTypes.arrayOf(
    PropTypes.shape({
      field: PropTypes.string,
      op: PropTypes.string,
      value: PropTypes.string,
    }),
  ),
  addCTA: PropTypes.string,
  onChange: PropTypes.func,
  onSwitchView: PropTypes.func,
  removableToggle: PropTypes.bool,
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
    /* Custom label for add button */
    addCTA: PropTypes.string,
  }),
};

const defaultStrings = {
  ...Form.defaultProps.strings,
};

const defaultProps = {
  fields: [],
  filters: [],
  onChange: () => {},
  addCTA: 'Add filter',
  onSwitchView: () => {},
  removableToggle: false,
  operators: filterOperators,
  strings: defaultStrings,
};

const LIST_VIEW = 'LIST_VIEW';
const FORM_VIEW = 'FORM_VIEW';

const getFilterKey = filter =>
  [filter.field, filter.op, filter.value, filter.values, filter.removable].join(
    '',
  );

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
    const { onSwitchView } = this.props;
    if (e) {
      e.preventDefault();
    }

    onSwitchView(FORM_VIEW);
    this.setState({ adding: true });
  }

  onCancel() {
    const { onSwitchView } = this.props;

    onSwitchView(LIST_VIEW);
    this.setState({
      editing: null,
      adding: false,
      filter: {},
    });
  }

  onSubmitFilter(filter) {
    const { filters, onChange, onSwitchView } = this.props;
    const { editing } = this.state;
    let newFilters = [];

    if (editing) {
      const index = filters.findIndex(f => getFilterKey(f) === editing);

      newFilters = clone(filters);
      newFilters[index] = filter;
    } else {
      newFilters = filters.concat(filter);
    }

    onChange(newFilters);
    onSwitchView(LIST_VIEW);

    this.setState({ adding: false, editing: null, filter: {} });
  }

  onEdit(filter) {
    const { onSwitchView } = this.props;
    const key = getFilterKey(filter);

    return () => {
      onSwitchView(FORM_VIEW);

      this.setState({
        editing: key,
        filter,
      });
    };
  }

  onRemove(removed) {
    const { filters, onChange } = this.props;

    return () => {
      const newFilters = filters.filter(
        filter => !(getFilterKey(removed) === getFilterKey(filter)),
      );

      onChange(newFilters);
    };
  }

  renderFilters() {
    const { operators, filters: propsFilters } = this.props;
    const filters = propsFilters.map(filter => {
      const key = getFilterKey(filter);

      return (
        <Filter
          onEdit={this.onEdit(filter)}
          onRemove={this.onRemove(filter)}
          filter={filter}
          key={key}
          operators={operators}
        />
      );
    });

    return <List className="rc-filters-list">{filters}</List>;
  }

  renderAction() {
    const { editing, adding } = this.state;
    const { strings, addCTA } = this.props;
    const ctaLabel = strings.addCTA || addCTA;
    let jsx;

    if (!editing && !adding) {
      jsx = <Button simple icon="plus" label={ctaLabel} onClick={this.onAdd} />;
    }

    return jsx;
  }

  renderForm() {
    const { removableToggle, fields, operators, strings } = this.props;
    const { filter } = this.state;

    return (
      <Form
        removable={removableToggle}
        fields={fields}
        filter={filter}
        operators={operators}
        onCancel={this.onCancel}
        onSubmit={this.onSubmitFilter}
        strings={strings}
      />
    );
  }

  render() {
    const { adding, editing } = this.state;
    const action = this.renderAction();
    let filters;
    let form;

    if (adding || editing) {
      form = this.renderForm();
    } else {
      filters = this.renderFilters();
    }

    return (
      <div className="rc-filters">
        {filters}
        {action}
        {form}
      </div>
    );
  }
}

Filters.propTypes = propTypes;
Filters.defaultProps = defaultProps;

Filters.Form = Form;

export default Filters;
