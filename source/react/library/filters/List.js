import PropTypes from 'prop-types';
import React from 'react';

import Item from './ListItem';

const propTypes = {
  children: PropTypes.node,
  /** either "ordered" or "unordered" */
  type: PropTypes.string,
  onSort: PropTypes.func,
};

const defaultProps = {
  onSort: () => {},
  type: 'unordered',
  children: null,
};

/**
 * `List` is a container for rendering `ListItem`s.
 */
class List extends React.Component {
  constructor(props) {
    super(props);

    this.onSortEnd = this.onSortEnd.bind(this);
  }

  onSortEnd({ oldIndex, newIndex }) {
    const { onSort } = this.props;
    onSort(oldIndex, newIndex);
  }

  render() {
    const { type, children: propsChildren } = this.props;
    const children = React.Children.toArray(propsChildren);
    let jsx;

    if (type === 'ordered') {
      jsx = <ol className="rc-list rc-list-ordered">{children}</ol>;
    } else {
      jsx = <ul className="rc-list rc-list-unordered">{children}</ul>;
    }

    return jsx;
  }
}

List.propTypes = propTypes;
List.defaultProps = defaultProps;

List.Item = Item;

export default List;
