import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import typography from '../../styles/typography.css';
import styles from './Button.css';

const Button = ({ children, secondary, tertiary, className, ...props }) => (
  <button
    className={classNames(
      styles.button,
      typography.actionPrimary,
      {
        [styles.secondary]: secondary,
        [styles.tertiary]: tertiary,
        [typography.actionSecondary]: secondary || tertiary,
      },
      className,
    )}
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
