import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';

const propTypes = {
  /** Type dictates badge coloring */
  type: PropTypes.oneOf(['danger', 'info', 'neutral', 'success', 'warning']),
  /** Weight dictates the punchiness of badge coloring */
  weight: PropTypes.oneOf(['bold', 'subtle']),
  /** Setting pill to true fully rounds the borders */
  pill: PropTypes.bool,
  /** The content to render within the badge */
  children: PropTypes.node,
  /** Optional additional classnames */
  className: PropTypes.string,
  /** Optional additional inline styles */
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
