import React from 'react';

import { filterOperators } from '../../constants';

import Button from '../Button';
import Tag from '../Tag';

const propTypes = {
  filter: React.PropTypes.object.isRequired,
  onEdit: React.PropTypes.func,
  onRemove: React.PropTypes.func,
};

const defaultProps = {
  onEdit: () => {},
  onRemove: () => {},
};

const getOperatorSentenceForm = (op) => {
  let sentenceForm = op;

  filterOperators.forEach((operator) => {
    if (operator.symbol === op) {
      sentenceForm = operator.sentence;
    }
  });

  return sentenceForm;
};

const renderText = (filter) => {
  const text = [];

  text.push(<span key="field-name" className="filter-field-name">{ filter.field }</span>);

  if (filter.op) {
    const operator = getOperatorSentenceForm(filter.op);

    text.push(<span key="field-op" className="filter-field-op">{ operator }</span>);
  }

  if (filter.any) {
    text.push(<span key="filter-value" className="filter-field-value">{ filter.any.join(', ') }</span>);
  } else if (filter.value) {
    text.push(<span key="filter-value" className="filter-field-value">{ filter.value }</span>);
  }

  return text;
};

const Filter = (props) => {
  const text = renderText(props.filter);
  const tagActions = [
    <Button
      className="rc-filters-action-duplicate"
      icon="pencil"
      size="tiny"
      key="edit-filter"
      transparent
      onClick={ props.onEdit }
    />,
    <Button
      icon="close"
      size="tiny"
      key="delete-filter"
      transparent
      onClick={ props.onRemove }
    />,
  ];

  return (
    <Tag className="rc-filters-filter" actions={ tagActions }>
      { text }
    </Tag>
  );
};

Filter.propTypes = propTypes;
Filter.defaultProps = defaultProps;

export default Filter;
