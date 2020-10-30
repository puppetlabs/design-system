import React, { forwardRef } from 'react';
import classNames from 'classnames';
import Icon from '../icon';
import Button from '../button';

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
      <Button
        type={type === 'textselect' ? 'text' : null}
        className={classNames('rc-input', {
          'rc-input-error': error,
          'rc-input-empty': !value,
          'rc-input-text-select': type === 'textselect',
        })}
        ref={ref}
        {...rest}
      >
        <Icon
          className={classNames('rc-input-icon trailing', {
            'rc-input-icon-text-select': type === 'textselect',
          })}
          width="16px"
          height="16px"
          type="chevron-down"
        />
        {renderText(type, value, placeholder)}
      </Button>
    </div>
  ),
);
/* eslint-enable */
SelectTarget.propTypes = propTypes;
SelectTarget.defaultProps = defaultProps;

export default SelectTarget;
