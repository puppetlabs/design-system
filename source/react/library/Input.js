import React from 'react';
import classnames from 'classnames';

const propTypes = {
  placeholder: React.PropTypes.string,
  className: React.PropTypes.string,
  autoFocus: React.PropTypes.bool,
  disabled: React.PropTypes.bool,
  readonly: React.PropTypes.bool,
  type: React.PropTypes.string,
  value: React.PropTypes.string,
  name: React.PropTypes.string,
  size: React.PropTypes.string,
  onKeyUp: React.PropTypes.func,
  error: React.PropTypes.string,
  onChange: React.PropTypes.func,
  onClick: React.PropTypes.func,
  onFocus: React.PropTypes.func,
  onBlur: React.PropTypes.func,
};

class Input extends React.Component {
  constructor(props) {
    super(props);

    this.onChange = this.onChange.bind(this);
    this.onFocus = this.onFocus.bind(this);
    this.onClick = this.onClick.bind(this);

    this.state = {
      value: this.props.value || '',
      disabled: !!this.props.disabled,
    };
  }

  componentWillReceiveProps(nextProps) {
    const nextState = {};

    if ({}.hasOwnProperty.call(nextProps, 'value')) {
      nextState.value = nextProps.value;
    }

    this.setState(nextState);
  }

  onChange(e) {
    this.setState({ value: e.target.value });

    if (this.props.onChange) {
      this.props.onChange(e);
    }
  }

  onFocus(e) {
    this.setState({ value: e.target.value });

    if (this.props.onFocus) {
      this.props.onFocus(e);
    }
  }

  onClick(e) {
    if (this.props.onClick) {
      this.props.onClick(e);
    }
  }

  focus() {
    this.input.focus();
  }

  render() {
    const className = classnames('rc-input', {
      'rc-input-error': this.props.error,
      [this.props.className]: this.props.className,
      [`rc-input-${this.props.size}`]: this.props.size,
    });

    const props = {
      autoFocus: this.props.autoFocus,
      disabled: this.props.disabled,
      readOnly: this.props.readonly,
      value: this.props.value,
      name: this.props.name,
      onKeyUp: this.props.onKeyUp,
      type: this.props.type,
      onBlur: this.props.onBlur,
      onChange: this.onChange,
      onFocus: this.onFocus,
      onClick: this.onClick,
      className,
    };

    if (!this.props.value) {
      props.placeholder = this.props.placeholder;
    }

    return <input ref={ (c) => { this.input = c; } } { ...props } />;
  }
}

Input.propTypes = propTypes;

export default Input;
