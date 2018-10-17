import PropTypes from 'prop-types';
import React from 'react';
import classnames from 'classnames';
import Button from '../buttons/Button';
import ButtonGroup from '../buttons/ButtonGroup';
import { shallowDiff } from '../../helpers/statics';

import FormField from './FormField';
import FormFlyout from './FormFlyout';
import FormSection from './FormSection';

const propTypes = {
  className: PropTypes.string,
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
  validator: PropTypes.func,
  //* Errors to render the form with. Keys are field names, and values are the form errors */
  errors: PropTypes.shape({}),
  size: PropTypes.string,
  submitting: PropTypes.bool,
  actionsPosition: PropTypes.oneOf(['left', 'right']),
  children: PropTypes.node,
};

const defaultProps = {
  errors: {},
  className: '',
  size: 'small',
  inline: false,
  onChange: null,
  onSubmit: null,
  children: null,
  validator: null,
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
    if (child) {
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

    /**
     * Noting initial form values so that we can determine when the values have changed
     */
    this.initialValues = getValues(props.children);
    this.changed = false;

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
    if (!this.changed && shallowDiff(values, this.initialValues)) {
      this.changed = true;
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
    const { errors, size } = this.props;
    const { validatorErrors, values } = this.state;

    return React.cloneElement(child, {
      error:
        child.props.error ||
        validatorErrors[child.props.name] ||
        errors[child.props.name],
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
      }
    });

    return jsx;
  }

  renderActions() {
    const {
      actionsPosition,
      cancellable,
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
          type="submit"
          processing={submitting}
          size={size}
          disabled={!valid || !this.changed}
          label={submitLabel}
        />
      );
    }

    if (cancellable) {
      cancelButton = (
        <Button
          key="cancel"
          secondary
          size={size}
          onClick={this.onCancel}
          label={cancelLabel}
        />
      );
    }

    if (actionsPosition === 'left') {
      actions = [submitButton, cancelButton];
    } else {
      actions = [cancelButton, submitButton];
    }

    const classNames = classnames('rc-form-actions', {
      'rc-form-actions-left': actionsPosition === 'left',
    });

    if (actions.length) {
      jsx = (
        <div className={classNames}>
          <ButtonGroup>{actions}</ButtonGroup>
        </div>
      );
    }

    return jsx;
  }

  render() {
    const { children: childrenProp, className, size, inline } = this.props;
    const children = this.renderChildren(childrenProp);
    const actions = this.renderActions();
    const classNames = classnames('rc-form', className, {
      [`rc-form-${size}`]: size,
      'rc-form-inline': inline,
    });

    return (
      <form className={classNames} onSubmit={this.onSubmit}>
        <fieldset className="rc-form-fields">{children}</fieldset>
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
