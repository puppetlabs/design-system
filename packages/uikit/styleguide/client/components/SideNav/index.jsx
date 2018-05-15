import { arrayOf, shape, string } from 'prop-types';
import { map } from 'ramda';
import React from 'react';

import ComponentLink from './ComponentLink';
import styles from './SideNav.css';

const SideNav = ({ components }) => (
  <div className={styles.sideNav}>
    Puppet Styleguide<ul>
      <li>
        Components
        <ul>{map(ComponentLink, components)}</ul>
      </li>
    </ul>
  </div>
);

SideNav.propTypes = {
  components: arrayOf(
    shape({
      name: string,
      path: string,
    }),
  ),
};

SideNav.defaultProps = {
  components: [],
};

export default SideNav;
