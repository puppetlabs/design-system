import React from 'react';
import classnames from 'classnames';

import FormInput from './FormInput';

const propTypes = {
  className: React.PropTypes.string,
};

const defaultProps = {
};

/**
 * `Form` is a container component for rendering forms.
 */
class Form extends React.Component {
  render() {
    const className = classnames('rc-form', this.props.className);
    const children = this.props.children;

    return (
      <div className={ className }>
        { children }
      </div>
    );
  }
}

Form.propTypes = propTypes;
Form.defaultProps = defaultProps;

Form.Input = FormInput;

export default Form;
