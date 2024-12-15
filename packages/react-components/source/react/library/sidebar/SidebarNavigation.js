import React from 'react';
import PropTypes from 'prop-types';
import renderChildren from './helper';

const propTypes = {
  children: PropTypes.node.isRequired, //eslint-disable-line
};

const SidebarNavigation = (props) => (
  <nav role="navigation" aria-label="Main" className="rc-sidebar-navigation">
    {renderChildren(props)}
  </nav>
);

SidebarNavigation.propTypes = propTypes;

export default SidebarNavigation;
