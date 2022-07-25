import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import Button from '../../button';

const propTypes = {
  initialValues: PropTypes.shape({}),
  values: PropTypes.shape({}),
  submitting: PropTypes.bool,
  submittable: PropTypes.bool,
  submitDisabled: PropTypes.bool,
  submitLabel: PropTypes.string,
  submitType: PropTypes.oneOf(['primary', 'secondary', 'danger']),
  cancellable: PropTypes.bool,
  cancelLabel: PropTypes.string,
  cancelType: PropTypes.oneOf(['secondary', 'tertiary', 'transparent', 'text']),
  onCancel: PropTypes.func,
  actionsPosition: PropTypes.oneOf(['left', 'right', 'block']),
  disabled: PropTypes.bool,
  isValid: PropTypes.bool,
};

const defaultProps = {
  initialValues: {},
  values: undefined,
  submittable: false,
  submitDisabled: false,
  submitLabel: 'Submit',
  submitType: 'primary',
  cancellable: false,
  cancelLabel: 'Cancel',
  cancelType: 'tertiary',
  onCancel() {},
  submitting: false,
  actionsPosition: 'left',
  disabled: false,
  isValid: true,
};

const FormActions = ({
  submitting,
  submittable,
  submitDisabled,
  submitLabel,
  submitType,
  cancellable,
  cancelLabel,
  cancelType,
  onCancel,
  actionsPosition,
  disabled,
  isValid,
}) => {
  if (!(submittable || cancellable)) {
    return null;
  }

  const submitButton = submittable && (
    <Button
      key="submit"
      className="rc-form-action"
      buttonType="submit"
      loading={submitting}
      disabled={disabled || !isValid || submitDisabled}
      type={submitType}
    >
      {submitLabel}
    </Button>
  );

  const cancelButton = cancellable && (
    <Button
      key="cancel"
      className="rc-form-action"
      type={cancelType}
      onClick={onCancel}
    >
      {cancelLabel}
    </Button>
  );

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
};

FormActions.propTypes = propTypes;
FormActions.defaultProps = defaultProps;

export default FormActions;
