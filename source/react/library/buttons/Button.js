import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { renderableElement } from '../../helpers/customPropTypes';
import Icon from '../icon/Icon';

const propTypes = {
  as: renderableElement,
  type: PropTypes.oneOf([
    'primary',
    'secondary',
    'tertiary',
    'danger',
    'transparent',
  ]),
  weight: PropTypes.oneOf(['bold', 'subtle']),
  size: PropTypes.oneOf(['medium', 'small']),
  loading: PropTypes.bool,
  className: PropTypes.string,
  buttonType: PropTypes.oneOf(['button', 'submit', 'reset']),
};

const defaultProps = {
  as: 'button',
  type: 'primary',
  weight: 'bold',
  size: 'medium',
  loading: false,
  buttonType: undefined,
  className: '',
};

const assignTypeDefault = (buttonType, Element) =>
  buttonType || Element === 'button' ? 'button' : null;

const Button = ({
  as: Element,
  type,
  size,
  weight,
  loading,
  buttonType,
  className,
  children,
  disabled,
  ...rest
}) => (
  <Element
    type={assignTypeDefault(buttonType, Element)}
    className={classNames(
      'rc-button',
      `rc-button-${type}`,
      `rc-button-${weight}`,
      `rc-button-${size}`,
      { 'rc-button-loading': loading },
      { 'rc-button-disabled': disabled },
      className,
    )}
    disabled={loading || disabled}
    aria-disabled={Element !== 'button' && (loading || disabled)}
    aria-label={loading && children}
    {...rest}
  >
    <span className="rc-button-content">{children}</span>
    {loading && <Icon width="16px" height="16px" type="loader" />}
  </Element>
);

Button.propTypes = propTypes;
Button.defaultProps = defaultProps;

export default Button;
