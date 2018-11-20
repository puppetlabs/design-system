import PropTypes from 'prop-types';
import React, { Fragment } from 'react';
import classnames from 'classnames';
import Alert from '../alert';
import Button from '../buttons/Button';
import { shallowDiff } from '../../helpers/statics';

import FormField from './FormField';
import FormFlyout from './FormFlyout';
import FormSection from './FormSection';

const propTypes = {
  className: PropTypes.string,
  disabled: PropTypes.bool,
  onChange: PropTypes.func,
  inline: PropTypes.bool,
  onCancel: PropTypes.func,
  onSubmit: PropTypes.func,
  cancellable: PropTypes.bool,
  //* Text to display as the Cancel button */
  cancelLabel: PropTypes.string,
  submittable: PropTypes.bool,
  //* Text to display as the Submit button */
  submitLabel: PropTypes.string,
  /* Allow form submission even if the user has not changed the form yet */
  allowUnchangedSubmit: PropTypes.bool,
  validator: PropTypes.func,
  /* Errors to render the form fields with. Keys are field names, and values are the field errors
   * TODO: Deprecate this prop. Field-specific errors should be passed in through the relevant FormField */
  errors: PropTypes.shape({}),
  /* This is a single error field for the entire form */
  error: PropTypes.string,
  size: PropTypes.string,
  submitting: PropTypes.bool,
  actionsPosition: PropTypes.oneOf(['left', 'right', 'block']),
  children: PropTypes.node,
};

const defaultProps = {
  errors: {},
  className: '',
  disabled: false,
  size: 'small',
  inline: false,
  onChange: null,
  onSubmit: null,
  children: null,
  validator: null,
  error: '',
  allowUnchangedSubmit: false,
  onCancel: () => {},
  cancellable: false,
  cancelLabel: 'Cancel',
  submitting: false,
  submittable: false,
  submitLabel: 'Submit',
  actionsPosition: 'right',
};

const isEmpty = str => !str || str.match(/^\s*$/);

const getValues = children => {
  let values = {};

  React.Children.forEach(children, child => {
    if (child && (child.type === FormField || child.type === FormSection)) {
      if (child.props.name) {
        values[child.props.name] = child.props.value;
      } else if (child.props.children) {
        values = Object.assign(values, getValues(child.props.children));
      }

      // TODO: Figure something else out here. This is incredibly hacky and makes me cry.
      if (child.props.flyout) {
        values = Object.assign(
          values,
          getValues(child.props.flyout.props.children),
        );
      }
    }
  });

  return values;
};

const getRequiredFields = children =>
  React.Children.toArray(children)
    .filter(({ props: { required } }) => required)
    .map(({ props: { name, requiredFieldMessage } }) => ({
      name,
      requiredFieldMessage,
    }));

/**
 * `Form` is a container component for rendering forms.
 */
class Form extends React.Component {
  constructor(props) {
    super(props);

    const { allowUnchangedSubmit } = props;

    /**
     * Noting initial form values so that we can determine when the values have changed
     */
    this.initialValues = getValues(props.children);

    // Boolean to block form submission until the user has changed something
    this.allowSubmission = allowUnchangedSubmit;

    this.state = {
      values: { ...this.initialValues },
      valid: true,
      validatorErrors: {},
    };

    this.onSubmit = this.onSubmit.bind(this);
    this.onCancel = this.onCancel.bind(this);
    this.onChange = this.onChange.bind(this);
  }

  onSubmit(e) {
    e.preventDefault();
    const { onSubmit } = this.props;
    const { values } = this.state;
    const validatorErrors = this.validate(values);
    const valid = Object.keys(validatorErrors).length === 0;

    if (onSubmit) {
      this.setState({ valid, validatorErrors }, () => {
        if (valid) {
          onSubmit(this.state);
        }
      });
    }
  }

  onCancel() {
    const { onCancel } = this.props;

    if (onCancel) {
      onCancel();
    }
  }

  onChange(name) {
    const { onChange } = this.props;
    const { valid, values } = this.state;

    /**
     * If form is unchanged from initial values, test if that is still true
     */
    if (!this.allowSubmission && shallowDiff(values, this.initialValues)) {
      this.allowSubmission = true;
    }

    return value => {
      const newState = Object.assign({}, this.state);

      newState.values[name] = value;

      // we only want to validate on change if the form has been deemed invalid and the user
      // is attempting to fix the mistakes
      if (!valid) {
        const validatorErrors = this.validate(newState.values);
        newState.validatorErrors = validatorErrors;
        newState.valid = Object.keys(validatorErrors).length === 0;
      }

      this.setState(newState, () => {
        if (onChange) {
          onChange(name, values, newState.valid);
        }
      });
    };
  }

  validate(values) {
    const { validator, children } = this.props;

    const requiredFields = getRequiredFields(children);

    const errors = {};

    if (requiredFields.length) {
      requiredFields.forEach(({ name, requiredFieldMessage }) => {
        if (isEmpty(values[name])) {
          errors[name] = requiredFieldMessage;
        }
      });
    }

    if (validator) {
      return {
        ...validator(values),
        ...errors,
      };
    }

    return errors;
  }

  renderField(child) {
    const { error, errors, size } = this.props;
    const { validatorErrors, values } = this.state;

    return React.cloneElement(child, {
      error:
        child.props.error ||
        errors[child.props.name] ||
        validatorErrors[child.props.name] ||
        !!error,
      value: values[child.props.name],
      onChange: this.onChange(child.props.name),
      size,
      key: child.props.name,
    });
  }

  renderFlyout(flyout) {
    const props = {};

    if (flyout.props.children) {
      props.children = this.renderChildren(flyout.props.children);
    }

    return React.cloneElement(flyout, props);
  }

  renderSection(child) {
    const props = {
      children: this.renderChildren(child.props.children),
    };

    // Only render the flyout fields if they have been provided.
    if (child.props.flyout) {
      props.flyout = this.renderFlyout(child.props.flyout);
    }

    return React.cloneElement(child, props);
  }

  renderChildren(children) {
    const jsx = [];

    React.Children.forEach(children, child => {
      if (child && child.type === FormField) {
        jsx.push(this.renderField(child));
      } else if (child && child.type === FormSection) {
        jsx.push(this.renderSection(child));
      } else {
        jsx.push(child);
      }
    });

    return jsx;
  }

  renderActions() {
    const {
      actionsPosition,
      cancellable,
      disabled,
      submittable,
      submitting,
      size,
      cancelLabel,
      submitLabel,
    } = this.props;
    const { valid } = this.state;
    let actions;
    let jsx;

    let submitButton;
    let cancelButton;

    if (submittable) {
      submitButton = (
        <Button
          key="submit"
          className="rc-form-action"
          type="submit"
          processing={submitting}
          size={size}
          disabled={disabled || !valid || !this.allowSubmission}
          label={submitLabel}
          block={actionsPosition === 'block'}
        />
      );
    }

    if (cancellable) {
      cancelButton = (
        <Button
          key="cancel"
          className="rc-form-action"
          secondary
          size={size}
          disabled={disabled}
          onClick={this.onCancel}
          label={cancelLabel}
          block={actionsPosition === 'block'}
        />
      );
    }

    if (actionsPosition === 'right') {
      actions = (
        <Fragment>
          {cancelButton}
          {submitButton}
        </Fragment>
      );
    } else {
      actions = (
        <Fragment>
          {submitButton}
          {cancelButton}
        </Fragment>
      );
    }

    const classNames = classnames(
      'rc-form-actions',
      `rc-form-actions-${actionsPosition}`,
    );

    if (actions) {
      jsx = <div className={classNames}>{actions}</div>;
    }

    return jsx;
  }

  renderFormError() {
    const { error } = this.props;

    if (error) {
      return (
        <Alert
          isActive
          growl={false}
          closeable={false}
          type="error"
          message={error}
          className="rc-form-error"
        />
      );
    }

    return null;
  }

  render() {
    const {
      children: childrenProp,
      className,
      disabled,
      inline,
      size,
    } = this.props;
    const children = this.renderChildren(childrenProp);
    const actions = this.renderActions();
    const error = this.renderFormError();
    const classNames = classnames('rc-form', className, {
      [`rc-form-${size}`]: size,
      'rc-form-inline': inline,
    });

    return (
      <form className={classNames} onSubmit={this.onSubmit}>
        <fieldset className="rc-form-fields" disabled={disabled}>
          {children}
        </fieldset>
        {error}
        {actions}
      </form>
    );
  }
}

Form.propTypes = propTypes;
Form.defaultProps = defaultProps;

Form.Field = FormField;
Form.Flyout = FormFlyout;
Form.Section = FormSection;

export default Form;
