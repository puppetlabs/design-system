import { arrayOf, shape, string } from 'prop-types';
import { map } from 'ramda';
import React from 'react';
import { Link } from 'react-router-dom';

import SideNavLink from './SideNavLink';
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
          <SideNavLink path="/foundations/colors" name="Colors" />
          <SideNavLink path="/foundations/typography" name="Typography" />
          <SideNavLink path="/foundations/icons" name="Icons and logos" />
          <SideNavLink path="/foundations/grid" name="Grid system" />
          <SideNavLink path="/foundations/spacing" name="Spacing and padding" />
        </ul>
      </li>
      <li>
        Components
        <ul>{map(SideNavLink, components)}</ul>
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
