import React, { forwardRef } from 'react';
import classNames from 'classnames';
import Icon from '../icon';

const propTypes = {};

const defaultProps = {};

const renderText = (type, value, placeholder) => {
  if (type === 'multiselect' || !value) {
    return placeholder;
  }

  return value;
};

/* eslint-disable react/prop-types */
const SelectTarget = forwardRef(
  ({ error, value, type, placeholder, className, ...rest }, ref) => (
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
        {renderText(type, value, placeholder)}
      </button>
    </div>
  ),
);
/* eslint-enable */
SelectTarget.propTypes = propTypes;
SelectTarget.defaultProps = defaultProps;

export default SelectTarget;
