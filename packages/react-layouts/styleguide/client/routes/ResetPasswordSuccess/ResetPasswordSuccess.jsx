/* eslint-disable no-console */
import React from 'react';
import PropTypes from 'prop-types';
import { mapObjIndexed } from 'ramda';
import { Link } from 'react-router-dom';

import ResetPasswordSuccess from 'auth/ResetPasswordSuccess';

const propTypes = {
  t: PropTypes.func.isRequired,
};

const ResetPasswordSuccessStyleguide = ({ t }) => {
  // Pulling corresponding keys from login.json
  const localeStrings = mapObjIndexed(
    (value, key) => t(key),
    ResetPasswordSuccess.defaultProps.localeStrings,
  );

  return (
    <ResetPasswordSuccess
      product="Product"
      renderContinueAs={Link}
      continueProps={{ to: '/' }}
      localeStrings={localeStrings}
    />
  );
};

ResetPasswordSuccessStyleguide.propTypes = propTypes;

export default ResetPasswordSuccessStyleguide;
/* eslint-enable */
