import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import Icon from '../icon/Icon';
import { formSize } from '../../helpers/customPropTypes';

/**
 * This corresponds to a set of native input types plus 'multiline',
 * which will render a textarea element
 */
export const SUPPORTED_TYPES = [
  'text',
  'email',
  'password',
  'url',
  'search',
  'multiline',
];

const propTypes = {
  name: PropTypes.string.isRequired,
  type: PropTypes.oneOf(SUPPORTED_TYPES),
  size: formSize,
  simple: PropTypes.bool,
  error: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
  icon: PropTypes.string,
  trailingIcon: PropTypes.string,
  className: PropTypes.string,
  style: PropTypes.shape({}),
  inputRef: PropTypes.func,
  onChange: PropTypes.func,
};

const defaultProps = {
  type: 'text',
  size: 'medium',
  simple: false,
  error: false,
  icon: null,
  trailingIcon: null,
  style: {},
  className: '',
  inputRef() {},
  onChange() {},
};

const Input = ({
  name,
  type,
  size,
  simple,
  error,
  icon,
  trailingIcon,
  className,
  style,
  inputRef,
  ...otherProps
}) => {
  const isMultiline = type === 'multiline';

  const Element = isMultiline ? 'textarea' : 'input';

  return (
    <div className={classNames('rc-input-container', className)} style={style}>
      {icon && (
        <Icon
          className="rc-input-icon leading"
          width="16px"
          height="16px"
          type={icon}
        />
      )}
      {trailingIcon && (
        <Icon
          className="rc-input-icon trailing"
          width="16px"
          height="16px"
          type={trailingIcon}
        />
      )}
      <Element
        id={name}
        name={name}
        type={isMultiline ? undefined : type}
        className={classNames('rc-input', {
          'rc-input-error': error,
          'rc-input-simple': simple,
          'rc-input-multiline': isMultiline,
          [`rc-input-${size}`]: size,
        })}
        ref={inputRef}
        {...otherProps}
      />
    </div>
  );
};

Input.propTypes = propTypes;
Input.defaultProps = defaultProps;

export default Input;
