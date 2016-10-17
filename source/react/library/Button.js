import React from 'react';
import classnames from 'classnames';
import Icon from './Icon';

const propTypes = {
  className: React.PropTypes.string,
  size: React.PropTypes.string,
  secondary: React.PropTypes.bool,
  floating: React.PropTypes.bool,
  disabled: React.PropTypes.bool,
  processing: React.PropTypes.bool,
  block: React.PropTypes.bool,
  onClick: React.PropTypes.func,
  label: React.PropTypes.string,
  type: React.PropTypes.string,
  href: React.PropTypes.string,
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
      disabled,
      processing,
      block,
      size,
      href,
      className,
      floating,
    } = this.props;
    let button;

    const cssClass = classnames(className, 'rc-button', {
      'rc-button-block': block,
      'rc-button-processing': processing,
      'rc-floating-action-button': floating,
      [`rc-button-${size}`]: size,
      secondary,
    });

    const btnProps = {
      type,
      href,
      disabled,
      onClick: this.onClick,
      className: cssClass,
    };

    const content = <span className="rc-button-content">{ children || label }</span>;
    const loader = processing ? <Icon height="100%" width="100%" type="loader" /> : null;

    if (type) {
      button = <button { ...btnProps }>{ content }{ loader }</button>;
    } else {
      button = <a { ...btnProps }>{ content }{ loader }</a>;
    }

    return button;
  }
}

Button.propTypes = propTypes;

export default Button;
