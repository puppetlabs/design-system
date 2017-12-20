import React from 'react';
import classnames from 'classnames';
import Icon from './Icon';
import { TooltipStickyArea } from './tooltips/Tooltip';

const propTypes = {
  className: React.PropTypes.string,
  size: React.PropTypes.oneOf(['tiny', 'small', 'large', 'auto', null]),
  secondary: React.PropTypes.bool,
  transparent: React.PropTypes.bool,
  icon: React.PropTypes.string,
  floating: React.PropTypes.bool,
  disabled: React.PropTypes.bool,
  processing: React.PropTypes.bool,
  /** Badge can signify an that the button is "applied" */
  badge: React.PropTypes.bool,
  block: React.PropTypes.bool,
  /** onClick is called with the click event */
  onClick: React.PropTypes.func,
  /** label can be used in place of children */
  label: React.PropTypes.string,
  type: React.PropTypes.string,
  href: React.PropTypes.string,
  round: React.PropTypes.bool,
  message: React.PropTypes.string,
  dropdown: React.PropTypes.bool,
  error: React.PropTypes.string,
  children: React.PropTypes.oneOfType([
    React.PropTypes.string,
    React.PropTypes.element,
  ]),
};

const defaultProps = {
  className: '',
  size: null,
  secondary: false,
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
  message: '',
  error: '',
  dropdown: false,
  children: '',
};

/**
 * `Button` is a generalized component we use for rendering buttons. They can be used in different
 * contexts, such as within a `SplitButton` or `ButtonGroup`.
 *
 * @example ../../../docs/Button.md
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
    if (this.props.disabled) {
      e.preventDefault();
    } else if (this.props.onClick) {
      this.props.onClick(e);
    }
  }

  render() {
    const {
      children,
      label,
      type,
      secondary,
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
    } = this.props;

    let button;
    let content;
    let icon;
    let dropdown;

    const cssClass = classnames(className, 'rc-button', {
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
    });

    const btnProps = {
      type,
      href,
      disabled,
      onClick: this.onClick,
      ref: (b) => { this.button = b; },
      className: cssClass,
    };

    const loader = processing ? <Icon height="75%" width="100%" type="loader" /> : null;

    if (children || label) {
      content = <span className="rc-button-content">{ children || label }</span>;
    }

    if (this.props.icon || floating) {
      const iconSize = '16px';
      const iconType = floating ? 'plus' : this.props.icon;

      icon = <Icon height={ iconSize } width={ iconSize } type={ iconType } />;
    }

    if (this.props.dropdown) {
      const iconSize = '10px';

      dropdown = (
        <span className="rc-button-dropdown-icon">
          <Icon height={ iconSize } width={ iconSize } type="chevron-down" />
        </span>
      );
    }

    if (type) {
      button = <button { ...btnProps }>{ icon } { content } { dropdown } { loader }</button>;
    } else {
      button = <a { ...btnProps }>{ icon } { content } { dropdown } { loader }</a>;
    }

    if (message) {
      button = (
        <TooltipStickyArea anchor="bottom" tooltip={ message }>
          { button }
        </TooltipStickyArea>
      );
    }

    return button;
  }
}

Button.propTypes = propTypes;
Button.defaultProps = defaultProps;

export default Button;
