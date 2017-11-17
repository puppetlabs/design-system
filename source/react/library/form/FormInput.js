import React from 'react';
import classnames from 'classnames';

import Input from '../Input';

const propTypes = {
  error: React.PropTypes.string,
  name: React.PropTypes.string,
  description: React.PropTypes.description,
};

const defaultProps = {
};

class FormInput extends React.Component {

  renderName() {
    let jsx;

    if (this.props.name) {
      jsx = (
        <div className="rc-form-input-name">
          { this.props.name }
        </div>
      );
    }

    return jsx;
  }

  renderDescription() {
    let message = this.props.error || this.props.description;
    let jsx;

    if (message) {
      jsx = (
        <div className="rc-form-input-description">
          { message }
        </div>
      );
    }

    return jsx;
  }

  render() {
    const name = this.renderName();
    const description = this.renderDescription();
    const className = classnames('rc-form-input', {
      'rc-form-input-error': this.props.error,
    });

    return (
      <div className={ className }>
        { name }
        <Input { ...this.props } />
        { description }
      </div>
    );
  }
}

FormInput.propTypes = propTypes;
FormInput.defaultProps = defaultProps;

export default FormInput;
