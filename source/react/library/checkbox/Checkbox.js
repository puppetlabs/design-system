import PropTypes from 'prop-types';
import React from 'react';
import classNames from 'classnames';

import Icon from '../icon/Icon';
import Text from '../text/Text';

const propTypes = {
  /** Name of the input */
  name: PropTypes.string.isRequired,
  /** Human friendly label */
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
};

const defaultProps = {
  value: false,
  disabled: false,
  error: false,
  onChange() {},
  inputRef() {},
};

/**
 * The Checkbox is a lightly styled wrapper around an html checkbox input.
 */
const Checkbox = ({
  name,
  value,
  label,
  error,
  className,
  style,
  inputRef,
  onChange,
  size,
  type,
  ...otherProps
}) => (
  <Text
    as="label"
    size="small"
    htmlFor={name}
    className={classNames('rc-checkbox-input', className)}
    style={style}
  >
    <div className="rc-checkbox-container">
      <input
        type="checkbox"
        id={name}
        name={name}
        checked={value}
        ref={inputRef}
        className={classNames('rc-checkbox', {
          'rc-checkbox-error': error,
        })}
        onChange={e => onChange(e.target.checked, e)}
        {...otherProps}
      />
      <Icon type="check" width="16px" height="16px" />
    </div>
    {label}
  </Text>
);

Checkbox.propTypes = propTypes;
Checkbox.defaultProps = defaultProps;

export default Checkbox;
