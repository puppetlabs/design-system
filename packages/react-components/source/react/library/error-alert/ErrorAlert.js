import React from 'react';
import { error as errorType } from '../../helpers/customPropTypes';
import Alert from '../alert/Alert';

const propTypes = {
  /** An error as a string, Error instance, or custom extended type */
  error: errorType.isRequired,
};

const getMessage = error => {
  if (typeof error === 'string') {
    return error;
  }

  return error.message;
};

const getPublicCauses = error => {
  const causes = error.causes || [];

  return causes.filter(cause => !cause.sensitivity);
};

const CauseList = ({ error }) => {
  const causes = getPublicCauses(error);

  if (!causes.length) {
    return null;
  }

  return (
    <ul className="rc-error-alert-cause-list">
      {causes.map(cause => {
        const message = getMessage(cause);

        return (
          <li className="rc-error-alert-cause" key={message}>
            {message}
            <CauseList error={cause} />
          </li>
        );
      })}
    </ul>
  );
};

const ErrorAlert = ({ error, ...rest }) => {
  const causes = getPublicCauses(error);

  return (
    <Alert type="danger" {...rest}>
      {getMessage(error)}
      {!!causes.length && (
        <Alert.Message>
          <CauseList error={error} />
        </Alert.Message>
      )}
    </Alert>
  );
};

ErrorAlert.propTypes = propTypes;

CauseList.propTypes = {
  error: errorType.isRequired,
};

export default ErrorAlert;
