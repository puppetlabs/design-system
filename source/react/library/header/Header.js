import React from 'react';
import PropTypes from 'prop-types';

import Button from '../buttons/Button';
import Menu from '../menu';
import Icon from '../icon/Icon';

const propTypes = {
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

    this.onMenuToggle = this.onMenuToggle.bind(this);
    this.onNavClick = this.onNavClick.bind(this);
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

  renderNav() {
    const navItems = this.props.nav.map(item => (
      <Button
        key={ item.key }
        size="tiny"
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
        <Icon width="14px" height="14px" type={ icon } />
      </a>
    );
  }

  renderMenu() {
    const options = this.props.nav.map(o => ({
      id: o.key,
      ...o,
    }));

    return (
      <Menu className="rc-header-menu" size="medium">
        <Menu.Header title="Account" onClose={ this.onMenuToggle } />
        <Menu.List options={ options } onChange={ this.onMenuItemClick } />
      </Menu>
    );
  }

  render() {
    let menu;
    const nav = this.renderNav();
    const menuControl = this.renderMenuControl();

    if (this.state.menuOpen) {
      menu = this.renderMenu();
    }

    return (
      <div className="rc-header-container">
        { menu }
        <div className="rc-header">
          <div className="rc-header-left">
            { this.props.logo }
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
