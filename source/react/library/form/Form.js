import React from 'react';
import classnames from 'classnames';

import FormField from './FormField';

const propTypes = {
  className: React.PropTypes.string,
  inline: React.PropTypes.bool,
  children: React.PropTypes.any,
};

const defaultProps = {
  className: '',
};

/**
 * `Form` is a container component for rendering forms.
 */
class Form extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};

    this.onChange = this.onChange.bind(this);
  }

  onChange(name) {
    return (value) => {
      this.setState({ [name]: value });
    };
  }

  renderChildren() {
    return React.Children.map(this.props.children, child => React.cloneElement(child, {
      onChange: this.onChange(child.props.name),
    }));
  }

  render() {
    const children = this.renderChildren();
    const className = classnames('rc-form', this.props.className, {
      'rc-form-inline': this.props.inline,
    });

    return (
      <div className={ className }>
        { children }
      </div>
    );
  }
}

Form.propTypes = propTypes;
Form.defaultProps = defaultProps;


Form.Field = FormField;

export default Form;
