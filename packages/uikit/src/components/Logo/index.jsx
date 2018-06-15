import React from 'react';
import { node, string, bool } from 'prop-types';
import classNames from 'classnames';

import styles from './Logo.css';

const Logo = ({ children, viewBox, reversed, className, ...props }) => (
  <svg
    viewBox={viewBox}
    className={classNames(
      styles.logo,
      { [styles.reversed]: reversed },
      className,
    )}
    {...props}
  >
    {children}
  </svg>
);

Logo.propTypes = {
  children: node.isRequired,
  viewBox: string,
  reversed: bool,
  className: string,
};

Logo.defaultProps = {
  viewBox: '0 0 180 48',
  reversed: false,
  className: '',
};

export default Logo;
