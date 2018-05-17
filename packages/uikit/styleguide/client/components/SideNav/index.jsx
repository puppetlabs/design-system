import { arrayOf, shape, string } from 'prop-types';
import { map } from 'ramda';
import React from 'react';
import { Link } from 'react-router-dom';

import ComponentLink from './ComponentLink';
import styles from './SideNav.css';
import path from './logo.png';

const SideNav = ({ components }) => (
  <div className={styles.sideNav}>
    <Link to="/">
      <img src={path} alt="styleguide logo" width="160" height="43" />
    </Link>
    <ul>
      <li>
        <Link to="/">Overview</Link>
      </li>
      <li>
        Foundations
        <ul>
          <li>
            <Link to="/foundations/colors">Colors</Link>
          </li>
        </ul>
      </li>
      <li>
        Components
        <ul>{map(ComponentLink, components)}</ul>
      </li>
      <li>Guidelines</li>
      <li>Navigation</li>
      <li>Resources</li>
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
