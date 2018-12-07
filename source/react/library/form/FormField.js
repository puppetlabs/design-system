import PropTypes from 'prop-types';
import React from 'react';
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
  'checkbox',
  'switch',
  'select',
];

const propTypes = {
  /** The type of input to render */
  type: PropTypes.oneOfType([
    PropTypes.oneOf(supportedTypes),
    PropTypes.element,
  ]).isRequired,
  /** A unique identifier for this field */
  name: PropTypes.string.isRequired,
  /* Depending on the field, value can be any type */
  // eslint-disable-next-line react/forbid-prop-types
  value: PropTypes.any,
  required: PropTypes.bool,
  requiredFieldMessage: PropTypes.string,
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
};

const defaultProps = {
  value: undefined,
  inline: false,
  required: false,
  requiredFieldMessage: 'Required field',
  size: null,
  error: '',
  label: '',
  tooltip: null,
  className: '',
  description: '',
  onChange() {},
};

const isReactComponent = c =>
  (c.prototype === 'object' && c.prototype.isReactComponent) ||
  typeof c === 'function';

const mapTypeToElement = type => {
  if (isReactComponent(type)) {
    return type;
  }

  switch (type) {
    case 'checkbox':
      return Checkbox;
    case 'switch':
      return Switch;
    case 'select':
      return Select;
    default:
      return Input;
  }
};
/**
 * `FormField`s are meant to be rendered as children either within a `Form` or a `FormSection`.
 */

class FormField extends React.Component {
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
      inline,
      label,
      tooltip,
      requiredFieldMessage,
      description,
      type,
      ...otherProps
    } = this.props;

    const Element = mapTypeToElement(type);

    return (
      <div className="rc-form-field-element" key="field-element">
        <Element type={type} {...otherProps} />
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
