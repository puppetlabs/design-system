import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { renderableElement } from '../../helpers/customPropTypes';
import Icon, { AVAILABLE_ICONS } from '../icon/Icon';
import Loading from '../loading/Loading';

const propTypes = {
  as: renderableElement,
  type: PropTypes.oneOf([
    'primary',
    'secondary',
    'tertiary',
    'danger',
    'transparent',
    'text',
  ]),
  weight: PropTypes.oneOf(['bold', 'subtle']),
  icon: PropTypes.oneOf(AVAILABLE_ICONS),
  loading: PropTypes.bool,
  className: PropTypes.string,
  buttonType: PropTypes.oneOf(['button', 'submit', 'reset']),
};

const defaultProps = {
  as: 'button',
  type: 'primary',
  weight: 'bold',
  icon: null,
  loading: false,
  buttonType: undefined,
  className: '',
};

const assignTypeDefault = (buttonType, Element) =>
  buttonType || Element === 'button' ? 'button' : null;

const Button = ({
  as: Element,
  type,
  weight,
  icon,
  trailingIcon,
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
      {
        'rc-button-loading': loading,
        'rc-button-disabled': disabled,
        'rc-button-icon': icon,
        'rc-button-trailing-icon': trailingIcon,
        'rc-button-empty': !children,
        'rc-button-full': children,
      },
      className,
    )}
    disabled={loading || disabled}
    aria-disabled={Element !== 'button' && (loading || disabled)}
    {...rest}
  >
    {icon && (
      <Icon
        size={type === 'text' ? 'small' : 'medium'}
        type={icon}
        className="rc-button-icon-svg"
      />
    )}
    <span className="rc-button-content">{children}</span>
    {trailingIcon && (
      <Icon
        size={type === 'text' ? 'small' : 'medium'}
        type={trailingIcon}
        className="rc-button-icon-svg"
      />
    )}
    {loading && <Loading className="rc-button-loader" />}
  </Element>
);

Button.propTypes = propTypes;
Button.defaultProps = defaultProps;

export default Button;
