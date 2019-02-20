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
 * `Sidebar` displays high-level navigation with optional subsections and actions.
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
