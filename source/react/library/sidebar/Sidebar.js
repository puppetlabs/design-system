import PropTypes from 'prop-types';
import React from 'react';
import classnames from 'classnames';
import Section from './SidebarSection';
import Item from './SidebarItem';
import Footer from './SidebarFooter';
import Header from './SidebarHeader';
import Navigation from './SidebarNavigation';
import renderChildren from './helper';

const propTypes = {
  className: PropTypes.string,
  /** Is sidebar at the smaller size? */
  minimized: PropTypes.bool,
  children: PropTypes.node, //eslint-disable-line
};

const defaultProps = {
  children: [],
  className: '',
  minimized: false,
};

/**
 * The `Sidebar` component was designed and developed to be used as your primary website navigation.
 * We have taken care to make sure it is accessible. If any issues arise in this regard please let
 * us know. It is made up of the primary `Sidebar` component but can be composed by using the
 * `Sidebar.Header`, `Sidebar.Navigation`, `Sidebar.Section`, `Sidebar.Item`, and `Sidebar.Footer`
 * components. This component is stateless so you will need to manage which `Sidebar.Item` is
 * currently active. For the time being this component does not support nesting.
 */
const Sidebar = props => {
  const { className, minimized } = props;
  const classNames = classnames('rc-sidebar', className, {
    'rc-sidebar-minimized': minimized,
  });
  const revisedChildren = renderChildren(props);

  return <aside className={classNames}>{revisedChildren}</aside>;
};

Sidebar.propTypes = propTypes;
Sidebar.defaultProps = defaultProps;

Sidebar.Header = Header;
Sidebar.Navigation = Navigation;
Sidebar.Section = Section;
Sidebar.Item = Item;
Sidebar.Footer = Footer;

export default Sidebar;
