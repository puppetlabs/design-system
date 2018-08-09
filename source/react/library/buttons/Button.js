import PropTypes from 'prop-types';
import React from 'react';
import classnames from 'classnames';
import Icon from '../icon/Icon';
import { TooltipStickyArea } from '../tooltips/Tooltip';

const propTypes = {
  className: PropTypes.string,
  size: PropTypes.oneOf(['tiny', 'small', 'large', 'auto', null]),
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
  dropdown: PropTypes.bool,
  error: PropTypes.bool,
  message: PropTypes.string,
  children: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.element,
  ]),
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
  message: '',
  error: false,
  dropdown: false,
  children: '',
};

/**
 * `Button` is a generalized component we use for rendering buttons. They can be used in different
 * contexts, such as within a `SplitButton` or `ButtonGroup`.
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
    if (this.props.disabled || this.props.processing) {
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
    } = this.props;

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

    if (this.props.icon) {
      const iconSize = simple ? '8px' : '16px';

      icon = <Icon height={ iconSize } width={ iconSize } type={ this.props.icon } />;
    }

    if (this.props.dropdown && !this.props.processing) {
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
