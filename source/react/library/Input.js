import React from 'react';
import classnames from 'classnames';
import Icon from './Icon';

const propTypes = {
  multiline: React.PropTypes.bool,

  /** Placeholder for when value is unset */
  placeholder: React.PropTypes.string,
  /** Class name applied to input element */
  className: React.PropTypes.string,
  autoFocus: React.PropTypes.bool,
  /** Disallow user input */
  disabled: React.PropTypes.bool,
  readonly: React.PropTypes.bool,
  type: React.PropTypes.string,
  /** Value string */
  value: React.PropTypes.oneOfType([
    React.PropTypes.string,
    React.PropTypes.number,
  ]),
  name: React.PropTypes.string,
  size: React.PropTypes.oneOf(['large', 'medium', 'small', 'tiny']),
  simple: React.PropTypes.bool,
  error: React.PropTypes.string,
  style: React.PropTypes.object,
  icon: React.PropTypes.string,
  onKeyDown: React.PropTypes.func,
  onKeyUp: React.PropTypes.func,
  onChange: React.PropTypes.func,
  onClick: React.PropTypes.func,
  onFocus: React.PropTypes.func,
  onBlur: React.PropTypes.func,
};

const defaultProps = {
  multiline: false,
  placeholder: '',
  className: '',
  autoFocus: false,
  disabled: false,
  readonly: false,
  type: null,
  name: '',
  size: null,
  simple: false,
  error: '',
  style: null,
  icon: null,
  onChange: null,
  onClick: null,
  onKeyDown: null,
  onKeyUp: null,
  onFocus: null,
  onBlur: null,
};

/**
 * `Input` renders a DOM `input` element.
 *
 * @example ../../../docs/Input.md
 */
class Input extends React.Component {
  constructor(props) {
    super(props);

    this.onChange = this.onChange.bind(this);
    this.onFocus = this.onFocus.bind(this);
    this.onClick = this.onClick.bind(this);
  }

  onChange(e) {
    if (this.props.onChange) {
      this.props.onChange(e);
    }
  }

  onFocus(e) {
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

  blur() {
    this.input.blur();
  }

  render() {
    const className = classnames('rc-input', this.props.className, {
      'rc-input-error': this.props.error,
      'rc-input-simple': this.props.simple,
      'rc-input-multiline': this.props.multiline,
      [`rc-input-${this.props.size}`]: this.props.size,
    });

    const props = {
      onKeyDown: this.props.onKeyDown,
      autoFocus: this.props.autoFocus,
      disabled: this.props.disabled,
      readOnly: this.props.readonly,
      id: this.props.name,
      name: this.props.name,
      onKeyUp: this.props.onKeyUp,
      type: this.props.type,
      onBlur: this.props.onBlur,
      onChange: this.onChange,
      onFocus: this.onFocus,
      onClick: this.onClick,
      className,
      style: this.props.style,
    };

    if (this.props.value !== undefined) {
      props.value = this.props.value;
    }

    if (!this.props.value) {
      props.placeholder = this.props.placeholder;
    }

    let jsx;

    if (this.props.multiline) {
      jsx = <textarea ref={ (c) => { this.input = c; } } { ...props } />;
    } else {
      jsx = <input ref={ (c) => { this.input = c; } } { ...props } />;
    }

    if (this.props.icon) {
      jsx = (
        <div className="rc-input-icon">
          <Icon width="16px" height="16px" type="search" />
          { jsx }
        </div>
      );
    }

    return jsx;
  }
}

Input.propTypes = propTypes;
Input.defaultProps = defaultProps;

export default Input;
