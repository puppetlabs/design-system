import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';

const propTypes = {
  type: PropTypes.oneOf(['bold', 'subtle', 'pill']),
  color: PropTypes.oneOf(['danger', 'info', 'neutral', 'success', 'warning']),
  level: PropTypes.oneOf([0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, null]),
  palette: PropTypes.oneOf(['sequential', null]),
  className: PropTypes.string,
  children: PropTypes.node,
};

const defaultProps = {
  type: 'bold',
  level: 'null',
  color: 'neutral',
  palette: null,
  className: '',
  children: null,
};

const Badge = ({
  type,
  color,
  level,
  palette,
  className,
  children,
  ...props
}) => (
  <div
    className={classNames(
      'rc-badge',
      `rc-badge-${type}`,
      `rc-badge-${color}`,
      `rc-badge-${palette}-${level}`,
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
