import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Form } from '@puppet/react-components';
import { renderableElement } from 'utils/customPropTypes';
import AuthLayout from 'auth/AuthLayout';

const propTypes = {
  /** Product logo. One of the official set or a custom string */
  product: PropTypes.string,
  /** Form submit handler. Handled asynchronously, passed the field values { email, password } */
  onSubmit: PropTypes.func,
  /** Callback executed with a submit fetch error when present. Should map the error object to a localized string message */
  mapErrorToMessage: PropTypes.func,
  /** Element override for the reset password link, to allow use of ReactRouter */
  renderResetPasswordAs: renderableElement,
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

class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      submitting: false,
      error: '',
    };

    this.onSubmit = this.onSubmit.bind(this);
  }

  async onSubmit(values) {
    const { onSubmit, mapErrorToMessage } = this.props;

    try {
      this.setState({ submitting: true });

      await onSubmit(values);

      this.setState({ submitting: false, error: '' });
    } catch (e) {
      this.setState({ submitting: false, error: mapErrorToMessage(e) });
    }
  }

  render() {
    const { submitting, error } = this.state;
    const {
      product,
      renderResetPasswordAs,
      resetPasswordProps,
      localeStrings,
      onSubmit,
      mapErrorToMessage,
      ...rest
    } = this.props;

    return (
      <AuthLayout product={product} title={localeStrings.title} {...rest}>
        <Form
          submittable
          actionsPosition="block"
          submitLabel={localeStrings.submitLabel}
          submitting={submitting}
          error={error}
          onSubmit={this.onSubmit}
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
  }
}

Login.propTypes = propTypes;
Login.defaultProps = defaultProps;
Login.requiredStrings = Object.keys(defaultProps.localeStrings);

export default Login;
