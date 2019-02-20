import React from 'react';
import PropTypes from 'prop-types';

const propTypes = {
  children: PropTypes.node.isRequired,
};

const Navigation = ({ children }) => (
  <nav role="navigation" aria-label="Main" className="rc-sidebar-navigation">
    {children}
  </nav>
);

Navigation.propTypes = propTypes;

export default Navigation;
