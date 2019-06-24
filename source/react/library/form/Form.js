import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import Alert from '../alert';
import Button from '../button';
import {
  componentHasType,
  mapObj,
  omit,
  shallowDiff,
} from '../../helpers/statics';
import FormField from './FormField';
import FormSection from './FormSection';

const propTypes = {
  /** Initial form field values. Should be an object with keys corresponding to the contained form field name */
  initialValues: PropTypes.shape({}),
  /** Current form field values when used in *controlled* mode. **should not be used concurrently with initialValues** */
  values: PropTypes.shape({}),
  /** onChange event handler for the whole form. Will be passed in order: the name of the field that changed, and the full set of new form values */
  onChange: PropTypes.func,
  /** Is the form currently submitting? The submit button will render a loading indicator if true */
  submitting: PropTypes.bool,
  /** Is the form submittable? If true a submit button will render */
  submittable: PropTypes.bool,
  /** Optional override for the submit button label */
  submitLabel: PropTypes.string,
  /** Optional override for the submit button type */
  submitType: PropTypes.oneOf(['primary', 'secondary', 'danger']),
  /** Submit event handler. Will be passed the most recent form values */
  onSubmit: PropTypes.func,
  /** Is the form cancellable? If true a cancel button will render */
  cancellable: PropTypes.bool,
  /** Optional override for the cancel button label */
  cancelLabel: PropTypes.string,
  /** Cancel event handler */
  onCancel: PropTypes.func,
  /** Boolean to render form fields inline. The value passed in here will be propagated down to all contained form fields */
  inline: PropTypes.bool,
  /** Positioning of the action buttons  */
  actionsPosition: PropTypes.oneOf(['left', 'right', 'block']),
  /** Is the form disabled? Will disable all fields and actions */
  disabled: PropTypes.bool,
  /** A single error message, to be rendered in a banner, above the entire form */
  error: PropTypes.string,
  /** All relevant form fields and form sections must be passed in as children */
  children: PropTypes.node,
  /** Optional additional className */
  className: PropTypes.string,
  /** Optional additional inline style */
  style: PropTypes.shape({}),
};

const defaultProps = {
  initialValues: {},
  values: undefined,
  submittable: false,
  submitLabel: 'Submit',
  submitType: 'primary',
  onSubmit() {},
  cancellable: false,
  cancelLabel: 'Cancel',
  onCancel() {},
  onChange() {},
  submitting: false,
  inline: false,
  actionsPosition: 'left',
  disabled: false,
  error: '',
  children: null,
  className: '',
  style: {},
};

export const isEmpty = value => {
  if (typeof value === 'string') {
    return !value || !!value.match(/^\s*$/);
  }

  if (typeof value === 'number') {
    return value !== 0 && !value;
  }

  if (Array.isArray(value)) {
    return value.length === 0;
  }

  if (typeof value === 'object') {
    return !value || Object.keys(value).length === 0;
  }

  return !value;
};

/**
 * Collects the user provided props for all FormFields into
 * an object, with props indexed by name
 */
const collectFieldProps = children => {
  const fields = {};

  React.Children.toArray(children)
    .filter(child => child && child.props)
    .forEach(child => {
      if (child.props.children) {
        Object.assign(fields, collectFieldProps(child.props.children));
      }

      if (componentHasType(child, FormField)) {
        fields[child.props.name] = child.props;
      }
    });

  return fields;
};

const isFormValid = fieldProps =>
  !Object.values(fieldProps).some(props => props.error);

const renderField = (child, updatedFieldProps) =>
  React.createElement(child.type, {
    key: updatedFieldProps.name,
    ...updatedFieldProps,
  });

const renderChildren = (children, updatedFieldPropMap) =>
  React.Children.toArray(children)
    .filter(child => child)
    .map(child => {
      /**
       * If the child is a field, do special field rendering
       */
      if (componentHasType(child, FormField)) {
        return renderField(child, updatedFieldPropMap[child.props.name]);
      }

      /**
       * If the child has children, recurse. This will cover Form.Section and any wrapper divs
       */
      if (child.props && child.props.children) {
        return React.cloneElement(child, {
          children: renderChildren(child.props.children, updatedFieldPropMap),
        });
      }

      return child;
    });

class Form extends Component {
  constructor(props) {
    super(props);

    this.state = {};

    this.updateFieldProps = this.updateFieldProps.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  static getDerivedStateFromProps(props, state) {
    if (
      !state.initialValues ||
      shallowDiff(state.initialValues, props.initialValues)
    ) {
      return {
        validate: false,
        initialValues: props.initialValues,
        values: props.initialValues,
      };
    }

    return null;
  }

  onChange(name, value) {
    const { onChange } = this.props;
    const values = this.getValues();

    const newValues = {
      ...values,
      [name]: value,
    };

    if (!this.isControlled()) {
      this.setState({ values: newValues });
    }

    onChange(name, newValues);
  }

  async onSubmit(e) {
    e.preventDefault();
    const { children: userProvidedChildren } = this.props;
    const { onSubmit } = this.props;

    /**
     * Await state update, so that validate: true setting doesn't get overridden by
     * getDerivedStateFromProps
     */
    await new Promise(resolve => this.setState({ validate: true }, resolve));

    /**
     * Collect child props to run validation again, this time with custom
     * validators always on
     */
    const fieldProps = mapObj(collectFieldProps(userProvidedChildren), props =>
      this.updateFieldProps(props, true),
    );

    const isValid = isFormValid(fieldProps);

    if (isValid) {
      const values = this.getValues();
      onSubmit(values);
    }
  }

  getValues() {
    const { values: stateValues } = this.state;
    const { values: propValues } = this.props;

    return propValues || stateValues;
  }

  isControlled() {
    const { values } = this.props;

    return !!values;
  }

  /**
   * Meant to be called from the outside through a ref, if the user ever needs
   * to reset validation on a controlled component
   */
  reset() {
    this.setState({
      validate: false,
    });
  }

  /**
   * Updates user provdided props to child Form.Field components with validation
   * and other context from the parent Form component
   */
  updateFieldProps(userProvidedFieldProps, validate) {
    const {
      name,
      error: userProvidedError,
      required,
      requiredFieldMessage,
      validator,
    } = userProvidedFieldProps;

    const { inline, disabled } = this.props;
    const values = this.getValues();
    const value = values[name];

    let error = userProvidedError;

    if (validate && !error) {
      if (required && isEmpty(value)) {
        error = requiredFieldMessage;
      } else if (validator) {
        error = validator(value, values);
      }
    }

    /**
     * These fields are removed because they are only used by the parent
     * Form element to set the final error value (above), not by the consuming
     * Form.Field
     */
    const fieldProps = omit(
      ['requiredFieldMessage', 'validator'],
      userProvidedFieldProps,
    );

    return {
      ...fieldProps,
      error,
      disabled: disabled || userProvidedFieldProps.disabled,
      inline,
      value: values[name],
      onChange: val => this.onChange(name, val),
    };
  }

  renderSubmitButton(isValid) {
    const {
      submittable,
      submitting,
      disabled,
      submitLabel,
      submitType,
    } = this.props;
    if (submittable) {
      return (
        <Button
          key="submit"
          className="rc-form-action"
          buttonType="submit"
          loading={submitting}
          disabled={disabled || !isValid}
          type={submitType}
        >
          {submitLabel}
        </Button>
      );
    }

    return null;
  }

  renderCancelButton() {
    const { cancellable, disabled, onCancel, cancelLabel } = this.props;
    if (cancellable) {
      return (
        <Button
          key="cancel"
          className="rc-form-action"
          type="tertiary"
          disabled={disabled}
          onClick={onCancel}
        >
          {cancelLabel}
        </Button>
      );
    }

    return null;
  }

  renderActions(isValid) {
    const { cancellable, submittable, actionsPosition } = this.props;

    if (!(submittable || cancellable)) {
      return null;
    }

    const submitButton = this.renderSubmitButton(isValid);
    const cancelButton = this.renderCancelButton();

    const className = classNames(
      'rc-form-actions',
      `rc-form-actions-${actionsPosition}`,
    );

    if (actionsPosition === 'right') {
      return (
        <div className={className}>
          {cancelButton}
          {submitButton}
        </div>
      );
    }

    return (
      <div className={className}>
        {submitButton}
        {cancelButton}
      </div>
    );
  }

  renderFormError() {
    const { error } = this.props;

    if (error) {
      return (
        <Alert type="danger" className="rc-form-error">
          {error}
        </Alert>
      );
    }

    return null;
  }

  render() {
    const { onSubmit } = this;
    const { validate } = this.state;
    const {
      onCancel,
      children: userProvidedChildren,
      className,
      style,
    } = this.props;

    /**
     * Map of field name to updated props
     */
    const updatedFieldPropMap = mapObj(
      collectFieldProps(userProvidedChildren),
      props => this.updateFieldProps(props, validate),
    );

    const isValid = isFormValid(updatedFieldPropMap);

    const children = renderChildren(userProvidedChildren, updatedFieldPropMap);
    const actions = this.renderActions(isValid);
    const error = this.renderFormError();

    return (
      <form
        className={classNames('rc-form', className)}
        style={style}
        onSubmit={onSubmit}
        onCancel={onCancel}
        noValidate
      >
        {children}
        {error}
        {actions}
      </form>
    );
  }
}

Form.propTypes = propTypes;
Form.defaultProps = defaultProps;

Form.Field = FormField;
Form.Section = FormSection;

export default Form;
