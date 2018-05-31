import { string } from 'prop-types';
import React from 'react';
import { NavLink } from 'react-router-dom';

import styles from './SideNav.css';

const SideNavLink = ({ path, name }) => (
  <li key={path}>
    <NavLink to={path} activeClassName={styles.active}>
      {name}
    </NavLink>
  </li>
);

SideNavLink.propTypes = {
  name: string.isRequired,
  path: string.isRequired,
};

export default SideNavLink;
