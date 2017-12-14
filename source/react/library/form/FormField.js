import React from 'react';
import clone from 'clone';
import classnames from 'classnames';

import Input from '../Input';
import Select from '../select/Select';
import Switch from '../Switch';
import Checkbox from '../Checkbox';

const supportedTypes = [
  'input',
  'number',
  'select',
  'switch',
  'filters',
  'checkbox',
];

const propTypes = {
  type: React.PropTypes.oneOfType([
    React.PropTypes.oneOf(supportedTypes),
    React.PropTypes.element,
  ]).isRequired,
  name: React.PropTypes.string.isRequired,
  value: React.PropTypes.oneOfType([
    React.PropTypes.number,
    React.PropTypes.string,
    React.PropTypes.bool,
  ]),
  inline: React.PropTypes.bool,
  size: React.PropTypes.string,
  error: React.PropTypes.string,
  label: React.PropTypes.string,
  onChange: React.PropTypes.func,
  className: React.PropTypes.string,
  description: React.PropTypes.string,
  elementProps: React.PropTypes.object,
};

const defaultProps = {
  onChange: () => {},
};

class FormField extends React.Component {
  constructor(props) {
    super(props);

    this.onChange = this.onChange.bind(this);
  }

  onChange(val) {
    let value = val;

    switch (this.props.type) {
      case 'input':
      case 'number':
        value = val.target.value;
        break;
      case 'switch':
        value = val.target.checked;
        break;
      default:
        break;
    }

    this.props.onChange(value);
  }

  renderLabel() {
    let jsx;

    if (this.props.label) {
      jsx = (
        <label htmlFor={ this.props.name } className="rc-form-field-label">
          { this.props.label }
        </label>
      );
    }

    return jsx;
  }

  renderDescription() {
    const message = this.props.error || this.props.description;
    let jsx;

    if (message) {
      jsx = (
        <div className="rc-form-field-description">
          { message }
        </div>
      );
    }

    return jsx;
  }

  renderElement() {
    const elementProps = this.props.elementProps;
    const type = this.props.type;
    let jsx = null;

    if (typeof type.prototype === 'object' && type.prototype.isReactComponent) {
      const props = Object.assign(clone(this.props), elementProps);

      jsx = React.createElement(type, Object.assign({
        name: this.props.name,
        size: this.props.size,
        value: this.props.value,
        onChange: this.onChange,
      }, props));
    } else {
      switch (type) {
        case 'select':
          jsx = (
            <Select
              name={ this.props.name }
              size={ this.props.size }
              onSelect={ this.onChange }
              { ...elementProps }
            />
          );
          break;
        case 'input':
          jsx = (
            <Input
              name={ this.props.name }
              size={ this.props.size }
              onChange={ this.onChange }
              value={ this.props.value || '' }
              { ...elementProps }
            />
          );
          break;
        case 'number':
          jsx = (
            <Input
              type="number"
              name={ this.props.name }
              size={ this.props.size }
              onChange={ this.onChange }
              value={ this.props.value || '' }
              { ...elementProps }
            />
          );
          break;
        case 'switch':
          jsx = (
            <Switch
              name={ this.props.name }
              size={ this.props.size }
              onChange={ this.onChange }
              checked={ !!this.props.value }
              { ...elementProps }
            />
          );
          break;
        case 'checkbox':
          jsx = (
            <Checkbox
              name={ this.props.name }
              size={ this.props.size }
              onChange={ this.onChange }
              checked={ !!this.props.value }
              { ...elementProps }
            />
          );
          break;
        default:
          break;
      }
    }

    return (
      <div className="rc-form-field-element">
        { jsx }
      </div>
    );
  }

  render() {
    const element = this.renderElement();
    const label = this.renderLabel();
    const description = this.renderDescription();
    const className = classnames('rc-form-field', this.props.className, {
      'rc-form-field-inline': this.props.inline,
      'rc-form-field-error': this.props.error,
    });

    return (
      <div className={ className }>
        <div className="rc-form-field-content">
          { label }
          { element }
        </div>
        { description }
      </div>
    );
  }
}

FormField.propTypes = propTypes;
FormField.defaultProps = defaultProps;

export default FormField;
