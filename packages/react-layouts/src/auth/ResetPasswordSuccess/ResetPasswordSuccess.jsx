import React from 'react';
import PropTypes from 'prop-types';
import AuthLayout from '../AuthLayout';

const propTypes = {
  /** Product logo. One of the official set or a custom string */
  product: PropTypes.string,
  /** Element override for the back to login link, to allow use of ReactRouter */
  renderContinueAs: PropTypes.elementType,
  /** Additional props passed to the back to login link */
  continueProps: PropTypes.shape({}),
  /** Full set of necessary localized strings. Defaults are provided for ease of setup but **translated strings should be used in production** */
  localeStrings: PropTypes.shape({
    title: PropTypes.string.isRequired,
    subtitle: PropTypes.string.isRequired,
    continueLink: PropTypes.string.isRequired,
  }),
};

const defaultProps = {
  product: 'Product',
  renderContinueAs: 'a',
  continueProps: {},
  localeStrings: {
    title: 'Success',
    subtitle: 'Your password has been updated.',
    continueLink: 'Continue to Product',
  },
};

const ResetPasswordSuccess = ({
  product,
  renderContinueAs,
  continueProps,
  localeStrings,
  ...rest
}) => (
  <AuthLayout
    product={product}
    title={localeStrings.title}
    subtitle={localeStrings.subtitle}
    {...rest}
  >
    <AuthLayout.Action as={renderContinueAs} {...continueProps}>
      {localeStrings.continueLink}
    </AuthLayout.Action>
  </AuthLayout>
);

ResetPasswordSuccess.propTypes = propTypes;
ResetPasswordSuccess.defaultProps = defaultProps;
ResetPasswordSuccess.requiredStrings = Object.keys(defaultProps.localeStrings);

export default ResetPasswordSuccess;
