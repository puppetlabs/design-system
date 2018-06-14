import React from 'react';
import { node, string } from 'prop-types';
import classNames from 'classnames';

import styles from './Logo.css';

const Logo = ({ children, viewBox, className, ...props }) => (
  <svg
    viewBox={viewBox}
    className={classNames(styles.logo, className)}
    {...props}
  >
    {children}
  </svg>
);

Logo.propTypes = {
  children: node.isRequired,
  viewBox: string,
  className: string,
};

Logo.defaultProps = {
  viewBox: '0 0 180 48',
  className: '',
};

export default Logo;
