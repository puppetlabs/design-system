import React from 'react';
import PropTypes from 'prop-types';

import Button from '../buttons/Button';
import logos from './logos';
import Icon from '../icon/Icon';

const propTypes = {
  product: PropTypes.oneOf(['insights']).isRequired,
  profile: PropTypes.shape({
    img: PropTypes.string,
    label: PropTypes.string,
    icon: PropTypes.string,
  }),
  onNavClick: PropTypes.func,
  nav: PropTypes.array,
};

const defaultProps = {
  nav: [],
  profile: {},
  onNavClick: () => {},
};

class Header extends React.Component {
  constructor(props) {
    super(props);

    this.onNavClick = this.onNavClick.bind(this);
    this.openMenu = this.openMenu.bind(this);

    this.state = { menuOpen: false };
  }

  onNavClick(key) {
    this.setState({ menuOpen: false });

    this.props.onNavClick(key);
  }

  openMenu() {
    this.setState({ menuOpen: !this.state.menuOpen });
  }

  renderNavItem(menu, n) {
    let button;

    if (menu) {
      button = (
        <Button
          size="small"
          onClick={ () => this.onNavClick(n.key) }
          key={ n.key }
          icon={ n.icon }
          className="rc-header-menu-item-button"
          transparent
        >
          { n.label }
        </Button>
      );
    } else {
      button = (
        <Button
          size="tiny"
          onClick={ () => this.onNavClick(n.key) }
          key={ n.key }
          icon={ n.icon }
          transparent
        />
      );
    }

    return button;
  }

  renderNav(menu) {
    const items = this.props.nav.map(n => this.renderNavItem(menu, n));

    // If we're rendering this in a menu, let's include a link for the profile.
    if (menu) {
      items.push(this.renderProfileLink(true));
    }

    return (
      <div className="rc-header-items">
        { items }
      </div>
    );
  }

  renderProfileLink(menu) {
    let jsx;

    if (menu) {
      jsx = this.renderNavItem(true, {
        key: 'profile',
        label: this.props.profile.label,
        icon: this.props.profile.icon,
      });
    } else if (this.props.profile.img) {
      jsx = (
        <img
          alt="Avatar"
          className="rc-header-avatar"
          src={ this.props.profile.img }
        />
      );
    }

    return jsx;
  }

  renderMenuControl() {
    const icon = this.state.menuOpen ? 'close' : 'list';

    return (
      <a tabIndex={ 0 } role="button" className="rc-header-menu-control" onClick={ this.openMenu }>
        <Icon width="14px" height="14px" type={ icon } />
      </a>
    );
  }

  renderMenu() {
    const nav = this.renderNav(true);

    return (
      <div className="rc-header-menu">
        { nav }
      </div>
    );
  }

  render() {
    let menu;
    const nav = this.renderNav();
    const logo = logos[this.props.product];
    const profile = this.renderProfileLink();
    const menuControl = this.renderMenuControl();

    if (this.state.menuOpen) {
      menu = this.renderMenu();
    }

    return (
      <div className="rc-header-container">
        <div className="rc-header">
          <div className="rc-header-left">
            { logo }
          </div>
          <div className="rc-header-right">
            { nav }
            { profile }
            { menuControl }
          </div>
        </div>
        { menu }
      </div>
    );
  }
}

Header.propTypes = propTypes;
Header.defaultProps = defaultProps;

export default Header;
