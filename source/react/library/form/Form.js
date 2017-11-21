import React from 'react';
import classnames from 'classnames';
import Button from '../Button';

import FormField from './FormField';

const propTypes = {
  className: React.PropTypes.string,
  onChange: React.PropTypes.func,
  inline: React.PropTypes.bool,
  children: React.PropTypes.any,
  onSubmit: React.PropTypes.func,
  submittable: React.PropTypes.bool,
  validator: React.PropTypes.func,
  errors: React.PropTypes.object,
};

const defaultProps = {
  onChange: () => {},
  onSubmit: () => {},
  validator: () => {},
  className: '',
  errors: {},
};

const getValues = (children) => {
  const values = {};

  React.Children.forEach(children, (child) => {
    values[child.props.name] = child.props.value;
  });

  return values;
};

const validate = (validator, values) => validator(values) || {};

/**
 * `Form` is a container component for rendering forms.
 */
class Form extends React.Component {
  constructor(props) {
    super(props);

    const defaultValues = getValues(props.children);

    this.state = {
      values: defaultValues,
      valid: false,
    };

    this.onSubmit = this.onSubmit.bind(this);
    this.onChange = this.onChange.bind(this);
  }

  onSubmit() {
    this.props.onSubmit(this.state);
  }

  onChange(name) {
    return (value) => {
      const newState = Object.assign({}, this.state);
      newState.values[name] = value;
      newState.valid = Object.keys(validate(this.props.validator, newState.values)).length === 0;

      this.setState(newState, () => {
        this.props.onChange(this.state.values, this.state.valid);
      });
    };
  }

  renderChildren() {
    return React.Children.map(this.props.children, child => React.cloneElement(child, {
      error: child.props.error || this.props.errors[child.props.name],
      value: this.state.values[child.props.name],
      onChange: this.onChange(child.props.name),
    }));
  }

  renderActions() {
    let jsx = [];

    if (this.props.submittable) {
      jsx.push(
        <Button
          key="submit"
          disabled={ !this.state.valid }
          onClick={ this.onSubmit }
          label="submit"
        />,
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
      <form className={ className }>
        <fieldset className="rc-form-fields">
          { children }
        </fieldset>
        { actions }
      </form>
    );
  }
}

Form.propTypes = propTypes;
Form.defaultProps = defaultProps;


Form.Field = FormField;

export default Form;
