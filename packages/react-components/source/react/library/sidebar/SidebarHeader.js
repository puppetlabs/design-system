import React from 'react';
import PropTypes from 'prop-types';
import Logo from '../logo';

const propTypes = {
  ariaLabel: PropTypes.string,
  as: PropTypes.elementType,
  children: PropTypes.node,
  className: PropTypes.string,
  logo: PropTypes.string,
  minimized: PropTypes.bool,
  onClick: PropTypes.func,
};
const defaultProps = {
  ariaLabel: 'Return to home',
  as: 'button',
  children: null,
  className: '',
  logo: '',
  minimized: false,
  onClick() {},
};

const SidebarHeader = ({
  ariaLabel,
  as,
  children,
  className,
  logo,
  minimized,
  ...rest
}) => {
  const Component = as;

  return (
    <Component
      className={`rc-sidebar-header ${className}`}
      {...rest}
      aria-label={ariaLabel}
    >
      {logo && (
        <Logo
          inverted
          expanded
          product={logo}
          type={minimized ? 'bug' : 'full'}
        />
      )}
      {children}
    </Component>
  );
};

SidebarHeader.propTypes = propTypes;
SidebarHeader.defaultProps = defaultProps;

export default SidebarHeader;
