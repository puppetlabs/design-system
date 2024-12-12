import PropTypes from 'prop-types';
import React from 'react';
import classNames from 'classnames';

import Text from '../text';

const propTypes = {
  /** Name of the input */
  name: PropTypes.string.isRequired,
  /** Name of the input */
  label: PropTypes.string.isRequired,
  /** Is the input checked? */
  value: PropTypes.bool,
  /** Is the input disabled */
  disabled: PropTypes.bool,
  /** Form error, causing element to render red when present */
  error: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
  /** Is the input required */
  inputRef: PropTypes.func,
  /** Change handler. Passed in order: new value, original event. Additionally, other event handlers and and props are propagated to the inner input element for use as needed */
  onChange: PropTypes.func,
  /** Custom user-provided className */
  className: PropTypes.string,
  /** Custom user-provided inline styles */
  style: PropTypes.shape({}),
};

const defaultProps = {
  value: false,
  disabled: false,
  error: false,
  onChange() {},
  inputRef() {},
  className: '',
  style: {},
};

const Switch = ({
  name,
  error,
  value,
  className,
  style,
  inputRef,
  onChange,
  type, // eslint-disable-line
  label,
  ...otherProps
}) => (
  <Text
    as="label"
    size="small"
    htmlFor={name}
    className={classNames('rc-switch-input', className)}
    style={style}
  >
    <div
      className={classNames('rc-switch-container', {
        'rc-switch-error': error,
      })}
    >
      <input
        type="checkbox"
        name={name}
        id={name}
        checked={value}
        ref={inputRef}
        className="rc-switch-checkbox"
        onChange={(e) => onChange(e.target.checked, e)}
        {...otherProps}
      />
      <div className="rc-switch-label" />
    </div>
    {label}
  </Text>
);

Switch.propTypes = propTypes;
Switch.defaultProps = defaultProps;

export default Switch;
