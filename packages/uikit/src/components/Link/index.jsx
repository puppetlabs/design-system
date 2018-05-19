import classNames from 'classnames';
import React from 'react';
import { node, bool, oneOfType, string, array, object } from 'prop-types';
import { Link as ReactRouterLink } from 'react-router-dom';

import isExternal from './isExternal';
import typography from '../../styles/typography.css';
import styles from './Link.css';

const Link = ({
  children,
  button,
  to,
  small,
  disabled,
  className,
  ...other
}) => {
  const fullClass = classNames(
    styles.link,
    small ? typography.bodyLinkSmall : typography.bodyLink,
    className,
  );

  if (button) {
    return (
      <button className={fullClass} disabled={disabled} {...other}>
        {children}
      </button>
    );
  }

  if (isExternal(to)) {
    return (
      <a href={to} className={fullClass} aria-disabled={disabled} {...other}>
        {children}
      </a>
    );
  }

  return (
    <ReactRouterLink
      to={to}
      className={fullClass}
      aria-disabled={disabled}
      {...other}
    >
      {children}
    </ReactRouterLink>
  );
};

Link.propTypes = {
  children: node,
  button: bool,
  to: string,
  small: bool,
  disabled: bool,
  className: oneOfType([string, array, object]),
};

Link.defaultProps = {
  children: '',
  button: false,
  to: '',
  small: false,
  disabled: false,
  className: '',
};

export default Link;
