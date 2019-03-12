/* eslint-disable no-console */
import React from 'react';
import PropTypes from 'prop-types';
import { mapObjIndexed } from 'ramda';
import { Link } from 'react-router-dom';

import ForgotPasswordSent from 'auth/ForgotPasswordSent';

const propTypes = {
  t: PropTypes.func.isRequired,
};

const ForgotPasswordSentStyleguide = ({ t }) => {
  // Pulling corresponding keys from login.json
  const localeStrings = mapObjIndexed(
    (value, key) => t(key),
    ForgotPasswordSent.defaultProps.localeStrings,
  );

  return (
    <ForgotPasswordSent
      product="Product"
      renderBackToLoginAs={Link}
      backToLoginProps={{ to: '/auth/login' }}
      localeStrings={localeStrings}
    />
  );
};

ForgotPasswordSentStyleguide.propTypes = propTypes;

export default ForgotPasswordSentStyleguide;
/* eslint-enable */
