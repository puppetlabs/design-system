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

/**
 * The `Sidebar` component was designed and developed to be used as the primary
 * webapp navigation. Care has been taken to make sure it is accessible. (If any
 * a11y issues are discovered, please file a PDS bug.) It is made up of the
 * primary `Sidebar` component but can be composed by using the
 * `Sidebar.Header`, `Sidebar.Navigation`, `Sidebar.Section`, `Sidebar.Item`,
 * and `Sidebar.Footer` components. For the time being, this component does not
 * support nesting beyond items in sections.
 *
 * This component is stateless so you will need to manage which `Sidebar.Item`
 * is currently highlighted with the `active` prop or use it with React Router's
 * [NavLink](https://reacttraining.com/react-router/web/api/NavLink) component,
 * which will apply an `active` class when the URL matches:
 *
 * ```jsx
 * <Sidebar.Item title="Hello" as={NavLink} to="/hello" />
 * ```
 */
const Sidebar = props => {
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
