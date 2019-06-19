import React, { forwardRef } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { renderableElement } from '../../helpers/customPropTypes';
import Icon, { AVAILABLE_ICONS } from '../icon/Icon';
import Loading from '../loading/Loading';

const propTypes = {
  /** React component / element to render. Useful in cases where a button is used for navigation, so that it can be rendered as an anchor tag with the same styling */
  as: renderableElement,
  /** Prop to use for a `ref` passed to the inner element. */
  forwardRefAs: PropTypes.string,
  /** Main visual variant */
  type: PropTypes.oneOf([
    'primary',
    'secondary',
    'tertiary',
    'danger',
    'transparent',
    'text',
  ]),
  /** Additional property used for connotative variants (such as danger) to choose between a strong and soft version */
  weight: PropTypes.oneOf(['bold', 'subtle']),
  /** Optional icon to be rendered instead of / in addition to button text. If both an icon and text are present, the icon will be rendered before the text */
  icon: PropTypes.oneOf(AVAILABLE_ICONS),
  /** Button text or other content */
  children: PropTypes.node,
  /** Optional trailing icon rendered after button text. For icon-only buttons, please use the 'icon' prop instead */
  trailingIcon: PropTypes.oneOf(AVAILABLE_ICONS),
  /** Is the button disabled?  */
  disabled: PropTypes.bool,
  /** If true, button will render with a loading spinner */
  loading: PropTypes.bool,
  /** Optional html button type override */
  buttonType: PropTypes.oneOf(['button', 'submit', 'reset']),
  /** Optional additional className. Additionally, all other props are propagated directly to the inner element */
  className: PropTypes.string,
};

const defaultProps = {
  as: 'button',
  forwardRefAs: 'ref',
  type: 'primary',
  weight: 'bold',
  children: null,
  icon: null,
  trailingIcon: null,
  loading: false,
  disabled: false,
  buttonType: undefined,
  className: '',
};

/**
 * We want to assign the default 'type' attribute diferently depending
 * on the underling element being rendered. If the element is a button,
 * type should default to 'button', otherwise null
 */
const assignTypeDefault = (buttonType, Element) => {
  if (buttonType) {
    return buttonType;
  }

  if (Element === 'button') {
    return 'button';
  }

  return null;
};

const Button = forwardRef(
  (
    {
      as: Element,
      forwardRefAs,
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
    },
    ref,
  ) => (
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
      aria-disabled={Element === 'button' ? undefined : loading || disabled}
      aria-label={children || icon || trailingIcon}
      {...{
        [forwardRefAs]: ref,
      }}
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
  ),
);

Button.propTypes = propTypes;
Button.defaultProps = defaultProps;

/**
 * This is a readability improvement for devTools to account for the new use
 * of forwardRef(). Without this, a button's display name is 'ForwardRef(Button)'
 */
Button.displayName = 'Button';

export default Button;
