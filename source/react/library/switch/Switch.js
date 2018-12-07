import PropTypes from 'prop-types';
import React from 'react';
import classNames from 'classnames';

import Icon from '../icon/Icon';

const propTypes = {
  /** Name of the input */
  name: PropTypes.string.isRequired,
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
};

const defaultProps = {
  value: false,
  disabled: false,
  error: false,
  onChange() {},
  inputRef() {},
};

const Switch = ({
  name,
  error,
  value,
  className,
  style,
  inputRef,
  onChange,
  type,
  ...otherProps
}) => (
  <div
    className={classNames(
      'rc-switch-container',
      { 'rc-switch-error': error },
      className,
    )}
    style={style}
  >
    <input
      type="checkbox"
      name={name}
      id={name}
      checked={value}
      ref={inputRef}
      className="rc-switch-checkbox"
      onChange={e => onChange(e.target.checked, e)}
      {...otherProps}
    />
    <div className="rc-switch-label">
      <span className="rc-switch-label-on">
        <Icon width="12px" height="12px" type="checkmark" />
      </span>
      <span className="rc-switch-label-off">
        <Icon width="12px" height="12px" type="close" />
      </span>
    </div>
  </div>
);

Switch.propTypes = propTypes;
Switch.defaultProps = defaultProps;

export default Switch;
