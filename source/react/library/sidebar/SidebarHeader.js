import React from 'react';
import PropTypes from 'prop-types';
import { ENTER_KEY_CODE } from '../../constants';
import Logo from '../logo';

const propTypes = {
  as: PropTypes.oneOfType([PropTypes.string, PropTypes.func]),
  to: PropTypes.string,
  minimized: PropTypes.bool,
  logo: PropTypes.string,
  onClick: PropTypes.func,
};

const defaultProps = {
  as: 'button',
  to: null,
  minimized: false,
  logo: '',
  onClick() {},
};

class SidebarHeader extends React.Component {
  constructor(props) {
    super(props);

    this.onLogoKeyPress = this.onLogoKeyPress.bind(this);
    this.onClick = this.onClick.bind(this);
  }

  onLogoKeyPress(e) {
    if (e.keyCode === ENTER_KEY_CODE) {
      this.onClick();
    }
  }

  onClick() {
    const { onClick } = this.props;

    if (onClick) {
      onClick();
    }
  }

  renderLogo() {
    const { logo, minimized } = this.props;
    let jsx;

    if (logo) {
      jsx = (
        <Logo
          inverted
          expanded
          product={logo}
          type={minimized ? 'bug' : 'full'}
        />
      );
    }

    return jsx;
  }

  render() {
    const { as, to, onClick } = this.props;
    const logo = this.renderLogo();
    const Component = as;
    let componentProps;

    if (to) {
      componentProps = { to };
    } else if (onClick) {
      componentProps = { onClick };
    }

    return (
      <Component className="rc-sidebar-header" {...componentProps}>
        {logo}
      </Component>
    );
  }
}

SidebarHeader.propTypes = propTypes;
SidebarHeader.defaultProps = defaultProps;

export default SidebarHeader;
