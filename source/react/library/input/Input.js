import PropTypes from 'prop-types';
import React from 'react';
import classnames from 'classnames';
import Icon from '../icon/Icon';

const propTypes = {
  multiline: PropTypes.bool,

  /** Placeholder for when value is unset */
  placeholder: PropTypes.string,
  /** Class name applied to input element */
  className: PropTypes.string,
  autoComplete: PropTypes.bool,
  autoFocus: PropTypes.bool,
  /** Disallow user input */
  disabled: PropTypes.bool,
  readonly: PropTypes.bool,
  type: PropTypes.string,
  /** Value string */
  // eslint-disable-next-line react/require-default-props
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  name: PropTypes.string,
  size: PropTypes.oneOf(['large', 'medium', 'small', 'tiny']),
  simple: PropTypes.bool,
  error: PropTypes.string,
  style: PropTypes.shape({}),
  icon: PropTypes.bool,
  onKeyDown: PropTypes.func,
  onKeyUp: PropTypes.func,
  onChange: PropTypes.func,
  onClick: PropTypes.func,
  onFocus: PropTypes.func,
  onBlur: PropTypes.func,
};

const defaultProps = {
  autoComplete: true,
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
 */
class Input extends React.Component {
  constructor(props) {
    super(props);

    this.onChange = this.onChange.bind(this);
    this.onFocus = this.onFocus.bind(this);
    this.onClick = this.onClick.bind(this);
  }

  onChange(e) {
    const { onChange } = this.props;
    if (onChange) {
      onChange(e);
    }
  }

  onFocus(e) {
    const { onFocus } = this.props;
    if (onFocus) {
      onFocus(e);
    }
  }

  onClick(e) {
    const { onClick } = this.props;
    if (onClick) {
      onClick(e);
    }
  }

  focus() {
    this.input.focus();
  }

  blur() {
    this.input.blur();
  }

  render() {
    const {
      className,
      error,
      simple,
      multiline,
      size,
      onKeyDown,
      autoFocus,
      disabled,
      readonly,
      name,
      onKeyUp,
      type,
      onBlur,
      onChange,
      onFocus,
      onClick,
      style,
      autoComplete,
      value,
      placeholder,
      icon,
    } = this.props;

    const props = {
      onKeyDown,
      autoFocus,
      disabled,
      readOnly: readonly,
      id: name,
      name,
      onKeyUp,
      type,
      onBlur,
      onChange,
      onFocus,
      onClick,
      className: classnames('rc-input', className, {
        'rc-input-error': error,
        'rc-input-simple': simple,
        'rc-input-multiline': multiline,
        [`rc-input-${size}`]: size,
      }),
      style,
    };

    if (!autoComplete) {
      props.autoComplete = 'off';
    }

    if (value !== undefined) {
      props.value = value;
    }

    if (!value) {
      props.placeholder = placeholder;
    }

    let jsx;

    if (multiline) {
      jsx = (
        <textarea
          ref={c => {
            this.input = c;
          }}
          {...props}
        />
      );
    } else {
      jsx = (
        <input
          ref={c => {
            this.input = c;
          }}
          {...props}
        />
      );
    }

    if (icon) {
      jsx = (
        <div className="rc-input-icon">
          <Icon width="16px" height="16px" type="search" />
          {jsx}
        </div>
      );
    }

    return jsx;
  }
}

Input.propTypes = propTypes;
Input.defaultProps = defaultProps;

export default Input;
