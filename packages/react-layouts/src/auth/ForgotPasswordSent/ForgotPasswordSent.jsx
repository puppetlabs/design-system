import React from 'react';
import PropTypes from 'prop-types';
import { renderableElement } from '../../utils/customPropTypes';
import AuthLayout from '../AuthLayout';

const propTypes = {
  /** Product logo. One of the official set or a custom string */
  product: PropTypes.string,
  /** Element override for the back to login link, to allow use of ReactRouter */
  renderBackToLoginAs: renderableElement,
  /** Additional props passed to the back to login link */
  backToLoginProps: PropTypes.shape({}),
  /** Full set of necessary localized strings. Defaults are provided for ease of setup but **translated strings should be used in production** */
  localeStrings: PropTypes.shape({
    title: PropTypes.string.isRequired,
    subtitle: PropTypes.string.isRequired,
    backToLoginLink: PropTypes.string.isRequired,
  }),
};

const defaultProps = {
  product: 'Product',
  renderBackToLoginAs: 'a',
  backToLoginProps: {},
  localeStrings: {
    title: 'Check your email',
    subtitle:
      'If that email address matches an account we will send a link to reset your password.',
    backToLoginLink: 'Return to sign in',
  },
};

const ForgotPasswordSent = ({
  product,
  renderBackToLoginAs,
  backToLoginProps,
  localeStrings,
  ...rest
}) => (
  <AuthLayout
    product={product}
    title={localeStrings.title}
    subtitle={localeStrings.subtitle}
    {...rest}
  >
    <AuthLayout.Action as={renderBackToLoginAs} {...backToLoginProps}>
      {localeStrings.backToLoginLink}
    </AuthLayout.Action>
  </AuthLayout>
);

ForgotPasswordSent.propTypes = propTypes;
ForgotPasswordSent.defaultProps = defaultProps;
ForgotPasswordSent.requiredStrings = Object.keys(defaultProps.localeStrings);

export default ForgotPasswordSent;
