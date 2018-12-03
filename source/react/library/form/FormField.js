import PropTypes from 'prop-types';
import React from 'react';
import clone from 'clone';
import classnames from 'classnames';

import { TooltipHoverArea } from '../tooltips/Tooltip';

import Input, {
  SUPPORTED_TYPES as INPUT_SUPPORTED_TYPES,
} from '../input/Input';
import Select from '../select/Select';
import Switch from '../switch/Switch';
import Checkbox from '../checkbox/Checkbox';

const supportedTypes = [
  ...INPUT_SUPPORTED_TYPES,
  'select',
  'switch',
  'filters',
  'checkbox',
];

const propTypes = {
  /** The type of input to render */
  type: PropTypes.oneOfType([
    PropTypes.oneOf(supportedTypes),
    PropTypes.element,
  ]).isRequired,
  required: PropTypes.bool,
  requiredFieldMessage: PropTypes.string,
  /** A unique identifier for this field */
  name: PropTypes.string.isRequired,
  /*
   * CAUTION due to the onchange event fired in the form component having a default value
   * assigned here can cause a world of hurt. Since a form field can be many different types,
   * including a Select, Input, or even a custom built component we don't know why type of default
   * value is required. Disabling the rule below allows the parent to pass us what it needs.
  */
  // eslint-disable-next-line react/require-default-props
  value: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.string,
    PropTypes.bool,
  ]),
  inline: PropTypes.bool,
  size: PropTypes.string,
  error: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
  /** A human-friendly identifier for this field */
  label: PropTypes.string,
  /** This will be used by the parent `Form` to track updates. */
  onChange: PropTypes.func,
  /** A tooltip to display when the field is hovered */
  tooltip: PropTypes.string,
  className: PropTypes.string,
  /** Expanded explainer for the field */
  description: PropTypes.string,
  /** Additional props to pass to the underlying form element */
  elementProps: PropTypes.shape({}),
};

const defaultProps = {
  inline: false,
  required: false,
  requiredFieldMessage: 'Required field',
  size: null,
  error: '',
  label: '',
  tooltip: null,
  className: '',
  description: '',
  elementProps: {},
  onChange: null,
};

const isReactComponent = c =>
  (c.prototype === 'object' && c.prototype.isReactComponent) ||
  typeof c === 'function';

/**
 * `FormField`s are meant to be rendered as children either within a `Form` or a `FormSection`.
 */

class FormField extends React.Component {
  constructor(props) {
    super(props);

    this.onChange = this.onChange.bind(this);
  }

  onChange(val) {
    const { type, onChange } = this.props;
    // We should be able to use the onChange value from most elements (Selects, etc) but for some,
    // we need to modify it here.
    let value = val;

    switch (type) {
      case 'text':
      case 'email':
      case 'password':
      case 'url':
      case 'search': {
        const { target } = val;
        const { value: targetValue } = target;

        value = targetValue;
        break;
      }
      case 'number':
        value = parseInt(val.target.value, 10);

        if (Number.isNaN(value)) {
          value = undefined;
        }

        break;
      case 'switch':
        value = val.target.checked;
        break;
      default:
        break;
    }

    if (onChange) {
      onChange(value);
    }
  }

  getTypeName() {
    const { type } = this.props;
    let name;

    if (typeof type === 'string') {
      name = type;
    }

    return name;
  }

  renderLabel() {
    const { label, name, tooltip } = this.props;
    let jsx;

    if (label) {
      jsx = (
        // eslint-disable-next-line jsx-a11y/label-has-for
        <label htmlFor={name} className="rc-form-field-label" key="field-label">
          {label}
        </label>
      );

      if (tooltip) {
        jsx = (
          <TooltipHoverArea
            tooltip={tooltip}
            anchor="bottom"
            key="field-label-tooltip"
          >
            {jsx}
          </TooltipHoverArea>
        );
      }
    }

    return jsx;
  }

  renderDescription() {
    const { error, description } = this.props;
    const message = error || description;
    let jsx;

    if (message) {
      jsx = <div className="rc-form-field-description">{message}</div>;
    }

    return jsx;
  }

  renderElement() {
    const {
      elementProps,
      type,
      name,
      size,
      value: valueProp,
      required,
    } = this.props;
    let jsx = null;
    let value;

    if (isReactComponent(type)) {
      const props = Object.assign(clone(this.props), elementProps);

      jsx = React.createElement(
        type,
        Object.assign(
          {
            name,
            size,
            value: valueProp,
            onChange: this.onChange,
          },
          props,
        ),
      );
    } else {
      switch (type) {
        case 'select':
          jsx = (
            <Select
              name={name}
              size={size}
              onSelect={this.onChange}
              selected={valueProp}
              {...elementProps}
            />
          );

          break;
        case 'input':
        case 'text':
        case 'email':
        case 'password':
        case 'url':
        case 'search':
          value = '';

          if (typeof valueProp === 'string') {
            value = valueProp;
          }

          jsx = (
            <Input
              name={name}
              required={required}
              type={type === 'input' ? undefined : type}
              size={size}
              onChange={this.onChange}
              value={value}
              {...elementProps}
            />
          );
          break;
        case 'number':
          jsx = (
            <Input
              type="number"
              required={required}
              name={name}
              size={size}
              onChange={this.onChange}
              value={valueProp || ''}
              {...elementProps}
            />
          );
          break;
        case 'switch':
          jsx = (
            <Switch
              name={name}
              size={size}
              onChange={this.onChange}
              checked={!!valueProp}
              {...elementProps}
            />
          );
          break;
        case 'checkbox':
          jsx = (
            <Checkbox
              name={name}
              size={size}
              onChange={this.onChange}
              checked={!!valueProp}
              required={required}
              {...elementProps}
            />
          );
          break;
        default:
          break;
      }
    }

    return (
      <div className="rc-form-field-element" key="field-element">
        {jsx}
      </div>
    );
  }

  renderContent() {
    const element = this.renderElement();
    const label = this.renderLabel();
    const typeName = this.getTypeName();
    const jsx = [];

    if (typeName === 'checkbox') {
      jsx.push(element);
      jsx.push(label);
    } else {
      jsx.push(label);
      jsx.push(element);
    }

    return jsx;
  }

  render() {
    const { className, inline, error } = this.props;
    const description = this.renderDescription();
    const typeName = this.getTypeName();
    const content = this.renderContent();
    const classNames = classnames('rc-form-field', className, {
      'rc-form-field-inline': inline,
      [`rc-form-field-${typeName}`]: typeName,
      'rc-form-field-error': error,
    });

    return (
      <div className={classNames}>
        <div className="rc-form-field-content">{content}</div>
        {description}
      </div>
    );
  }
}

FormField.propTypes = propTypes;
FormField.defaultProps = defaultProps;

export default FormField;
