import React from 'react';
import classnames from 'classnames';

import Input from '../Input';
import Select from '../select/Select';
import Switch from '../Switch';

const supportedTypes = [
  'input',
  'select',
  'switch',
];

const propTypes = {
  type: React.PropTypes.oneOf(supportedTypes).isRequired,
  onChange: React.PropTypes.func.isRequired,
  name: React.PropTypes.string.isRequired,
  value: React.PropTypes.oneOfType(
    React.PropTypes.string,
    React.PropTypes.bool,
  ),
  error: React.PropTypes.string,
  label: React.PropTypes.string,
  className: React.PropTypes.string,
  description: React.PropTypes.string,
};

const defaultProps = {
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
        value = val.target.value;
        break;
      case 'switch':
        value = val.target.checked;
        break;
      case 'select':
        value = value;
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
        <div className="rc-form-field-label">
          { this.props.label }
        </div>
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
    const type = this.props.type;
    let jsx = null;

    switch (type) {
      case 'select':
        jsx = (
          <Select
            onSelect={ this.onChange }
            options={ this.props.options }
          />
        );
        break;
      case 'input':
        jsx = (
          <Input
            onChange={ this.onChange }
            value={ this.props.value || '' }
          />
        );
        break;
      case 'switch':
        jsx = (
          <Switch
            name={ this.props.name }
            onChange={ this.onChange }
            checked={ !!this.props.value }
          />
        );
        break;
      default:
        break;
    }

    return (
      <div className="rc-form-field-content">
        { jsx }
      </div>
    );
  }

  render() {
    const element = this.renderElement();
    const label = this.renderLabel();
    const description = this.renderDescription();
    const className = classnames('rc-form-field', this.props.className, {
      'rc-form-field-error': this.props.error,
    });

    return (
      <div className={ className }>
        { label }
        { element }
        { description }
      </div>
    );
  }
}

FormField.propTypes = propTypes;
FormField.defaultProps = defaultProps;

export default FormField;
