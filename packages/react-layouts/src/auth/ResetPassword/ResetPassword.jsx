import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Form } from '@puppet/react-components';
import AuthLayout from '../AuthLayout';

const propTypes = {
  /** Product logo. One of the official set or a custom string */
  product: PropTypes.string,
  /** Account confirmation token (may be taken from a url) */
  token: PropTypes.string,
  /** Form submit handler. Handled asynchronously, passed the field values { email, password } */
  onSubmit: PropTypes.func,
  /** Callback executed with a submit fetch error when present. Should map the error object to a localized string message */
  mapErrorToMessage: PropTypes.func,
  /** Element override for the back to login link, to allow use of ReactRouter */
  renderBackToLoginAs: PropTypes.elementType,
  /** Additional props passed to the reset password link */
  backToLoginProps: PropTypes.shape({}),
  /** Full set of necessary localized strings. Defaults are provided for ease of setup but **translated strings should be used in production** */
  localeStrings: PropTypes.shape({
    title: PropTypes.string.isRequired,
    submitLabel: PropTypes.string.isRequired,
    passwordALabel: PropTypes.string.isRequired,
    passwordARequiredFieldMessage: PropTypes.string.isRequired,
    passwordAPlaceholder: PropTypes.string.isRequired,
    passwordBLabel: PropTypes.string.isRequired,
    passwordBRequiredFieldMessage: PropTypes.string.isRequired,
    passwordBPlaceholder: PropTypes.string.isRequired,
    mismatchedNewPasswords: PropTypes.string.isRequired,
    backToLoginLink: PropTypes.string.isRequired,
  }),
};

const defaultProps = {
  product: 'Product',
  token: '',
  onSubmit() {},
  mapErrorToMessage: () => '',
  renderBackToLoginAs: 'a',
  backToLoginProps: {},
  localeStrings: {
    title: 'Create a new password',
    submitLabel: 'Set password',
    passwordALabel: 'Password',
    passwordARequiredFieldMessage: 'You must provide a password',
    passwordAPlaceholder: 'Create a password',
    passwordBLabel: 'Confirm password',
    passwordBRequiredFieldMessage: 'Please confirm your password',
    passwordBPlaceholder: 'Confirm password',
    mismatchedNewPasswords: "Your passwords don't match",
    backToLoginLink: 'Return to sign in',
  },
};

class ResetPassword extends Component {
  constructor(props) {
    super(props);

    this.state = {
      submitting: false,
      error: '',
    };

    this.onSubmit = this.onSubmit.bind(this);
  }

  async onSubmit(values) {
    const { token, onSubmit, mapErrorToMessage } = this.props;

    try {
      this.setState({ submitting: true });

      await onSubmit(token, values);

      this.setState({ submitting: false, error: '' });
    } catch (e) {
      this.setState({ submitting: false, error: mapErrorToMessage(e) });
    }
  }

  render() {
    const { submitting, error } = this.state;
    const {
      product,
      renderBackToLoginAs,
      backToLoginProps,
      localeStrings,
      onSubmit,
      mapErrorToMessage,
      ...rest
    } = this.props;

    const validatePasswordA = (passwordA, { passwordB }) => {
      if (passwordA !== passwordB) {
        return localeStrings.mismatchedNewPasswords;
      }

      return '';
    };

    const validatePasswordB = (passwordB, { passwordA }) => {
      if (passwordA !== passwordB) {
        return localeStrings.mismatchedNewPasswords;
      }

      return '';
    };

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
            type="password"
            name="passwordA"
            label={localeStrings.passwordALabel}
            autoComplete="new-password"
            required
            requiredFieldMessage={localeStrings.passwordARequiredFieldMessage}
            placeholder={localeStrings.passwordAPlaceholder}
            validator={validatePasswordA}
          />
          <Form.Field
            type="password"
            name="passwordB"
            label={localeStrings.passwordBLabel}
            autoComplete="new-password"
            required
            requiredFieldMessage={localeStrings.passwordBLabel}
            placeholder={localeStrings.passwordBPlaceholder}
            validator={validatePasswordB}
          />
        </Form>
        <AuthLayout.Action as={renderBackToLoginAs} {...backToLoginProps}>
          {localeStrings.backToLoginLink}
        </AuthLayout.Action>
      </AuthLayout>
    );
  }
}

ResetPassword.propTypes = propTypes;
ResetPassword.defaultProps = defaultProps;
ResetPassword.requiredStrings = Object.keys(defaultProps.localeStrings);

export default ResetPassword;
