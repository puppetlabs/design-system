import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import Alert from '../alert';
import Button from '../buttons/Button';
import {
  componentHasType,
  mapObj,
  omit,
  shallowDiff,
} from '../../helpers/statics';
import { formSize } from '../../helpers/customPropTypes';

import FormField from './FormField';
import FormSection from './FormSection';

const propTypes = {
  initialValues: PropTypes.shape({}),
  values: PropTypes.shape({}),
  submittable: PropTypes.bool,
  submitLabel: PropTypes.string,
  onSubmit: PropTypes.func,
  cancellable: PropTypes.bool,
  cancelLabel: PropTypes.string,
  onCancel: PropTypes.func,

  onChange: PropTypes.func,
  submitting: PropTypes.bool,
  size: formSize,
  inline: PropTypes.bool,
  actionsPosition: PropTypes.oneOf(['left', 'right', 'block']),
  //* Text to display as the Submit button */
  disabled: PropTypes.bool,
  /* This is a single error field for the entire form */
  error: PropTypes.string,
  children: PropTypes.node,
  className: PropTypes.string,
  style: PropTypes.shape({}),
};

const defaultProps = {
  initialValues: {},
  values: undefined,
  submittable: false,
  submitLabel: 'Submit',
  onSubmit() {},
  cancellable: false,
  cancelLabel: 'Cancel',
  onCancel() {},
  onChange() {},
  submitting: false,
  size: 'medium',
  inline: false,
  actionsPosition: 'right',
  disabled: false,
  error: '',
  children: null,
  className: '',
  style: {},
};

const isEmpty = str => !str || str.match(/^\s*$/);

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
    .filter(child => child && child.props)
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
      if (child.props.children) {
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

    if (this.isControlled()) {
      onChange(name, newValues);
    } else {
      this.setState({ values: newValues });
    }
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

    const { size, inline, disabled } = this.props;
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
      size,
      inline,
      value: values[name],
      onChange: val => this.onChange(name, val),
    };
  }

  renderSubmitButton(isValid) {
    const {
      submittable,
      submitting,
      size,
      disabled,
      submitLabel,
      actionsPosition,
    } = this.props;
    if (submittable) {
      return (
        <Button
          key="submit"
          className="rc-form-action"
          type="submit"
          processing={submitting}
          size={size}
          disabled={disabled || !isValid}
          label={submitLabel}
          block={actionsPosition === 'block'}
        />
      );
    }

    return null;
  }

  renderCancelButton() {
    const {
      cancellable,
      size,
      disabled,
      onCancel,
      cancelLabel,
      actionsPosition,
    } = this.props;
    if (cancellable) {
      return (
        <Button
          key="cancel"
          className="rc-form-action"
          secondary
          size={size}
          disabled={disabled}
          onClick={onCancel}
          label={cancelLabel}
          block={actionsPosition === 'block'}
        />
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
      >
        {children}
        {actions}
        {error}
      </form>
    );
  }
}

Form.propTypes = propTypes;
Form.defaultProps = defaultProps;

Form.Field = FormField;
Form.Section = FormSection;

export default Form;
