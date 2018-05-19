import classNames from 'classnames';
import React from 'react';
import { node, bool, oneOfType, string, array, object } from 'prop-types';
import { Link as ReactRouterLink } from 'react-router-dom';

import isExternal from './isExternal';
import typography from '../../styles/typography.css';
import styles from './Link.css';

const getTypography = (small, secondary) => {
  if (small) {
    return secondary
      ? typography.bodyLinkSecondarySmall
      : typography.bodyLinkSmall;
  }

  return secondary ? typography.bodyLinkSecondary : typography.bodyLink;
};

const Link = ({
  children,
  button,
  to,
  small,
  secondary,
  disabled,
  className,
  ...other
}) => {
  const fullClass = classNames(
    styles.link,
    getTypography(small, secondary),
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
  secondary: bool,
  disabled: bool,
  className: oneOfType([string, array, object]),
};

Link.defaultProps = {
  children: '',
  button: false,
  to: '',
  small: false,
  secondary: false,
  disabled: false,
  className: '',
};

export default Link;
