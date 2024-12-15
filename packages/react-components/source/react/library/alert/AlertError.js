import React from 'react';
import { error as errorType } from '../../helpers/customPropTypes';
import AlertMessage from './AlertMessage';

const propTypes = {
  /** An error as a string, Error instance, or custom extended type */
  error: errorType.isRequired,
};

const getMessage = (error) => {
  if (typeof error === 'string') {
    return error;
  }

  return error.message;
};

const getPublicCauses = (error) => {
  const causes = error.causes || [];

  return causes.filter((cause) => !cause.sensitivity);
};

const CauseList = ({ error }) => {
  const causes = getPublicCauses(error);

  if (!causes.length) {
    return null;
  }

  return (
    <ul className="rc-error-alert-cause-list">
      {causes.map((cause) => {
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

const AlertError = ({ error }) => {
  const causes = getPublicCauses(error);

  return (
    <>
      {getMessage(error)}
      {!!causes.length && (
        <AlertMessage>
          <CauseList error={error} />
        </AlertMessage>
      )}
    </>
  );
};

AlertError.propTypes = propTypes;

CauseList.propTypes = {
  error: errorType.isRequired,
};

export default AlertError;
