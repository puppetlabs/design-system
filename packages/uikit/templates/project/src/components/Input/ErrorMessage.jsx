import classNames from 'classnames';
import React from 'react';

import styles from './Input.css';
import typography from '../../styles/typography.css';

const ErrorMessage = error => (
  <span
    key={error}
    className={classNames(styles.errorMessage, typography.body)}
  >
    {error}
  </span>
);

export default ErrorMessage;
