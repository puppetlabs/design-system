import React from 'react';
import classnames from 'classnames';

const propTypes = {
  error: React.PropTypes.string,
  label: React.PropTypes.string,
  className: React.PropTypes.string,
  control: React.PropTypes.any,
  description: React.PropTypes.string,
};

const defaultProps = {
};

class FormField extends React.Component {
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

  render() {
    const Child = this.props.control;
    const label = this.renderLabel();
    const description = this.renderDescription();
    const className = classnames('rc-form-field', this.props.className, {
      'rc-form-field-error': this.props.error,
    });

    return (
      <div className={ className }>
        { label }
        <Child { ...this.props } />
        { description }
      </div>
    );
  }
}

FormField.propTypes = propTypes;
FormField.defaultProps = defaultProps;

export default FormField;
