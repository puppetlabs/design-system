import React from 'react';
import PropTypes from 'prop-types';
import { ENTER_KEY_CODE } from '../../constants';
import Logo from '../logo';

const propTypes = {
  minimized: PropTypes.bool,
  logo: PropTypes.string,
  onLogoClick: PropTypes.func,
};

const defaultProps = {
  minimized: false,
  logo: '',
  onLogoClick() {},
};

class SidebarHeader extends React.Component {
  constructor(props) {
    super(props);

    this.onLogoKeyPress = this.onLogoKeyPress.bind(this);
    this.onLogoClick = this.onLogoClick.bind(this);
  }

  onLogoKeyPress(e) {
    if (e.keyCode === ENTER_KEY_CODE) {
      this.onLogoClick();
    }
  }

  onLogoClick() {
    const { onLogoClick } = this.props;

    if (onLogoClick) {
      onLogoClick();
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
    const { onLogoClick } = this.props;
    const logo = this.renderLogo();
    let jsx = logo;

    if (jsx && onLogoClick) {
      jsx = (
        <div
          role="button"
          tabIndex={0}
          onClick={this.onLogoClick}
          onKeyDown={this.onLogoKeyPress}
        >
          <span className="rc-visually-hidden">Home</span>
          {jsx}
        </div>
      );
    }

    if (jsx) {
      jsx = <div className="rc-sidebar-logo">{jsx}</div>;
    }

    return jsx;
  }
}

SidebarHeader.propTypes = propTypes;
SidebarHeader.defaultProps = defaultProps;

export default SidebarHeader;
