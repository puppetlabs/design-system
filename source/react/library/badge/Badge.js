import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';

const propTypes = {
  type: PropTypes.oneOf(['danger', 'info', 'neutral', 'success', 'warning']),
  weight: PropTypes.oneOf(['bold', 'subtle']),
  pill: PropTypes.bool,
  children: PropTypes.node,
  className: PropTypes.string,
  style: PropTypes.shape({}),
};

const defaultProps = {
  type: 'neutral',
  weight: 'bold',
  pill: false,
  children: null,
  className: '',
  style: {},
};

const Badge = ({ type, weight, pill, children, className, ...props }) => (
  <div
    className={classNames(
      'rc-badge',
      `rc-badge-${type}`,
      `rc-badge-${weight}`,
      {
        'rc-badge-pill': pill,
      },
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
