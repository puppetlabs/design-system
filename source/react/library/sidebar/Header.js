import React from 'react';
import PropTypes from 'prop-types';
import { ENTER_KEY_CODE } from '../../constants';
import Logo from '../logo';

const propTypes = {
  logo: PropTypes.string,
  onLogoClick: PropTypes.func,
};

const defaultProps = {
  logo: '',
  onLogoClick() {},
};

class Header extends React.Component {
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
    // this.setState({ menuOpen: false });

    if (onLogoClick) {
      onLogoClick();
    }
  }

  renderLogo() {
    const { logo } = this.props;
    let jsx;

    if (logo) {
      jsx = <Logo inverted product={logo} />;
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

Header.propTypes = propTypes;
Header.defaultProps = defaultProps;

export default Header;
