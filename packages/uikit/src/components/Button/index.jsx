import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import typography from '../../styles/typography.css';
import styles from './Button.css';

const Button = ({
  children,
  secondary,
  link,
  tertiary,
  className,
  ...props
}) => (
  <button
    className={classNames(
      styles.button,
      {
        [styles.secondary]: secondary,
        [styles.tertiary]: tertiary,
        [styles.link]: link,
        [typography.actionPrimary]: !(secondary || tertiary || link),
        [typography.actionSecondary]: secondary || tertiary,
        [typography.bodyLink]: link,
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
  link: PropTypes.bool,
  className: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.array,
    PropTypes.object,
  ]),
};

Button.defaultProps = {
  children: '',
  secondary: false,
  tertiary: false,
  link: false,
  className: '',
};

export default Button;
