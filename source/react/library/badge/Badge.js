import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import { selectFirstTrue } from '../../helpers/statics';

const propTypes = {
  bold: PropTypes.bool,
  subtle: PropTypes.bool,
  pill: PropTypes.bool,
  danger: PropTypes.bool,
  info: PropTypes.bool,
  neutral: PropTypes.bool,
  success: PropTypes.bool,
  warning: PropTypes.bool,
  className: PropTypes.string,
  children: PropTypes.node,
};

const defaultProps = {
  bold: false,
  subtle: false,
  pill: false,
  danger: false,
  info: false,
  neutral: false,
  success: false,
  warning: false,
  className: '',
  children: null,
};

const Badge = ({
  bold,
  subtle,
  pill,
  danger,
  info,
  neutral,
  success,
  warning,
  className,
  children,
  ...props
}) => {
  const type = selectFirstTrue({ bold, subtle, pill }, 'bold');

  const color = selectFirstTrue(
    { danger, info, neutral, success, warning },
    'neutral',
  );

  return (
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
};

Badge.propTypes = propTypes;
Badge.defaultProps = defaultProps;

export default Badge;
