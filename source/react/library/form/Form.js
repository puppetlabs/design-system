import React from 'react';
import classnames from 'classnames';
import Button from '../Button';

import FormField from './FormField';

const propTypes = {
  className: React.PropTypes.string,
  inline: React.PropTypes.bool,
  children: React.PropTypes.any,
  onSubmit: React.PropTypes.func,
  submittable: React.PropTypes.bool,
};

const defaultProps = {
  onSubmit: () => {},
  className: '',
};

const getValues = (children) => {
  const values = {};

  React.Children.forEach(children, (child) => {
    values[child.props.name] = child.props.value;
  });

  return values;
}

/**
 * `Form` is a container component for rendering forms.
 */
class Form extends React.Component {
  constructor(props) {
    super(props);

    const defaultValues = getValues(props.children);

    this.state = defaultValues;

    this.onSubmit = this.onSubmit.bind(this);
    this.onChange = this.onChange.bind(this);
  }

  onSubmit() {
    this.props.onSubmit(this.state);
  }

  onChange(name) {
    return (value) => {
      this.setState({ [name]: value });
    };
  }

  renderChildren() {
    return React.Children.map(this.props.children, child => React.cloneElement(child, {
      value: this.state[child.props.name],
      onChange: this.onChange(child.props.name),
    }));
  }

  renderActions() {
    let jsx = [];

    if (this.props.submittable) {
      jsx.push(
        <Button key="submit" onClick={ this.onSubmit }>Submit</Button>
      );
    }

    if (jsx.length) {
      jsx = (
        <div className="rc-form-actions">
          { jsx }
        </div>
      );
    }

    return jsx;
  }

  render() {
    const children = this.renderChildren();
    const actions = this.renderActions();
    const className = classnames('rc-form', this.props.className, {
      'rc-form-inline': this.props.inline,
    });

    return (
      <div className={ className }>
        { children }
        { actions }
      </div>
    );
  }
}

Form.propTypes = propTypes;
Form.defaultProps = defaultProps;


Form.Field = FormField;

export default Form;
