/* eslint-disable no-console */
import React from 'react';
import PropTypes from 'prop-types';
import { mapObjIndexed } from 'ramda';
import { Link } from 'react-router-dom';

import ForgotPassword from 'auth/ForgotPassword';

const propTypes = {
  t: PropTypes.func.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};

const ForgotPasswordStyleguide = ({ t, history }) => {
  // Pulling corresponding keys from login.json
  const localeStrings = mapObjIndexed(
    (value, key) => t(key),
    ForgotPassword.defaultProps.localeStrings,
  );

  // Replace with server call
  const onSubmit = async values => {
    await new Promise(res => setTimeout(res, 1000));

    console.log(`Submitted ${values.email}`);

    history.push('/auth/forgot-password-sent');
  };

  // Repace with custom error handling
  const mapErrorToMessage = e => {
    console.log(e);

    // This should also be translated, but the messaging will depend on the platform
    return 'There was a problem please try again';
  };

  return (
    <ForgotPassword
      product="Product"
      onSubmit={onSubmit}
      mapErrorToMessage={mapErrorToMessage}
      renderBackToLoginAs={Link}
      backToLoginProps={{ to: '/auth/login' }}
      localeStrings={localeStrings}
    />
  );
};

ForgotPasswordStyleguide.propTypes = propTypes;

export default ForgotPasswordStyleguide;
/* eslint-enable */
