import PropTypes from 'prop-types';
import React from 'react';
import classNames from 'classnames';

import Icon from '../icon';
import Text from '../text';

const propTypes = {
  /** Name of the input */
  name: PropTypes.string.isRequired,
  /** Human friendly label */
  label: PropTypes.node.isRequired,
  /** Boolean input value determining if the checkbox is checked or not */
  value: PropTypes.bool,
  /** Is the input disabled */
  disabled: PropTypes.bool,
  /** Is indeterminate state */
  indeterminate: PropTypes.bool,
  /** Form error, causing element to render red when present */
  error: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
  /** Ref method passed to the inner input element */
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
  indeterminate: false,
  onChange() {},
  inputRef() {},
  className: '',
  style: {},
};

/**
 * The Checkbox is a lightly styled wrapper around an html checkbox input.
 */
const Checkbox = ({
  name,
  value,
  label,
  error,
  indeterminate,
  className,
  style,
  inputRef,
  onChange,
  type, // eslint-disable-line
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
          'rc-checkbox-indeterminate': indeterminate,
        })}
        onChange={(e) => onChange(e.target.checked, e)}
        {...otherProps}
      />
      {indeterminate ? (
        <Icon type="indeterminate" size="small" />
      ) : (
        <Icon type="check" />
      )}
    </div>
    {label}
  </Text>
);

Checkbox.propTypes = propTypes;
Checkbox.defaultProps = defaultProps;

export default Checkbox;
