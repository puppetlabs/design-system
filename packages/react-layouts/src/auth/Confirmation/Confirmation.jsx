import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Form } from '@puppet/react-components';
import AuthLayout from '../AuthLayout';

const propTypes = {
  /** Product logo. One of the official set or a custom string */
  product: PropTypes.string,
  /** Account confirmation token (may be taken from a url) */
  token: PropTypes.string,
  /** Async callback to validate the provided token. If valid the method should return the initial form values. If invalid it should throw an error */
  validateToken: PropTypes.func,
  /** Callback executed with a submit fetch error when present. Should map the error object to a localized string message */
  mapTokenErrorToMessage: PropTypes.func,
  /** Form submit handler. Handled asynchronously, passed the field values */
  onSubmit: PropTypes.func,
  /** Callback executed with a submit fetch error when present. Should map the error object to a localized string message */
  mapErrorToMessage: PropTypes.func,
  /** If true, company selection will be disabled (the assumption is that the user is on a company account where this is fixed) */
  disableCompanySelection: PropTypes.bool,
  /** Element override for the reset password link, to allow use of ReactRouter */
  renderResetPasswordAs: PropTypes.elementType,
  /** Additional props passed to the reset password link */
  resetPasswordProps: PropTypes.shape({}),
  /** Full set of necessary localized strings. Defaults are provided for ease of setup but **translated strings should be used in production** */
  localeStrings: PropTypes.shape({
    title: PropTypes.string.isRequired,
    subtitle: PropTypes.string.isRequired,
    submitLabel: PropTypes.string.isRequired,
    nameLabel: PropTypes.string.isRequired,
    nameRequiredFieldMessage: PropTypes.string.isRequired,
    namePlaceholder: PropTypes.string.isRequired,
    companyLabel: PropTypes.string.isRequired,
    companyRequiredFieldMessage: PropTypes.string.isRequired,
    companyPlaceholder: PropTypes.string.isRequired,
    emailLabel: PropTypes.string.isRequired,
    emailRequiredFieldMessage: PropTypes.string.isRequired,
    emailPlaceholder: PropTypes.string.isRequired,
    passwordALabel: PropTypes.string.isRequired,
    passwordARequiredFieldMessage: PropTypes.string.isRequired,
    passwordAPlaceholder: PropTypes.string.isRequired,
    passwordBLabel: PropTypes.string.isRequired,
    passwordBRequiredFieldMessage: PropTypes.string.isRequired,
    passwordBPlaceholder: PropTypes.string.isRequired,
    mismatchedNewPasswords: PropTypes.string.isRequired,
  }),
};

const defaultProps = {
  product: 'Product',
  token: '',
  validateToken: () => ({}),
  mapTokenErrorToMessage: () => '',
  onSubmit() {},
  mapErrorToMessage: () => '',
  disableCompanySelection: false,
  renderResetPasswordAs: 'a',
  resetPasswordProps: {},
  localeStrings: {
    title: 'Welcome to Product',
    subtitle:
      "To get started you'll need to confirm a few things and create a password",
    submitLabel: 'Get started',
    nameLabel: 'Name',
    nameRequiredFieldMessage: 'You must provide a name',
    namePlaceholder: 'Name',
    companyLabel: 'Company',
    companyRequiredFieldMessage: 'You must provide a company',
    companyPlaceholder: 'Company',
    emailLabel: 'Email',
    emailRequiredFieldMessage: 'You must provide an email',
    emailPlaceholder: 'Email',
    passwordALabel: 'Password',
    passwordARequiredFieldMessage: 'You must provide a password',
    passwordAPlaceholder: 'Create a password',
    passwordBLabel: 'Confirm password',
    passwordBRequiredFieldMessage: 'Please confirm your password',
    passwordBPlaceholder: 'Confirm password',
    mismatchedNewPasswords: "Your passwords don't match",
  },
};

class Confirmation extends Component {
  constructor(props) {
    super(props);

    this.state = {
      initialValues: {},
      submitting: false,
      error: '',
      validatingToken: false,
      tokenValidationError: '',
    };

    this.onSubmit = this.onSubmit.bind(this);
  }

  async componentDidMount() {
    const { token, validateToken, mapTokenErrorToMessage } = this.props;

    try {
      this.setState({ validatingToken: true });

      const initialValues = await validateToken(token);

      this.setState({
        validatingToken: false,
        tokenValidationError: '',
        initialValues,
      });
    } catch (e) {
      this.setState({
        validatingToken: false,
        tokenValidationError: mapTokenErrorToMessage(e),
      });
    }
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
    const {
      initialValues,
      validatingToken,
      submitting,
      error,
      tokenValidationError,
    } = this.state;
    const {
      product,
      renderResetPasswordAs,
      resetPasswordProps,
      localeStrings,
      validateToken,
      mapTokenErrorToMessage,
      onSubmit,
      mapErrorToMessage,
      disableCompanySelection,
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
      <AuthLayout
        product={product}
        title={localeStrings.title}
        subtitle={localeStrings.subtitle}
        {...rest}
      >
        <Form
          submittable
          actionsPosition="block"
          initialValues={initialValues}
          submitLabel={localeStrings.submitLabel}
          submitting={validatingToken || submitting}
          error={tokenValidationError || error}
          onSubmit={this.onSubmit}
          disabled={validatingToken || !!tokenValidationError}
        >
          <Form.Field
            type="text"
            name="name"
            label={localeStrings.nameLabel}
            required
            requiredFieldMessage={localeStrings.nameRequiredFieldMessage}
            placeholder={localeStrings.namePlaceholder}
          />
          <Form.Field
            type="email"
            name="email"
            autoComplete="username email"
            label={localeStrings.emailLabel}
            required
            requiredFieldMessage={localeStrings.emailRequiredFieldMessage}
            placeholder={localeStrings.emailPlaceholder}
            readOnly
            disabled
          />
          <Form.Field
            type="text"
            name="company"
            label={localeStrings.companyLabel}
            required
            requiredFieldMessage={localeStrings.companyRequiredFieldMessage}
            placeholder={localeStrings.companyPlaceholder}
            readOnly={disableCompanySelection && !!initialValues.company}
            disabled={disableCompanySelection && !!initialValues.company}
          />
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
      </AuthLayout>
    );
  }
}

Confirmation.propTypes = propTypes;
Confirmation.defaultProps = defaultProps;
Confirmation.requiredStrings = Object.keys(defaultProps.localeStrings);

export default Confirmation;
