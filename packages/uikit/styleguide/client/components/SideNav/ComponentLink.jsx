import { string } from 'prop-types';
import React from 'react';
import { NavLink } from 'react-router-dom';

import styles from './SideNav.css';

const ComponentLink = ({ path, name }) => (
  <li key={path}>
    <NavLink to={`/components/${path}`} activeClassName={styles.active}>
      {name}
    </NavLink>
  </li>
);

ComponentLink.propTypes = {
  name: string.isRequired,
  path: string.isRequired,
};

export default ComponentLink;
