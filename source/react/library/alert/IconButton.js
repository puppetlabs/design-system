import React, { forwardRef } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { renderableElement } from '../../helpers/customPropTypes';
import Icon, { AVAILABLE_ICONS } from '../icon/Icon';
import Loading from '../loading/Loading';

const propTypes = {
  /** React component / element to render. Useful in cases where a button is used for navigation, so that it can be rendered as an anchor tag with the same styling */
  as: renderableElement,
  /** Main visual variant */
  type: PropTypes.oneOf(['neutral', 'info', 'danger', 'success', 'warning']),
  /** Icon to be rendered instead of button */
  icon: PropTypes.oneOf(AVAILABLE_ICONS),
  size: PropTypes.oneOf(['medium']),
  /** Is the button disabled?  */
  disabled: PropTypes.bool,
  /** If true, button will render with a loading spinner */
  loading: PropTypes.bool,
  /** Optional html button type override */
  buttonType: PropTypes.oneOf(['button', 'submit', 'reset']),
  /** Optional additional className. */
  className: PropTypes.string,
  /** Optional additional inline styles. */
  styles: PropTypes.string,
};

const defaultProps = {
  as: 'button',
  type: 'info',
  icon: null,
  size: 'medium',
  disabled: false,
  loading: false,
  buttonType: undefined,
  className: '',
  styles: {},
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

const IconButton = forwardRef(
  (
    {
      as: Element,
      type,
      icon,
      size,
      disabled,
      loading,
      buttonType,
      className,
      ...rest
    },
    ref,
  ) => (
    <Element
      ref={ref}
      type={assignTypeDefault(buttonType, Element)}
      className={classNames(
        'rc-icon-button',
        `rc-icon-button-${type}`,
        {
          'rc-icon-button-loading': loading,
          'rc-icon-button-disabled': disabled,
        },
        className,
      )}
      disabled={loading || disabled}
      aria-disabled={Element !== 'button' && (loading || disabled)}
      aria-label={icon}
      role="button"
      tabIndex={0}
      {...rest}
    >
      {icon && (
        <Icon size={size} type={icon} className="rc-icon-button-icon-svg" />
      )}
      {loading && <Loading className="rc-icon-button-loader" />}
    </Element>
  ),
);

/**
 * This is a readability improvement for devTools to account for the new use
 * of forwardRef(). Without this, a button's display name is 'ForwardRef(IconButton)'
 */
IconButton.displayName = 'IconButton';

IconButton.propTypes = propTypes;
IconButton.defaultProps = defaultProps;

export default IconButton;
