import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import Icon from '../icon';
import Button from '../button';

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
  'number',
  'multiline',
  'hidden',
];

const propTypes = {
  /** Input name */
  name: PropTypes.string.isRequired,
  /** Input type, inluding most standard native input types and 'multiline' which will render a 'textarea' */
  type: PropTypes.oneOf(SUPPORTED_TYPES),
  /** Current value of the input */
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  /** Optional field placeholder */
  placeholder: PropTypes.string,
  /** Alternate visual variation */
  simple: PropTypes.bool,
  /** Is the input disabled */
  disabled: PropTypes.bool,
  /** Form error, causing element to render red when present */
  error: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
  /** Optional icon rendered before input area */
  icon: PropTypes.string,
  /** Optional icon rendered after input area */
  trailingIcon: PropTypes.string,
  /** Whether or not the icon is rendered as a button */
  iconButton: PropTypes.bool,
  /** Optional additional className */
  className: PropTypes.string,
  /** Optional inline styles */
  style: PropTypes.shape({}),
  /** Ref method passed to the inner input element */
  inputRef: PropTypes.func,
  /** Change handler. Passed in order: new value, original event. Additionally, other event handlers and and props are propagated to the inner input element for use as needed */
  onChange: PropTypes.func,
  /** Function for button click (use iconButton to make icon clickable) */
  onClickIconButton: PropTypes.func,
};

const defaultProps = {
  type: 'text',
  value: '',
  placeholder: '',
  simple: false,
  disabled: false,
  error: false,
  icon: null,
  trailingIcon: null,
  iconButton: false,
  style: {},
  className: '',
  inputRef() {},
  onChange() {},
  onClickIconButton() {},
};

/**
 * Different value parsing for different input types.
 */
const parseValue = (value, type) => {
  switch (type) {
    case 'number':
      return parseFloat(value);
    default:
      return value;
  }
};

const Input = ({
  name,
  type,
  simple,
  error,
  icon,
  trailingIcon,
  iconButton,
  className,
  style,
  inputRef,
  onChange,
  onClickIconButton,
  ...otherProps
}) => {
  const isMultiline = type === 'multiline';

  const Element = isMultiline ? 'textarea' : 'input';

  const lIcon = iconButton ? (
    <Button
      className="rc-input-icon rc-input-button-icon leading edge"
      icon={icon}
      type="transparent"
      onClick={() => onClickIconButton()}
    />
  ) : (
    <Icon
      className="rc-input-icon leading"
      width="16px"
      height="16px"
      type={icon}
    />
  );

  const tIcon = iconButton ? (
    <Button
      className="rc-input-icon rc-input-button-icon trailing edge"
      icon={trailingIcon}
      type="transparent"
      onClick={() => onClickIconButton()}
    />
  ) : (
    <Icon
      className="rc-input-icon trailing"
      width="16px"
      height="16px"
      type={trailingIcon}
    />
  );

  return (
    <div className={classNames('rc-input-container', className)} style={style}>
      {icon && lIcon}
      {trailingIcon && tIcon}
      <Element
        id={name}
        name={name}
        type={isMultiline ? undefined : type}
        className={classNames('rc-input', {
          'rc-input-error': error,
          'rc-input-simple': simple,
          'rc-input-multiline': isMultiline,
        })}
        ref={inputRef}
        onChange={e => onChange(parseValue(e.target.value), e)}
        {...otherProps}
      />
    </div>
  );
};

Input.propTypes = propTypes;
Input.defaultProps = defaultProps;

export default Input;
