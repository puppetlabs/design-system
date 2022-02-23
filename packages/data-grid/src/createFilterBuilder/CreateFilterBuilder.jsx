import React, { Component } from 'react';
import { Button, Form, Card, Icon } from '@puppet/react-components';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import './CreateFilterBuilder.scss';

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
  fieldLabel: "FIELD",
  fieldPlaceholder: "Name",
  operatorLabel: "OPERATOR",
  operatorPlaceholder: "Contains",
  valueLabel: "VALUE",
  valuePlaceholder: "Enter a string or number",
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

class CreateFilterBuilder extends Component {
  constructor(props) {
    super(props);
    this.state = { open: false, menuStyle: {} };

    this.open = this.open.bind(this);
    this.close = this.close.bind(this);
    this.onClickButton = this.onClickButton.bind(this);
    this.focusButton = this.focusButton.bind(this);
    this.focusMenu = this.focusMenu.bind(this);
    this.closeAndFocusButton = this.closeAndFocusButton.bind(this);
    this.onBlur = this.onBlur.bind(this);
    this.onApply = this.onApply.bind(this);
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

  onApply(value) {
    const { onSubmit } = this.props;
    console.log("called")
    onSubmit(value)
    this.close();
  }

  onBlur(e) {
    if (!this.container.contains(e.relatedTarget)) {
      this.close();
    }
  }

  closeAndFocusButton() {
    this.close();
    this.focusButton();
  }

  open() {
    this.setState({ open: true }, this.focusMenu);
  }

  close() {
    this.setState({ open: false });
  }

  focusMenu() {
    focus(this.menu);
  }

  focusButton() {
    if (this.button) {
      focus(this.button);
    }
  }

  render() {
    const { open } = this.state;
    const {
      id,
      buttonLabel,
      submitLabel,
      cancelLabel,
      fieldLabel,
      fieldPlaceholder,
      operatorLabel,
      operatorPlaceholder,
      valueLabel,
      valuePlaceholder,
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
          >
            <Form.Field
              type="select"
              name="field"
              autoComplete="Name"
              label={fieldLabel}
              placeholder={fieldPlaceholder}
              options={fieldOptions}
            />
            <Form.Field
              type="select"
              name="operator"
              autoComplete="lastname"
              label={operatorLabel}
              placeholder={operatorPlaceholder}
              options={operatorOptions}
            />
            <Form.Field
              type="text"
              name="value"
              label={valueLabel}
              placeholder={valuePlaceholder}
            />
          </Form>
        </Card>
      </div>
    );
  }
}

CreateFilterBuilder.propTypes = propTypes;
CreateFilterBuilder.defaultProps = defaultProps;

export default CreateFilterBuilder;
