import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Form } from '@puppet/react-components';
import AuthLayout from '../AuthLayout';

const propTypes = {
  /** Product logo. One of the official set or a custom string */
  product: PropTypes.string,
  /** Form submit handler. Handled asynchronously, passed the field values { email, password } */
  onSubmit: PropTypes.func,
  /** Callback executed with a submit fetch error when present. Should map the error object to a localized string message */
  mapErrorToMessage: PropTypes.func,
  /** Element override for the reset password link, to allow use of ReactRouter */
  renderResetPasswordAs: PropTypes.elementType,
  /** Additional props passed to the reset password link */
  resetPasswordProps: PropTypes.shape({}),
  /** Full set of necessary localized strings. Defaults are provided for ease of setup but **translated strings should be used in production** */
  localeStrings: PropTypes.shape({
    title: PropTypes.string.isRequired,
    submitLabel: PropTypes.string.isRequired,
    emailLabel: PropTypes.string.isRequired,
    emailRequiredFieldMessage: PropTypes.string.isRequired,
    emailPlaceholder: PropTypes.string.isRequired,
    passwordLabel: PropTypes.string.isRequired,
    passwordRequiredFieldMessage: PropTypes.string.isRequired,
    passwordPlaceholder: PropTypes.string.isRequired,
    resetPasswordLink: PropTypes.string.isRequired,
  }),
};

const defaultProps = {
  product: 'Product',
  onSubmit() {},
  mapErrorToMessage: () => '',
  renderResetPasswordAs: 'a',
  resetPasswordProps: {},
  localeStrings: {
    title: 'Sign in to Product',
    submitLabel: 'Sign in',
    emailLabel: 'Email',
    emailRequiredFieldMessage: 'You must provide an email address',
    emailPlaceholder: 'Email address',
    passwordLabel: 'Password',
    passwordRequiredFieldMessage: 'You must provide a password',
    passwordPlaceholder: 'Enter password',
    resetPasswordLink: 'Reset password',
  },
};

const Login = ({
  product,
  onSubmit: onSubmitProp,
  mapErrorToMessage,
  renderResetPasswordAs,
  resetPasswordProps,
  localeStrings,
  ...rest
}) => {
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');

  const onSubmit = async values => {
    try {
      setSubmitting(true);

      await onSubmitProp(values);

      setSubmitting(false);
      setError('');
    } catch (e) {
      setSubmitting(false);
      setError(mapErrorToMessage(e));
    }
  };

  return (
    <AuthLayout product={product} title={localeStrings.title} {...rest}>
      <Form
        submittable
        actionsPosition="block"
        submitLabel={localeStrings.submitLabel}
        submitting={submitting}
        error={error}
        onSubmit={onSubmit}
      >
        <Form.Field
          type="email"
          name="email"
          autoComplete="username email"
          label={localeStrings.emailLabel}
          required
          requiredFieldMessage={localeStrings.emailRequiredFieldMessage}
          placeholder={localeStrings.emailPlaceholder}
        />
        <Form.Field
          type="password"
          name="password"
          autoComplete="current-password"
          label={localeStrings.passwordLabel}
          required
          requiredFieldMessage={localeStrings.passwordRequiredFieldMessage}
          placeholder={localeStrings.passwordPlaceholder}
        />
      </Form>
      <AuthLayout.Action as={renderResetPasswordAs} {...resetPasswordProps}>
        {localeStrings.resetPasswordLink}
      </AuthLayout.Action>
    </AuthLayout>
  );
};

Login.propTypes = propTypes;
Login.defaultProps = defaultProps;
Login.requiredStrings = Object.keys(defaultProps.localeStrings);

export default Login;
