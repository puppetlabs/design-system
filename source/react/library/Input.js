import React from 'react';
import classnames from 'classnames';

const propTypes = {
  placeholder: React.PropTypes.string,
  className: React.PropTypes.string,
  onChange: React.PropTypes.func,
  disabled: React.PropTypes.bool,
  value: React.PropTypes.string,
  checked: React.PropTypes.bool,
  onKeyUp: React.PropTypes.func,
  onClick: React.PropTypes.func,
  onFocus: React.PropTypes.func,
  name: React.PropTypes.string,
  type: React.PropTypes.string,
  size: React.PropTypes.string,
  onBlur: React.PropTypes.func,
};

const defaultProps = {
  type: 'text',
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

  render() {
    const className = classnames('rc-input', {
      'rc-checkbox': this.props.type === 'checkbox',
      [this.props.className]: this.props.className,
      [`rc-input-${this.props.size}`]: this.props.size,
    });

    const props = {
      placeholder: this.props.placeholder,
      disabled: this.props.disabled,
      onKeyUp: this.props.onKeyUp,
      checked: this.props.checked,
      onBlur: this.props.onBlur,
      value: this.props.value,
      onChange: this.onChange,
      name: this.props.name,
      onFocus: this.onFocus,
      type: this.props.type,
      onClick: this.onClick,
      className,
    };

    return <input { ...props } />;
  }
}

Input.propTypes = propTypes;
Input.defaultProps = defaultProps;

export default Input;
