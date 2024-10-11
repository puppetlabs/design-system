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
  'date',
  'time',
  'datetime-local',
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
  /** Size of the input */
  size: PropTypes.oneOf(['medium', 'large']),
  /** Shape of the input */
  shape: PropTypes.oneOf(['round', 'oval']),
  /** Is the input disabled */
  disabled: PropTypes.bool,
  /** Form error, causing element to render red when present */
  error: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
  /** Optional icon rendered before input area */
  icon: PropTypes.string,
  /** @deprecated Optional icon rendered after input area */
  trailingIcon: PropTypes.string,
  /** Icon for rendered trailing button */
  trailingButtonIcon: PropTypes.string,
  /** Text for rendered trailing button. Can be used with or without trailingButtonIcon */
  trailingButtonText: PropTypes.string,
  /** Additional props for the trailing Button */
  trailingButtonProps: PropTypes.shape({}),
  /** Optional additional className */
  className: PropTypes.string,
  /** Optional inline styles */
  style: PropTypes.shape({}),
  /** Ref method passed to the inner input element */
  inputRef: PropTypes.func,
  /** Change handler. Passed in order: new value, original event. Additionally, other event handlers and and props are propagated to the inner input element for use as needed */
  onChange: PropTypes.func,
  /** Function for trailing button click */
  onClickTrailingButton: PropTypes.func,
};

const defaultProps = {
  type: 'text',
  value: '',
  placeholder: '',
  simple: false,
  size: 'medium',
  shape: 'round',
  disabled: false,
  error: false,
  icon: null,
  trailingIcon: null,
  trailingButtonIcon: null,
  trailingButtonText: '',
  trailingButtonProps: {},
  style: {},
  className: '',
  inputRef() {},
  onChange() {},
  onClickTrailingButton() {},
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
  size,
  shape,
  error,
  icon,
  trailingIcon,
  trailingButtonIcon,
  trailingButtonText,
  trailingButtonProps,
  className,
  style,
  inputRef,
  onChange,
  onClickTrailingButton,
  ...otherProps
}) => {
  const isMultiline = type === 'multiline';

  const Element = isMultiline ? 'textarea' : 'input';

  const showTrailingButton = !!trailingButtonIcon || !!trailingButtonText;

  const lIcon = (
    <Icon
      className="rc-input-icon leading"
      width="16px"
      height="16px"
      type={icon}
    />
  );

  /** trailingIcon is deprecated */
  const tIcon = (
    <Icon
      className={`rc-input-icon trailing ${
        showTrailingButton && 'with-trailing-button'
      }`}
      width="16px"
      height="16px"
      type={trailingIcon}
    />
  );

  const trailingButton = (
    <Button
      className="rc-input-icon rc-input-button-icon trailing edge"
      icon={trailingButtonIcon}
      type="transparent"
      onClick={() => onClickTrailingButton()}
      {...trailingButtonProps}
    >
      {trailingButtonText}
    </Button>
  );

  return (
    <div
      className={classNames(
        className,
        'rc-input-container',
        `rc-input-container-${size}`,
        `rc-input-container-${shape}`,
      )}
      style={style}
    >
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
        onChange={(e) => onChange(parseValue(e.target.value), e)}
        {...otherProps}
      />
      {showTrailingButton && trailingButton}
    </div>
  );
};

Input.propTypes = propTypes;
Input.defaultProps = defaultProps;

export default Input;
