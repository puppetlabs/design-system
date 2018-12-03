import PropTypes from 'prop-types';
import React from 'react';
import classNames from 'classnames';

import Icon from '../icon/Icon';

const propTypes = {
  /** Name of the input */
  name: PropTypes.string.isRequired,
  /** Is the input checked */
  checked: PropTypes.bool,
  /** Is the input disabled */
  disabled: PropTypes.bool,
  /** Form error, causing element to render red when present */
  error: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
  /** Is the input required */
  inputRef: PropTypes.func,
  /** Change handler. Additionally, other event handlers and and props are propagated to the inner input element for use as needed */
  onChange: PropTypes.func,
};

const defaultProps = {
  checked: false,
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
  error,
  className,
  style,
  inputRef,
  ...otherProps
}) => (
  <div className={classNames('rc-checkbox-container', className)} style={style}>
    <input
      type="checkbox"
      id={name}
      name={name}
      ref={inputRef}
      className={classNames('rc-checkbox', {
        'rc-checkbox-error': error,
      })}
      {...otherProps}
    />
    <Icon type="check" width="16px" height="16px" />
  </div>
);

Checkbox.propTypes = propTypes;
Checkbox.defaultProps = defaultProps;

export default Checkbox;
