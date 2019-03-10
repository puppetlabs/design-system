import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Form } from '@puppet/react-components';

import AuthLayout from '../AuthLayout';

const propTypes = {
  product: PropTypes.string.isRequired,
  onSubmit: PropTypes.func,
  mapErrorToMessage: PropTypes.func,
  localeStrings: PropTypes.shape({
    title: PropTypes.string.isRequired,
    submitLabel: PropTypes.string.isRequired,
    emailLabel: PropTypes.string.isRequired,
    emailRequiredFieldMessage: PropTypes.string.isRequired,
    emailPlaceholder: PropTypes.string.isRequired,
    resetPasswordLink: PropTypes.string.isRequired,
  }),
};

const defaultProps = {
  onSubmit() {},
  mapErrorToMessage: () => '',
  localeStrings: {
    title: 'Sign in',
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
  }

  async onSubmit(values) {
    const { onSubmit, mapErrorToMessage } = this.props;

    try {
      this.setState({ submitting: true });

      await onSubmit(values);

      this.setState({ submitting: false });
    } catch (e) {
      this.setState({ submitting: false, error: mapErrorToMessage(e) });
    }
  }

  render() {
    const { submitting, error } = this.state;
    const { product, onSubmit, localeStrings } = this.props;

    return (
      <AuthLayout product={product} title={localeStrings.title}>
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
      </AuthLayout>
    );
  }
}

Login.propTypes = propTypes;
Login.defaultProps = defaultProps;

export default Login;
