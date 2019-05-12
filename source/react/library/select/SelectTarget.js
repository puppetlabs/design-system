import React, { forwardRef } from 'react';
import classNames from 'classnames';
import Icon from '../icon/Icon';

const propTypes = {};

const defaultProps = {};

const Input = forwardRef(
  ({ error, value, placeholder, className, ...rest }, ref) => (
    <div className={classNames('rc-input-container', 'rc-select-target')}>
      <Icon
        className="rc-input-icon trailing"
        width="16px"
        height="16px"
        type="chevron-down"
      />
      <button
        type="button"
        className={classNames('rc-input', {
          'rc-input-error': error,
          'rc-input-empty': !value,
        })}
        ref={ref}
        {...rest}
      >
        {value || placeholder}
      </button>
    </div>
  ),
);

Input.propTypes = propTypes;
Input.defaultProps = defaultProps;

export default Input;
