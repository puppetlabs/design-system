import React from 'react';
import PropTypes from 'prop-types';
import { ENTER_KEY_CODE } from '../../constants';
import Logo from '../logo';

const propTypes = {
  minimized: PropTypes.bool,
  logo: PropTypes.string,
  onClick: PropTypes.func,
};

const defaultProps = {
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
      jsx = <Logo inverted product={logo} type={minimized ? 'bug' : 'full'} />;
    }

    return jsx;
  }

  render() {
    const { onClick } = this.props;
    const logo = this.renderLogo();
    let Component = 'div';
    let jsx;

    if (logo) {
      if (onClick) {
        Component = 'button';
      }

      jsx = <Component className="rc-sidebar-logo">{logo}</Component>;
    }

    return jsx;
  }
}

SidebarHeader.propTypes = propTypes;
SidebarHeader.defaultProps = defaultProps;

export default SidebarHeader;
