import React from 'react';
import classnames from 'classnames';
import Icon from './Icon';

const propTypes = {
  className: React.PropTypes.string,
  size: React.PropTypes.string,
  secondary: React.PropTypes.bool,
  transparent: React.PropTypes.bool,
  icon: React.PropTypes.string,
  floating: React.PropTypes.bool,
  disabled: React.PropTypes.bool,
  processing: React.PropTypes.bool,
  block: React.PropTypes.bool,
  onClick: React.PropTypes.func,
  label: React.PropTypes.string,
  type: React.PropTypes.string,
  href: React.PropTypes.string,
  round: React.PropTypes.bool,
  dropdownMenu: React.PropTypes.object,
  children: React.PropTypes.oneOfType([
    React.PropTypes.string,
    React.PropTypes.element,
  ]),
};

class Button extends React.Component {
  constructor(props) {
    super(props);

    this.onClick = this.onClick.bind(this);
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
      size,
      href,
      className,
      floating,
      dropdownMenu,
      round,
    } = this.props;

    let button;
    let content;
    let icon;

    const cssClass = classnames(className, 'rc-button', {
      'rc-button-block': block,
      'rc-button-processing': processing,
      'rc-floating-action-button': floating,
      'rc-button-secondary': secondary,
      'rc-button-transparent': transparent,
      'rc-button-split': dropdownMenu,
      [`rc-button-${size}`]: size,
      'rc-button-round': round,
    });

    const btnProps = {
      type,
      href,
      disabled,
      onClick: this.onClick,
      className: cssClass,
    };

    const loader = processing ? <Icon height="100%" width="100%" type="loader" /> : null;

    if (children || label) {
      content = <span className="rc-button-content">{ children || label }</span>;
    }

    if (this.props.icon) {
      const iconSize = size === 'small' || size === 'tiny' ? '15px' : '20px';

      icon = <Icon height={ iconSize } width={ iconSize } type={ this.props.icon } />;
    }

    if (type) {
      button = <button { ...btnProps }>{ icon } { content }{ loader }{ dropdownMenu }</button>;
    } else {
      button = <a { ...btnProps }>{ icon } { content }{ loader }{ dropdownMenu }</a>;
    }

    return button;
  }
}

Button.propTypes = propTypes;

export default Button;
