import PropTypes from 'prop-types';
import React from 'react';

import { filterOperators } from '../../constants';

import ListItem from './ListItem';

const propTypes = {
  filter: PropTypes.shape({
    field: PropTypes.string,
    op: PropTypes.string,
    value: PropTypes.string,
  }).isRequired,
  onEdit: PropTypes.func,
  onRemove: PropTypes.func,
  /** Defaults to the standard set as defined in constants. */
  // eslint-disable-next-line react/forbid-prop-types
  operators: PropTypes.arrayOf(PropTypes.object),
};

const defaultProps = {
  onEdit: () => {},
  onRemove: () => {},
  operators: filterOperators,
};

const getOperatorSentenceForm = (op, operators) => {
  let sentenceForm = op;

  operators.forEach((operator) => {
    if (operator.symbol === op) {
      sentenceForm = operator.sentence;
    }
  });

  return sentenceForm;
};

const renderText = (filter, operators) => {
  const text = [];

  text.push(
    <span key="field-name" className="rc-filter-field-name">
      {filter.field}
    </span>,
  );

  if (filter.op) {
    const operator = getOperatorSentenceForm(filter.op, operators);

    text.push(
      <span key="field-op" className="rc-filter-field-op">
        {operator}
      </span>,
    );
  }

  if (filter.any) {
    text.push(
      <span key="filter-value" className="rc-filter-field-value">
        {filter.any.join(', ')}
      </span>,
    );
  } else if (filter.value) {
    text.push(
      <span key="filter-value" className="rc-filter-field-value">
        {filter.value}
      </span>,
    );
  }

  return <div className="rc-filters-filter">{text}</div>;
};

// We can rename this component when we remove the higher level `Filter` component. For now, I
// think we need to keep it around for parameters.

const FilterItem = ({ filter, operators, onRemove, onEdit }) => {
  const text = renderText(filter, operators);

  return (
    <ListItem
      className="rc-filters-list-item"
      onRemove={onRemove}
      onEdit={onEdit}
      onClick={onEdit}
    >
      {text}
    </ListItem>
  );
};

FilterItem.propTypes = propTypes;
FilterItem.defaultProps = defaultProps;

export default FilterItem;
