import React, { useState } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import ErrorAlert from '../error-alert';
import { mapObj, shallowDiff } from '../../helpers/statics';
import * as types from '../../helpers/customPropTypes';
import FormField from './FormField';
import FormSection from './FormSection';
import FormActions from './internal/FormActions';
import {
  usePrevious,
  contextualizeOnChange,
  contextualizeOnSubmit,
  collectFieldProps,
  updateFieldProps,
  renderChildren,
  isFormValid,
  getFieldPaths,
  flatten,
} from './internal/methods';

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
  onSubmit: PropTypes.func, // eslint-disable-line
  /** Is the form cancellable? If true a cancel button will render */
  cancellable: PropTypes.bool,
  /** Optional override for the cancel button label */
  cancelLabel: PropTypes.string,
  /** Cancel event handler */
  onCancel: PropTypes.func,
  /** The styling of the identifier for all fields */
  labelType: PropTypes.oneOf(['primary', 'secondary']), // eslint-disable-line
  /** Boolean to render form fields inline. The value passed in here will be propagated down to all contained form fields */
  inline: PropTypes.bool, // eslint-disable-line
  /** Width of all inline labels */
  inlineLabelWidth: PropTypes.number, // eslint-disable-line
  /** Positioning of the action buttons  */
  actionsPosition: PropTypes.oneOf(['left', 'right', 'block']),
  /** Is the form disabled? Will disable all fields and actions */
  disabled: PropTypes.bool,
  /** An error as a string, Error instance, or custom extended type including item errors */
  error: types.error,
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
  labelType: 'primary',
  inline: false,
  inlineLabelWidth: null,
  actionsPosition: 'left',
  disabled: false,
  error: '',
  children: null,
  className: '',
  style: {},
};

const Form = props => {
  const {
    initialValues: initialValuesProp,
    values: valuesProp,
    onChange: onChangeProp,
    submitting,
    submittable,
    submitLabel,
    submitType,
    cancellable,
    cancelLabel,
    onCancel,
    actionsPosition,
    disabled,
    error,
    children: userProvidedChildren,
    className,
    style,
  } = props;
  const fieldProps = collectFieldProps(userProvidedChildren);
  const fieldPaths = getFieldPaths(fieldProps);

  const initialValues = flatten(initialValuesProp, fieldPaths);

  const [validate, setValidate] = useState(false);
  const [valuesState, setValues] = useState(initialValues);

  const previousInitialValues = usePrevious(initialValues);
  const isControlled = !!valuesProp;
  const values = isControlled ? flatten(valuesProp, fieldPaths) : valuesState;

  if (validate && shallowDiff(initialValues, previousInitialValues)) {
    setValidate(false);
  }

  const onChange = contextualizeOnChange(
    values,
    fieldPaths,
    valuesProp || initialValuesProp,
    setValues,
    isControlled,
    onChangeProp,
  );

  const onSubmit = contextualizeOnSubmit(
    props,
    fieldPaths,
    setValidate,
    values,
    onChange,
  );

  /**
   * Map of field name to updated props
   */
  const updatedFieldPropMap = mapObj(fieldProps, userProvidedFieldProps =>
    updateFieldProps(
      userProvidedFieldProps,
      validate,
      props,
      values,
      error,
      fieldPaths,
      onChange,
    ),
  );

  const isValid = isFormValid(updatedFieldPropMap);

  const children = renderChildren(userProvidedChildren, updatedFieldPropMap);

  return (
    <form
      className={classNames('rc-form', className)}
      style={style}
      onSubmit={onSubmit}
      onCancel={onCancel}
      noValidate
    >
      {children}
      {error && <ErrorAlert error={error} className="rc-form-error" />}
      <FormActions
        submitting={submitting}
        submittable={submittable}
        submitLabel={submitLabel}
        submitType={submitType}
        cancellable={cancellable}
        cancelLabel={cancelLabel}
        onCancel={onCancel}
        actionsPosition={actionsPosition}
        disabled={disabled}
        isValid={isValid}
      />
    </form>
  );
};

Form.propTypes = propTypes;
Form.defaultProps = defaultProps;

Form.Field = FormField;
Form.Section = FormSection;

export default Form;
