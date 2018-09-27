import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';

const propTypes = {
  type: PropTypes.oneOf(['bold', 'subtle', 'pill']),
  color: PropTypes.oneOf(['danger', 'info', 'neutral', 'success', 'warning']),
  className: PropTypes.string,
  children: PropTypes.node,
};

const defaultProps = {
  type: 'bold',
  color: 'neutral',
  className: '',
  children: null,
};

const Badge = ({ type, color, className, children, ...props }) => (
  <div
    className={classNames(
      'rc-badge',
      `rc-badge-${type}`,
      `rc-badge-${color}`,
      className,
    )}
    {...props}
  >
    {children}
  </div>
);

Badge.propTypes = propTypes;
Badge.defaultProps = defaultProps;

export default Badge;
