import React, { useState } from 'react';
import PropTypes from 'prop-types';
import useMenu from '../../helpers/useMenu';
import MenuContext from '../../internal/popup-menus/menu-context';
import Trigger from './Trigger';
import MenuContainer from './Container';
import asFocusItem from '../../helpers/asFocusItem';
import SearchMenu from '../../internal/popup-menus/search-menu';

const MenuPropTypes = {
  /** Can be any component(s), but is meant to be the `Menu.Trigger` & `Menu.Container` components */
  children: PropTypes.node,
};

const MenuDefaultProps = {
  children: null,
};

const Menu = ({ children, ...popperOptions }) => {
  const [isOpen, setIsOpen] = useState(false);

  const closeMenu = () => setIsOpen(false);
  const openMenu = () => setIsOpen(true);

  const menuState = useMenu({ popperOptions });
  return (
    // eslint-disable-next-line react/jsx-no-constructed-context-values
    <MenuContext.Provider value={{ ...menuState, isOpen, closeMenu, openMenu }}>
      {children}
    </MenuContext.Provider>
  );
};

Menu.propTypes = MenuPropTypes;
Menu.defaultProps = MenuDefaultProps;

Menu.Trigger = Trigger;
Menu.Container = MenuContainer;
Menu.Item = asFocusItem;

// Ideally, we keep extending the Menu component with other menu types
Menu.SearchMenu = SearchMenu;

export default Menu;
