import PropTypes from 'prop-types';
import React from 'react';
import classNames from 'classnames';
import Icon from '../icon';

import Text from '../text';

const propTypes = {
  /** Name of the input */
  name: PropTypes.string.isRequired,
  /** Human friendly label */
  label: PropTypes.string.isRequired,
  /** Value assigned to this radio button option */
  value: PropTypes.string.isRequired,
  /** Value that is currently selected in the radio button group */
  selectedValue: PropTypes.string,
  /** Is the input disabled */
  disabled: PropTypes.bool,
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
  selectedValue: '',
  disabled: false,
  error: false,
  onChange() {},
  inputRef() {},
  className: '',
  style: {},
};
/** Inner radiobutton dot svg  */
const radioDot = {
  viewBox: '0 0 16 16',
  svg: <circle r="4" cy="8" cx="8" strokeWidth="0" />,
};
/**
 * The RadioButton is a lightly styled wrapper around an html radio input.
 */
const RadioButton = ({
  name,
  value,
  selectedValue,
  label,
  error,
  className,
  style,
  inputRef,
  onChange,
  ...otherProps
}) => (
  <Text
    as="label"
    size="small"
    className={classNames('rc-radiobutton-input', className)}
    style={style}
  >
    <div className="rc-radiobutton-container">
      <input
        type="radio"
        id={`${name}-${value}`}
        name={name}
        checked={value === selectedValue}
        ref={inputRef}
        className={classNames('rc-radiobutton', {
          'rc-radiobutton-error': error,
        })}
        onChange={(e) => onChange(value, e)}
        {...otherProps}
      />
      <Icon svg={radioDot.svg} viewBox={radioDot.viewBox} />
    </div>
    {label}
  </Text>
);

RadioButton.propTypes = propTypes;
RadioButton.defaultProps = defaultProps;

export default RadioButton;
