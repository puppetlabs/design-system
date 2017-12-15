import React from 'react';

const propTypes = {
  /** either "ordered" or "unordered" */
  type: React.PropTypes.string,
  children: React.PropTypes.any,
};

const defaultProps = {
  type: 'unordered',
  children: null,
};

/**
 * `List` is a container for rendering `ListItem`s.
 *
 * @example ../../../../docs/List.md
 */
class List extends React.PureComponent {
  render() {
    const { type, children } = this.props;
    let jsx;

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

export default List;
