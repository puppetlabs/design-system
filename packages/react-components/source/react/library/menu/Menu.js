import React, { useState } from 'react';
import PropTypes from 'prop-types';
import useMenuActions from '../../helpers/useMenuActions';
import MenuContext from './context';
import Trigger from './Trigger';
import Container from './Container';
import asMenuItem from '../../helpers/asMenuItem';
import SearchMenu from '../../internal/popup-menus/search-menu';

const MenuPropTypes = {
  className: PropTypes.string,
  children: PropTypes.node,
};

const MenuDefaultProps = {
  className: '',
  children: null,
};

const Menu = ({ children, ...popperOptions }) => {
  const [isOpen, setIsOpen] = useState(false);

  const closeMenu = () => setIsOpen(false);
  const openMenu = () => setIsOpen(true);

  const menuState = useMenuActions(popperOptions);
  return (
    <MenuContext.Provider value={{ ...menuState, isOpen, closeMenu, openMenu }}>
      {children}
    </MenuContext.Provider>
  );
};

Menu.propTypes = MenuPropTypes;
Menu.defaultProps = MenuDefaultProps;

Menu.Trigger = Trigger;
Menu.Container = Container;
Menu.SearchMenu = SearchMenu;
Menu.Item = asMenuItem;

export default Menu;
