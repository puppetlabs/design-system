import PropTypes from 'prop-types';
import React from 'react';
import {
  SortableContainer,
  SortableElement,
} from 'react-sortable-hoc';

import Item from './ListItem';

const propTypes = {
  sortable: PropTypes.bool,
  children: PropTypes.any,
  /** either "ordered" or "unordered" */
  type: PropTypes.string,
  onSort: PropTypes.func,
};

const defaultProps = {
  sortable: false,
  onSort: () => {},
  type: 'unordered',
  children: null,
};

const SortableItem = SortableElement(({ value }) => value);

const SortableList = SortableContainer(({ items }) => {
  const list = items.map((i, idx) => (
    <SortableItem key={ i.key } index={ idx } value={ i } />
  ));

  return (
    <div>{ list }</div>
  );
});

/**
 * `List` is a container for rendering `ListItem`s.
 */
class List extends React.Component {
  constructor(props) {
    super(props);

    this.onSortEnd = this.onSortEnd.bind(this);
  }

  onSortEnd({ oldIndex, newIndex }) {
    this.props.onSort(oldIndex, newIndex);
  }

  render() {
    const { type, sortable } = this.props;
    let children = React.Children.toArray(this.props.children);
    let jsx;

    if (sortable) {
      children = (
        <SortableList
          items={ children }
          onSortEnd={ this.onSortEnd }
          helperClass="rc-list-dragging"
          pressDelay={ 100 }
          lockToContainerEdges
        />
      );
    }

    if (type === 'ordered') {
      jsx = <ol className="rc-list rc-list-ordered">{ children }</ol>;
    } else {
      jsx = <ul className="rc-list rc-list-unordered">{ children }</ul>;
    }

    return jsx;
  }
}

List.propTypes = propTypes;
List.defaultProps = defaultProps;

List.Item = Item;

export default List;
