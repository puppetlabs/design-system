import React from 'react';
import PropTypes from 'prop-types';

import Button from '../buttons/Button';
import Menu from '../menu';
import Icon from '../icon/Icon';

const propTypes = {
  onLogoClick: PropTypes.func,
  onNavClick: PropTypes.func,
  logo: PropTypes.element,
  nav: PropTypes.arrayOf(
    PropTypes.shape({
      key: PropTypes.any,
    }),
  ),
};

const defaultProps = {
  nav: [],
  onNavClick: () => {},
  logo: undefined,
  onLogoClick: undefined,
};

class Header extends React.Component {
  constructor(props) {
    super(props);

    this.onNavClick = this.onNavClick.bind(this);
    this.onLogoClick = this.onLogoClick.bind(this);
    this.onMenuToggle = this.onMenuToggle.bind(this);
    this.onMenuItemClick = this.onMenuItemClick.bind(this);

    this.state = { menuOpen: false };
  }

  onNavClick(key) {
    const { onNavClick } = this.props;
    this.setState({ menuOpen: false });

    onNavClick(key);
  }

  onMenuItemClick(option) {
    this.onNavClick(option.key);
  }

  onMenuToggle() {
    this.setState(state => ({ menuOpen: !state.menuOpen }));
  }

  onLogoClick() {
    const { onLogoClick } = this.props;
    this.setState({ menuOpen: false });

    if (onLogoClick) {
      onLogoClick();
    }
  }

  renderNav() {
    const { nav } = this.props;
    const navItems = nav.map(item => (
      <Button
        key={item.key}
        onClick={() => this.onNavClick(item.key)}
        icon={item.icon}
        type="transparent"
      />
    ));

    return <div className="rc-header-items">{navItems}</div>;
  }

  renderMenuControl() {
    const { menuOpen } = this.state;
    const icon = menuOpen ? 'close' : 'list';

    // TODO: This should render a button element or an anchor if its for navigation
    /* eslint-disable jsx-a11y/click-events-have-key-events */
    /* eslint-disable jsx-a11y/anchor-is-valid */
    return (
      <a
        tabIndex={0}
        role="button"
        className="rc-header-menu-control"
        onClick={this.onMenuToggle}
      >
        <Icon size="medium" type={icon} />
      </a>
    );
    /* eslint-enable */
  }

  renderMenu() {
    const { nav } = this.props;
    const options = nav.map(o => ({
      id: o.key,
      ...o,
    }));

    return (
      <Menu dark className="rc-header-menu" size="medium">
        <Menu.Header title="Account" onClose={this.onMenuToggle} />
        <Menu.List options={options} onChange={this.onMenuItemClick} />
      </Menu>
    );
  }

  renderLogo() {
    const { logo, onLogoClick } = this.props;
    let jsx = logo;

    // TODO: This should render a button element or an anchor if its for navigation
    /* eslint-disable jsx-a11y/click-events-have-key-events */
    /* eslint-disable jsx-a11y/anchor-is-valid */
    if (jsx && onLogoClick) {
      jsx = (
        <a role="button" tabIndex={0} onClick={this.onLogoClick}>
          {jsx}
        </a>
      );
    }
    /* eslint-enable */

    if (jsx) {
      jsx = <div className="rc-header-logo">{jsx}</div>;
    }

    return jsx;
  }

  render() {
    const { menuOpen } = this.state;
    let menu;
    const nav = this.renderNav();
    const menuControl = this.renderMenuControl();
    const logo = this.renderLogo();

    if (menuOpen) {
      menu = this.renderMenu();
    }

    return (
      <div className="rc-header-container">
        {menu}
        <div className="rc-header">
          <div className="rc-header-left">{logo}</div>
          <div className="rc-header-right">
            {nav}
            {menuControl}
          </div>
        </div>
      </div>
    );
  }
}

Header.propTypes = propTypes;
Header.defaultProps = defaultProps;

export default Header;
