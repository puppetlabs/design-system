import React from 'react';
import PropTypes from 'prop-types';

import Button from '../buttons/Button';
import Menu from '../menu';
import Icon from '../icon/Icon';

const propTypes = {
  onLogoClick: PropTypes.func,
  onNavClick: PropTypes.func,
  logo: PropTypes.element,
  nav: PropTypes.array,
};

const defaultProps = {
  nav: [],
  onNavClick: () => {},
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
    this.setState({ menuOpen: false });

    this.props.onNavClick(key);
  }

  onMenuItemClick(option) {
    this.onNavClick(option.key);
  }

  onMenuToggle() {
    this.setState({ menuOpen: !this.state.menuOpen });
  }

  onLogoClick() {
    this.setState({ menuOpen: false });

    this.props.onLogoClick();
  }

  renderNav() {
    const navItems = this.props.nav.map(item => (
      <Button
        key={ item.key }
        size="auto"
        onClick={ () => this.onNavClick(item.key) }
        icon={ item.icon }
        transparent
      />
    ));

    return (
      <div className="rc-header-items">
        { navItems }
      </div>
    );
  }

  renderMenuControl() {
    const icon = this.state.menuOpen ? 'close' : 'list';

    return (
      <a tabIndex={ 0 } role="button" className="rc-header-menu-control" onClick={ this.onMenuToggle }>
        <Icon size="medium" type={ icon } />
      </a>
    );
  }

  renderMenu() {
    const options = this.props.nav.map(o => ({
      id: o.key,
      ...o,
    }));

    return (
      <Menu dark className="rc-header-menu" size="medium">
        <Menu.Header title="Account" onClose={ this.onMenuToggle } />
        <Menu.List options={ options } onChange={ this.onMenuItemClick } />
      </Menu>
    );
  }

  renderLogo() {
    let jsx = this.props.logo;

    if (jsx && this.props.onLogoClick) {
      jsx = (
        <a role="button" tabIndex={ 0 } onClick={ this.onLogoClick }>
          { jsx }
        </a>
      );
    }

    if (jsx) {
      jsx = (
        <div className="rc-header-logo">
          { jsx }
        </div>
      );
    }

    return jsx;
  }

  render() {
    let menu;
    const nav = this.renderNav();
    const menuControl = this.renderMenuControl();
    const logo = this.renderLogo();

    if (this.state.menuOpen) {
      menu = this.renderMenu();
    }

    return (
      <div className="rc-header-container">
        { menu }
        <div className="rc-header">
          <div className="rc-header-left">
            { logo }
          </div>
          <div className="rc-header-right">
            { nav }
            { menuControl }
          </div>
        </div>
      </div>
    );
  }
}

Header.propTypes = propTypes;
Header.defaultProps = defaultProps;

export default Header;
