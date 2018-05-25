import classNames from 'classnames';
import {
  string,
  array,
  arrayOf,
  object,
  bool,
  oneOfType,
  oneOf,
} from 'prop-types';
import map from 'ramda/src/map';
import React from 'react';

import styles from './Input.css';
import typography from '../../styles/typography.css';
import ErrorMessage from './ErrorMessage';

export const SUPPORTED_TYPES = [
  'text',
  'number',
  'search',
  'email',
  'tel',
  'url',
  'password',
];

const Input = ({
  className,
  id,
  label,
  inline,
  disabled,
  errors,
  style,
  ...other
}) => (
  <label
    htmlFor={id}
    className={classNames(
      styles.label,
      typography.bodyBold,
      {
        [styles.inline]: inline,
        [styles.error]: errors && errors.length,
      },
      className,
    )}
    style={style}
  >
    {label}
    <div className={styles.inputErrorsContainer}>
      <input
        id={id}
        className={classNames(styles.input, typography.body, {
          [styles.error]: errors,
        })}
        disabled={disabled}
        {...other}
      />
      {!disabled && map(ErrorMessage, errors)}
    </div>
  </label>
);

Input.propTypes = {
  id: string.isRequired,
  label: string.isRequired,
  type: oneOf(SUPPORTED_TYPES),
  inline: bool,
  disabled: bool,
  errors: oneOfType([bool, arrayOf(string)]),
  className: oneOfType([string, array, object]),
  style: object, //eslint-disable-line
};

Input.defaultProps = {
  className: '',
  type: 'text',
  inline: false,
  disabled: false,
  errors: false,
  style: {},
};

export default Input;
