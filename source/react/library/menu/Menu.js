import PropTypes from 'prop-types';
import React from 'react';
import classnames from 'classnames';

import Section from './MenuSection';
import Actions from './MenuActions';
import Header from './MenuHeader';
import Item from './MenuItem';
import List from './MenuList';

const propTypes = {
  className: PropTypes.string,
  size: PropTypes.oneOf(['tiny', 'small', 'medium']),
  dark: PropTypes.bool,
  children: PropTypes.node,
};

const defaultProps = {
  size: 'small',
  children: null,
  className: null,
  dark: false,
};

/**
 * Menu can be used to present a list of options, form items, and various
 * buttons to the user. It can contain `MenuHeader`, `MenuList`, and
 * `MenuSection` components.
 */

const Menu = props => {
  const { size, children, className: classProp, dark } = props;
  const className = classnames('rc-menu', classProp, {
    'rc-menu-dark': dark,
    [`rc-menu-${size}`]: size,
  });

  return <div className={className}>{children}</div>;
};

Menu.propTypes = propTypes;
Menu.defaultProps = defaultProps;

Menu.Section = Section;
Menu.Header = Header;
Menu.Item = Item;
Menu.List = List;
Menu.Actions = Actions;

export default Menu;
