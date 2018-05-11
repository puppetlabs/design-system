import React from 'react';
import PropTypes from 'prop-types';
import unboundClassNames from 'classnames/bind';
import styles from './Button.css';

console.log(styles);

const classNames = unboundClassNames.bind(styles);

const Button = ({ children, secondary, tertiary, className, ...props }) => (
  <button
    className={classNames('button', { secondary, tertiary }, className)}
    {...props}
  >
    {children}
  </button>
);

Button.propTypes = {
  children: PropTypes.node,
  secondary: PropTypes.bool,
  tertiary: PropTypes.bool,
  className: PropTypes.oneOfType(
    PropTypes.string,
    PropTypes.array,
    PropTypes.object,
  ),
};

Button.defaultProps = {
  children: '',
  secondary: false,
  tertiary: false,
  className: '',
};

export default Button;
