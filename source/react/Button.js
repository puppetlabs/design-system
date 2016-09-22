import React from 'React';
import classnames from 'classnames';

const propTypes = {
  className: React.PropTypes.string,
  secondary: React.PropTypes.bool,
  floating: React.PropTypes.bool,
  disabled: React.PropTypes.bool,
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
    const { children, label, type, secondary, disabled, href, className, floating } = this.props;
    let cssClass = 'rui-button';
    let button;

    cssClass = classnames(className, cssClass, {
      'rui-floating-action-button': floating,
      secondary,
    });

    const btnProps = {
      type,
      href,
      disabled,
      onClick: this.onClick,
      className: cssClass,
    };

    const content = children || label;

    if (type) {
      button = <button { ...btnProps }>{ content }</button>;
    } else {
      button = <a { ...btnProps }>{ content }</a>;
    }

    return button;
  }
}

Button.propTypes = propTypes;

export default Button;
