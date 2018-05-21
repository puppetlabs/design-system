import classNames from 'classnames';
import { node, oneOf, bool, string } from 'prop-types';
import React from 'react';

import getTypography from './getTypography';

const Header = ({ children, as, numbers, className, ...others }) => {
  /**
   * JSX requires element names to be capitalized if they are referenced as variables
   */
  const Component = as;

  return (
    <Component
      className={classNames(getTypography(as, numbers), className)}
      {...others}
    >
      {children}
    </Component>
  );
};

Header.propTypes = {
  children: node,
  as: oneOf(['h1', 'h2', 'h3', 'h4']),
  numbers: bool,
  className: string,
};

Header.defaultProps = {
  children: '',
  as: 'h1',
  numbers: false,
  className: '',
};

export default Header;
