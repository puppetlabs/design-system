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
  /** Element override for the back to login link, to allow use of ReactRouter */
  renderBackToLoginAs: renderableElement,
  /** Additional props passed to the reset password link */
  backToLoginProps: PropTypes.shape({}),
  /** Full set of necessary localized strings. Defaults are provided for ease of setup but **translated strings should be used in production** */
  localeStrings: PropTypes.shape({
    title: PropTypes.string.isRequired,
    submitLabel: PropTypes.string.isRequired,
    emailLabel: PropTypes.string.isRequired,
    emailRequiredFieldMessage: PropTypes.string.isRequired,
    emailPlaceholder: PropTypes.string.isRequired,
    backToLoginLink: PropTypes.string.isRequired,
  }),
};

const defaultProps = {
  product: 'Product',
  onSubmit() {},
  mapErrorToMessage: () => '',
  renderBackToLoginAs: 'a',
  backToLoginProps: {},
  localeStrings: {
    title: 'We can send you a reset link',
    submitLabel: 'Send reset link',
    emailLabel: 'Email',
    emailRequiredFieldMessage: 'You must provide an email address',
    emailPlaceholder: 'Email address',
    backToLoginLink: 'Return to sign in',
  },
};

class ForgotPassword extends Component {
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
      renderBackToLoginAs,
      backToLoginProps,
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
        </Form>
        <AuthLayout.Action as={renderBackToLoginAs} {...backToLoginProps}>
          {localeStrings.backToLoginLink}
        </AuthLayout.Action>
      </AuthLayout>
    );
  }
}

ForgotPassword.propTypes = propTypes;
ForgotPassword.defaultProps = defaultProps;
ForgotPassword.requiredStrings = Object.keys(defaultProps.localeStrings);

export default ForgotPassword;
