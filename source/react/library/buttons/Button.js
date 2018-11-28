import PropTypes from 'prop-types';
import React from 'react';
import classnames from 'classnames';
import Icon from '../icon/Icon';
import { TooltipStickyArea } from '../tooltips/Tooltip';

const propTypes = {
  className: PropTypes.string,
  size: PropTypes.oneOf(['tiny', 'small', 'medium', 'large', 'auto', null]),
  simple: PropTypes.bool,
  secondary: PropTypes.bool,
  transparent: PropTypes.bool,
  icon: PropTypes.string,
  floating: PropTypes.bool,
  disabled: PropTypes.bool,
  processing: PropTypes.bool,
  /** Badge can signify an that the button is "applied" */
  badge: PropTypes.bool,
  block: PropTypes.bool,
  /** onClick is called with the click event */
  onClick: PropTypes.func,
  /** label can be used in place of children */
  label: PropTypes.string,
  type: PropTypes.string,
  href: PropTypes.string,
  round: PropTypes.bool,
  square: PropTypes.bool,
  nowrap: PropTypes.bool,
  dropdown: PropTypes.bool,
  error: PropTypes.bool,
  message: PropTypes.string,
  children: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
  as: PropTypes.oneOfType([PropTypes.string, PropTypes.func]),
};

const defaultProps = {
  className: '',
  size: null,
  secondary: false,
  simple: false,
  transparent: false,
  icon: null,
  floating: false,
  disabled: false,
  processing: false,
  badge: false,
  block: false,
  onClick: null,
  label: '',
  type: null,
  href: null,
  round: false,
  square: false,
  nowrap: false,
  message: '',
  error: false,
  dropdown: false,
  children: '',
  as: 'button',
};

/**
 * `Button` is a generalized component for rendering buttons. They can be used
 * in different contexts, such as within a `SplitButton` or `ButtonGroup`. By
 * default, it renders a `<button type="button">` element, but `type="submit"`
 * can be passed to trigger the containing form's submit handler, and the `as` prop
 * can be used to render a different element or component, such as with an `a`
 * element or React Router's `Link` component:
 * ```jsx
 * <Button as="a" href="http://puppet.com">Puppet</Button>
 * ```
 * ```jsx
 * <Button as={Link} to="/home">Home</Button>
 * ```
 */
class Button extends React.Component {
  constructor(props) {
    super(props);

    this.onClick = this.onClick.bind(this);
  }

  componentDidMount() {
    this.forceUpdate();
  }

  onClick(e) {
    const { disabled, processing, onClick } = this.props;
    if (disabled || processing) {
      e.preventDefault();
    } else if (onClick) {
      onClick(e);
    }
  }

  render() {
    const {
      children,
      label,
      type,
      secondary,
      simple,
      transparent,
      disabled,
      processing,
      block,
      badge,
      size,
      href,
      error,
      message,
      className,
      floating,
      round,
      square,
      nowrap,
      dropdown: dropdownProp,
      icon: propIcon,
      as: Component,
      ...otherProps
    } = this.props;

    // Deleting this as otherProps gets splatted onto dom elements which don't recognize isOpened as
    // a valid attribute
    delete otherProps.isOpened;

    let button;
    let content;
    let icon;
    let dropdown;

    const cssClass = classnames(className, 'rc-button', {
      'rc-button-simple': simple,
      'rc-button-block': block,
      'rc-button-processing': processing,
      'rc-floating-action-button': floating,
      'rc-button-badged': badge && !disabled,
      'rc-button-error': error,
      'rc-button-primary': !secondary && !transparent,
      'rc-button-secondary': secondary,
      'rc-button-transparent': transparent,
      [`rc-button-${size}`]: size,
      'rc-button-round': round,
      'rc-button-square': square,
      'rc-button-nowrap': nowrap,
    });

    const btnProps = {
      // Default `type` to "button" (instead of "submit") unless `as` is specified
      type: !type && Component === 'button' ? 'button' : type,
      href,
      disabled,
      'aria-disabled': Component === 'button' || !disabled ? null : disabled,
      tabIndex: disabled ? -1 : null,
      ref: b => {
        this.button = b;
      },
      className: cssClass,
    };

    const loader = processing ? (
      <Icon height="75%" width="100%" type="loader" />
    ) : null;

    if (children || label) {
      content = <span className="rc-button-content">{children || label}</span>;
    }

    if (propIcon || floating) {
      const iconSize = simple ? '8px' : '16px';
      const iconType = !propIcon && floating ? 'plus' : propIcon;

      icon = <Icon height={iconSize} width={iconSize} type={iconType} />;
    }

    if (dropdownProp && !processing) {
      const iconSize = '10px';

      dropdown = (
        <span className="rc-button-dropdown-icon">
          <Icon height={iconSize} width={iconSize} type="chevron-down" />
        </span>
      );
    }

    button = (
      <Component {...btnProps} {...otherProps} onClick={this.onClick}>
        {icon} {content} {dropdown} {loader}
      </Component>
    );

    if (message) {
      button = (
        <TooltipStickyArea anchor="bottom" tooltip={message}>
          {button}
        </TooltipStickyArea>
      );
    }

    return button;
  }
}

Button.propTypes = propTypes;
Button.defaultProps = defaultProps;

export default Button;
