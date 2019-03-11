/* eslint-disable no-console */
import React from 'react';
import PropTypes from 'prop-types';
import { mapObjIndexed } from 'ramda';
import { Link } from 'react-router-dom';

import Login from 'auth/Login';

const propTypes = {
  t: PropTypes.func.isRequired,
};

const LoginStyleguide = ({ t }) => {
  // Pulling corresponding keys from login.json
  const localeStrings = mapObjIndexed(
    (value, key) => t(key),
    Login.defaultProps.localeStrings,
  );

  // Replace with server call
  const onSubmit = async values => {
    await new Promise(res => setTimeout(res, 1000));

    console.log(`Logged in with email ${values.email}`);
  };

  // Repace with custom error handling
  const mapErrorToMessage = e => {
    console.log(e);

    // This should also be translated, but the messaging will depend on the platform
    return 'Invalid email or password, please try again';
  };

  return (
    <Login
      product="Product"
      onSubmit={onSubmit}
      mapErrorToMessage={mapErrorToMessage}
      renderResetPasswordAs={Link}
      resetPasswordProps={{ to: '/auth/reset-password' }}
      localeStrings={localeStrings}
    />
  );
};

LoginStyleguide.propTypes = propTypes;

export default LoginStyleguide;
/* eslint-enable */
