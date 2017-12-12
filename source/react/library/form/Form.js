import React from 'react';
import classnames from 'classnames';
import Button from '../Button';
import ButtonGroup from '../ButtonGroup';

import FormField from './FormField';

const propTypes = {
  className: React.PropTypes.string,
  onChange: React.PropTypes.func,
  inline: React.PropTypes.bool,
  children: React.PropTypes.any,
  onCancel: React.PropTypes.func,
  onSubmit: React.PropTypes.func,
  cancellable: React.PropTypes.bool,
  submittable: React.PropTypes.bool,
  validator: React.PropTypes.func,
  errors: React.PropTypes.object,
  size: React.PropTypes.string,
};

const defaultProps = {
  onChange: () => {},
  onCancel: () => {},
  onSubmit: () => {},
  validator: () => {},
  size: 'small',
  className: '',
  errors: {},
};

const getValues = (children) => {
  const values = {};

  React.Children.forEach(children, (child) => {
    if (child) {
      values[child.props.name] = child.props.value;
    }
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
        this.props.onChange(name, this.state.values, this.state.valid);
      });
    };
  }

  renderChildren() {
    const children = [];

    React.Children.forEach(this.props.children, (child) => {
      if (child) {
        children.push(React.cloneElement(child, {
          error: child.props.error || this.props.errors[child.props.name],
          value: this.state.values[child.props.name],
          onChange: this.onChange(child.props.name),
          size: this.props.size,
        }));
      }
    });

    return children;
  }

  renderActions() {
    let jsx = [];

    if (this.props.cancellable) {
      jsx.push(
        <Button
          key="cancel"
          secondary
          size={ this.props.size }
          onClick={ this.props.onCancel }
          label="cancel"
        />,
      );
    }

    if (this.props.submittable) {
      jsx.push(
        <Button
          key="submit"
          size={ this.props.size }
          disabled={ !this.state.valid }
          onClick={ this.onSubmit }
          label="submit"
        />,
      );
    }

    if (jsx.length) {
      jsx = (
        <div className="rc-form-actions">
          <ButtonGroup>
            { jsx }
          </ButtonGroup>
        </div>
      );
    }

    return jsx;
  }

  render() {
    const children = this.renderChildren();
    const actions = this.renderActions();
    const className = classnames('rc-form', this.props.className, `rc-form-${this.props.size}`, {
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
