import React from 'react';
import PropTypes from 'prop-types';

const itemPropTypes = {
  active: PropTypes.bool,
  as: PropTypes.elementType,
  children: PropTypes.node,
  className: PropTypes.string,
};
const itemDefaultProps = {
  active: false,
  as: 'div',
  children: null,
  className: '',
};

const Item = ({ active, as: Element, children, className, ...props }) => (
  <li className={`rc-list-item ${active ? 'active' : ''}`}>
    <Element className={className} {...props}>
      {children}
    </Element>
  </li>
);
Item.propTypes = itemPropTypes;
Item.defaultProps = itemDefaultProps;

const propTypes = {
  children: PropTypes.node,
};
const defaultProps = {
  children: null,
};

const List = ({ children }) => <div className="rc-list">{children}</div>;

List.propTypes = propTypes;
List.defaultProps = defaultProps;

List.Item = Item;

export default List;
