/* eslint-disable no-console */
import React from 'react';
import PropTypes from 'prop-types';
import { mapObjIndexed } from 'ramda';

import Confirmation from 'auth/Confirmation';

const propTypes = {
  t: PropTypes.func.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};

const ConfirmationStyleguide = ({ t, history }) => {
  // Pulling corresponding keys from login.json
  const localeStrings = mapObjIndexed(
    (value, key) => t(key),
    Confirmation.defaultProps.localeStrings,
  );

  // Replace with server call
  const validateToken = async token => {
    await new Promise(res => setTimeout(res, 1000));

    console.log(`Validated token ${token}`);

    return {
      email: 'email@treemail.com',
      company: 'Company.inc',
    };
  };

  // Repace with custom error handling
  const mapTokenErrorToMessage = e => {
    console.log(e);

    // This should also be translated, but the messaging will depend on the platform
    return 'Invalid or expired token';
  };

  // Replace with server call
  const onSubmit = async (token, values) => {
    await new Promise(res => setTimeout(res, 1000));

    console.log(`Logged in with email ${values.email}`);

    history.push('/');
  };

  // Repace with custom error handling
  const mapErrorToMessage = e => {
    console.log(e);

    // This should also be translated, but the messaging will depend on the platform
    return 'Invalid email or password, please try again';
  };

  return (
    <Confirmation
      product="Product"
      token="xyz"
      validateToken={validateToken}
      mapTokenErrorToMessage={mapTokenErrorToMessage}
      onSubmit={onSubmit}
      mapErrorToMessage={mapErrorToMessage}
      localeStrings={localeStrings}
      disableCompanySelection
    />
  );
};

ConfirmationStyleguide.propTypes = propTypes;

export default ConfirmationStyleguide;
/* eslint-enable */
