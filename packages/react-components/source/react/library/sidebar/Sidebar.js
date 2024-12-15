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
  /** CSS class name applied to the root element */
  className: PropTypes.string,
  /** Minimize the width of the sidebar and only show icons, rather than icons and text */
  minimized: PropTypes.bool,
  /** The children are generally `Sidebar.Header`, `Sidebar.Navigation`, `Sidebar.Section`, `Sidebar.Item` and `Sidebar.Footer`. However, due to the composable nature of this component you can add to it as needed  */
  children: PropTypes.node, //eslint-disable-line
};

const defaultProps = {
  className: '',
  minimized: false,
  children: [],
};

const Sidebar = (props) => {
  const { className, minimized, ...rest } = props;
  const classNames = classnames('rc-sidebar', className, {
    'rc-sidebar-minimized': minimized,
  });
  const revisedChildren = renderChildren(props);

  return (
    <aside className={classNames} {...rest}>
      {revisedChildren}
    </aside>
  );
};

Sidebar.propTypes = propTypes;
Sidebar.defaultProps = defaultProps;

Sidebar.Header = Header;
Sidebar.Navigation = Navigation;
Sidebar.Section = Section;
Sidebar.Item = Item;
Sidebar.Footer = Footer;

export default Sidebar;
