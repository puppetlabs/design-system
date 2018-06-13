import React from 'react';
import { node, string } from 'prop-types';
import classNames from 'classnames';

import styles from './Icon.css';

const Icon = ({ children, viewBox, className, ...props }) => (
  <svg
    viewBox={viewBox}
    className={classNames(styles.icon, className)}
    {...props}
  >
    {children}
  </svg>
);

Icon.propTypes = {
  children: node.isRequired,
  viewBox: string,
  className: string,
};

Icon.defaultProps = {
  viewBox: '0 0 24 24',
  className: '',
};

export default Icon;
