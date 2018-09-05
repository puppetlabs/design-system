import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';

const propTypes = {
  children: PropTypes.node.isRequired,
  as: PropTypes.oneOfType([PropTypes.string, PropTypes.func]),
  className: PropTypes.string,
  size: PropTypes.oneOf(['small', 'tiny']),
  color: PropTypes.oneOf(['subtle', 'medium']),
};

const defaultProps = {
  as: 'div',
  className: '',
  size: null,
  color: null,
};

const Text = ({ as, size, color, children, className, ...other }) => {
  const Component = as;

  return (
    <Component
      className={classNames(
        'rc-text',
        {
          [`rc-text-${size}`]: size,
          [`rc-text-${color}`]: color,
        },
        className,
      )}
      {...other}
    >
      {children}
    </Component>
  );
};

Text.propTypes = propTypes;
Text.defaultProps = defaultProps;

export default Text;
