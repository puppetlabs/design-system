import React from 'react';
import classnames from 'classnames';

import Section from './MenuSection';
import Header from './MenuHeader';
import Item from './MenuItem';
import List from './MenuList';

const propTypes = {
  className: React.PropTypes.string,
  size: React.PropTypes.oneOf(['small', 'tiny']),
  children: React.PropTypes.any,
};

const defaultProps = {
  size: 'small',
  children: null,
  className: null,
};

/**
 * Menu can be used to present a list of options, form items, and various
 * buttons to the user. It can contain `MenuHeader`, `MenuList`, and
 * `MenuSection` components.
 *
 * @example ../../../../docs/Menu.md
 */

const Menu = (props) => {
  const { size, children, className: classProp } = props;
  const className = classnames('rc-menu', classProp, {
    [`rc-menu-${size}`]: size,
  });

  return <div className={ className }>{ children }</div>;
};

Menu.propTypes = propTypes;
Menu.defaultProps = defaultProps;

Menu.Section = Section;
Menu.Header = Header;
Menu.Item = Item;
Menu.List = List;

export default Menu;
