/* eslint-disable no-console */
import React from 'react';
import PropTypes from 'prop-types';
import { mapObjIndexed } from 'ramda';
import { Link } from 'react-router-dom';

import ResetPassword from 'auth/ResetPassword';

const propTypes = {
  t: PropTypes.func.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};

const ResetPasswordStyleguide = ({ t, history }) => {
  // Pulling corresponding keys from login.json
  const localeStrings = mapObjIndexed(
    (value, key) => t(key),
    ResetPassword.defaultProps.localeStrings,
  );

  // Replace with server call
  const onSubmit = async (token, values) => {
    await new Promise(res => setTimeout(res, 1000));

    console.log('Reset password', token, values);

    history.push('/auth/reset-password-success');
  };

  // Repace with custom error handling
  const mapErrorToMessage = e => {
    console.log(e);

    // This should also be translated, but the messaging will depend on the platform
    return 'There was a problem please try again';
  };

  return (
    <ResetPassword
      product="Product"
      onSubmit={onSubmit}
      mapErrorToMessage={mapErrorToMessage}
      renderBackToLoginAs={Link}
      backToLoginProps={{ to: '/auth/login' }}
      localeStrings={localeStrings}
    />
  );
};

ResetPasswordStyleguide.propTypes = propTypes;

export default ResetPasswordStyleguide;
/* eslint-enable */
