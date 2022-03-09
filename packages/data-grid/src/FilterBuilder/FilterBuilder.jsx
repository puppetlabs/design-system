import React, { Component } from 'react';
import { Button, Form, Card, Icon } from '@puppet/react-components';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import './FilterBuilder.scss';

const propTypes = {
  id: PropTypes.string.isRequired,
  /** An Array of field objects */
  fieldOptions: PropTypes.arrayOf(
    PropTypes.shape({
      /** Unique action id */
      id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
      /** Action text */
      label: PropTypes.node.isRequired,
      /** Optional icon rendered to the left of action text */
      icon: PropTypes.oneOf(Icon.AVAILABLE_ICONS),
      /** Optional custom icon rendered to the left of action text */
      svg: PropTypes.element,
      /** Action click handler. Not needed if the action is a link */
      onClick: PropTypes.func,
      /** Custom action element. Useful for creating navigation actions with as: 'a' or as: Link. Additionally, extra props not listed here are passed through to the action element. This allows custom props such as `href` or `to` to be passed to the inner action element. */
      as: PropTypes.elementType,
    }),
  ),
  /** Optional new label added above top field */
  fieldLabel: PropTypes.string,
  /** Optional new placeholder added above top field */
  fieldPlaceholder: PropTypes.string,
  /** Optional new error text added to the top field */
  fieldErrorText: PropTypes.string,
  /** An Array of operator objects */
  operatorOptions: PropTypes.arrayOf(
    PropTypes.shape({
      /** Unique action id */
      id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
      /** Action text */
      label: PropTypes.node.isRequired,
      /** Optional icon rendered to the left of action text */
      icon: PropTypes.oneOf(Icon.AVAILABLE_ICONS),
      /** Optional custom icon rendered to the left of action text */
      svg: PropTypes.element,
      /** Action click handler. Not needed if the action is a link */
      onClick: PropTypes.func,
      /** Custom action element. Useful for creating navigation actions with as: 'a' or as: Link. Additionally, extra props not listed here are passed through to the action element. This allows custom props such as `href` or `to` to be passed to the inner action element. */
      as: PropTypes.elementType,
    }),
  ),
  /** Optional new label added above middle field */
  operatorLabel: PropTypes.string,
  /** Optional new placeholder added above middle field */
  operatorPlaceholder: PropTypes.string,
  /** Optional new error text added to the bottom field */
  operatorErrorText: PropTypes.string,
  /** Optional new label added above bottom field */
  valueLabel: PropTypes.string,
  /** Optional new placeholder added above bottom field */
  valuePlaceholder: PropTypes.string,
  /** Optional new error text added to the bottom field */
  valueErrorText: PropTypes.string,
  /** Optional label for main button */
  buttonLabel: PropTypes.string,
  /** Optional label for form submit button */
  submitLabel: PropTypes.string,
  /** Optional label for form cancel button */
  cancelLabel: PropTypes.string,
  /** Required func for called on form submission */
  onSubmit: PropTypes.func.isRequired,
  /** Main visual variant */
  type: PropTypes.oneOf([
    'primary',
    'secondary',
    'tertiary',
    'danger',
    'transparent',
    'text',
  ]),
  /** If true, a focused button will use an inner instead of outer outline */
  innerFocus: PropTypes.bool,
  /** Additional property used for connotative variants (such as danger) to choose between a strong and soft version */
  weight: PropTypes.oneOf(['bold', 'subtle']),
  /** Optional icon to be rendered instead of / in addition to button text. If both an icon and text are present, the icon will be rendered before the text */
  icon: PropTypes.oneOf(Icon.AVAILABLE_ICONS),
  /** Is the button disabled?  */
  disabled: PropTypes.bool,
  /** If true, button will render with a loading spinner */
  loading: PropTypes.bool,
  /** Optional additional className passed to the outer element */
  className: PropTypes.string,
  /** Optional inline width passed to the button element */
  width: PropTypes.string,
  /** Optional inline style passed to the outer element */
  style: PropTypes.shape({}),
};

const defaultProps = {
  fieldOptions: [],
  operatorOptions: [],
  buttonLabel: 'Create filter',
  submitLabel: 'Apply',
  cancelLabel: 'Cancel',
  fieldLabel: 'FIELD',
  fieldPlaceholder: 'Select a field',
  fieldErrorText: 'Please complete this field',
  operatorLabel: 'OPERATOR',
  operatorPlaceholder: 'Select an operator',
  operatorErrorText: 'Please complete this field',
  valueLabel: 'VALUE',
  valuePlaceholder: 'Enter a string or number',
  valueErrorText: 'Please complete this field',
  type: 'secondary',
  innerFocus: false,
  weight: 'bold',
  icon: null,
  loading: false,
  disabled: false,
  className: '',
  width: null,
  style: {},
};

class FilterBuilder extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      values: { field: '', operator: '', value: '' },
      fieldError: false,
      operatorError: false,
      valueError: false,
    };

    this.open = this.open.bind(this);
    this.close = this.close.bind(this);
    this.onClickButton = this.onClickButton.bind(this);
    this.onApply = this.onApply.bind(this);
    this.onChange = this.onChange.bind(this);
    this.validateFields = this.validateFields.bind(this);
  }

  onClickButton(e) {
    e.stopPropagation();
    const { open } = this.state;

    if (open) {
      this.close();
    } else {
      this.open();
    }
  }

  onChange(_, newObj) {
    this.setState({ values: newObj });
  }

  onApply(value) {
    const { onSubmit } = this.props;
    const hasError = this.validateFields(value);
    if (!hasError) {
      onSubmit(value);
      this.setState({
        values: { field: '', operator: '', value: '' },
        fieldError: false,
        operatorError: false,
        valueError: false,
      });
      this.close();
    }
  }

  validateFields(valuesObj) {
    let hasError = false;
    const { field, operator, value } = valuesObj;
    if (field === '') {
      this.setState({ fieldError: true });
      hasError = true;
    } else {
      this.setState({ fieldError: false });
    }
    if (operator === '') {
      this.setState({ operatorError: true });
      hasError = true;
    } else {
      this.setState({ operatorError: false });
    }
    if (value === '') {
      this.setState({ valueError: true });
      hasError = true;
    } else {
      this.setState({ valueError: false });
    }
    return hasError;
  }

  open() {
    this.setState({ open: true }, this.focusMenu);
  }

  close() {
    this.setState({ open: false });
    this.setState({
      values: { field: '', operator: '', value: '' },
      fieldError: false,
      operatorError: false,
      valueError: false,
    });
  }

  render() {
    const { open, values, fieldError, operatorError, valueError } = this.state;
    const {
      id,
      buttonLabel,
      submitLabel,
      cancelLabel,
      fieldLabel,
      fieldPlaceholder,
      fieldErrorText,
      operatorLabel,
      operatorPlaceholder,
      operatorErrorText,
      valueLabel,
      valuePlaceholder,
      valueErrorText,
      type,
      innerFocus,
      icon,
      disabled,
      loading,
      weight,
      className,
      width,
      style,
      fieldOptions,
      operatorOptions,
    } = this.props;

    return (
      <div>
        <Button
          type={type}
          innerFocus={innerFocus}
          weight={weight}
          icon={icon}
          trailingIcon={icon ? null : 'chevron-down'}
          style={(width ? { width, textAlign: 'left' } : null, style)}
          disabled={disabled}
          loading={loading}
          aria-haspopup="true"
          aria-controls={`${id}-menu`}
          aria-expanded={open}
          onClick={this.onClickButton}
          ref={button => {
            this.button = button;
          }}
        >
          {buttonLabel}
        </Button>
        <Card
          className={classNames(
            'dg-filter-template-container',
            {
              'dg-filter-template-closed': !open,
            },
            className,
          )}
        >
          <Form
            submittable
            cancellable
            onSubmit={this.onApply}
            labelType="secondary"
            actionsPosition="right"
            submitLabel={submitLabel}
            cancelLabel={cancelLabel}
            onCancel={this.close}
            values={values}
            onChange={this.onChange}
          >
            <Form.Field
              type="select"
              name="field"
              label={fieldLabel}
              placeholder={fieldPlaceholder}
              options={fieldOptions}
              error={fieldError && fieldErrorText}
            />
            <Form.Field
              type="select"
              name="operator"
              label={operatorLabel}
              placeholder={operatorPlaceholder}
              options={operatorOptions}
              error={operatorError && operatorErrorText}
            />
            <Form.Field
              type="text"
              name="value"
              label={valueLabel}
              placeholder={valuePlaceholder}
              error={valueError && valueErrorText}
            />
          </Form>
        </Card>
      </div>
    );
  }
}

FilterBuilder.propTypes = propTypes;
FilterBuilder.defaultProps = defaultProps;

export default FilterBuilder;
