import PropTypes from 'prop-types';
import React from 'react';
import classnames from 'classnames';
import Section from './Section';
import Item from './Item';
import Footer from './Footer';
import Header from './Header';
import Navigation from './Navigation';

const propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  /** Is sidebar at the smaller size? */
  minimized: PropTypes.bool,
};

const defaultProps = {
  children: [],
  className: '',
  minimized: false,
};

/**
 * `Sidebar` displays high-level navigation with optional subsections and actions.
 */
const Sidebar = ({ className, children, minimized }) => {
  const classNames = classnames('rc-sidebar', className, {
    'rc-sidebar-minimized': minimized,
  });

  return <aside className={classNames}>{children}</aside>;
};

Sidebar.propTypes = propTypes;
Sidebar.defaultProps = defaultProps;

Sidebar.Header = Header;
Sidebar.Navigation = Navigation;
Sidebar.Section = Section;
Sidebar.Item = Item;
Sidebar.Footer = Footer;

export default Sidebar;
