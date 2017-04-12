import React from 'react';

const propTypes = {
  children: React.PropTypes.any,
  /** either "ordered" or "unordered" */
  type: React.PropTypes.string,
};

const defaultProps = {
  type: 'unordered',
};

/**
 * `List` is a container for rendering `ListItem`s.
 *
 * @example ../../../../docs/List.md
 */
class List extends React.PureComponent {
  getElement() {
    const { type } = this.props;
    let elemType;

    if (type === 'unordered') {
      elemType = 'ul';
    } else {
      elemType = 'ol';
    }

    return elemType;
  }

  render() {
    const { children } = this.props;
    const element = this.getElement();

    return React.createElement(element, { children });
  }
}

List.propTypes = propTypes;
List.defaultProps = defaultProps;

export default List;
