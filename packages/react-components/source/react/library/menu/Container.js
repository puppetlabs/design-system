import React, { useContext, useEffect } from 'react';
import PropTypes from 'prop-types';
import { has } from 'lodash';
import classNames from 'classnames';
import MenuContext from '../../internal/popup-menus/menu-context';
import Arrow from './Arrow';
import { ESC_KEY_CODE } from '../../constants';
import Portal from '../portal';
import FocusContext from '../../helpers/useRovingFocus';

const MenuPropTypes = {
  as: PropTypes.oneOfType([PropTypes.string, PropTypes.func]),
  asPortal: PropTypes.bool,
  className: PropTypes.string,
  children: PropTypes.node,
  arrow: PropTypes.bool,
  style: PropTypes.shape({}),
  open: PropTypes.bool,
  closeOnBlur: PropTypes.bool,
  closeOnEscape: PropTypes.bool,
  closeOnSelect: PropTypes.bool,
  onBlur: PropTypes.func,
  onEscape: PropTypes.func,
  onClose: PropTypes.func,
  setFocusOnOpen: PropTypes.bool,
};

const MenuDefaultProps = {
  as: 'div',
  asPortal: true,
  className: '',
  children: null,
  arrow: false,
  style: {},
  open: null,
  closeOnBlur: true,
  closeOnEscape: true,
  closeOnSelect: true,
  onBlur: undefined,
  onEscape: undefined,
  onClose: undefined,
  setFocusOnOpen: true,
};

const MenuContainer = ({
  as: Element,
  asPortal,
  className,
  children,
  arrow,
  style,
  open,
  closeOnBlur,
  closeOnEscape,
  closeOnSelect,
  setFocusOnOpen,
  onBlur,
  onClose,
  onEscape,
  ...props
}) => {
  const {
    menuRef,
    arrowRef,
    attributes,
    menuId,
    styles,
    isOpen,
    closeMenu,
    openMenu,
    setCloseOnSelect,
    closeOnSelect: closeOnSelectProvider,
  } = useContext(MenuContext);

  const hideMenu = !isOpen || open === false;
  const ref = has(Element.propTypes || {}, 'inputRef')
    ? { inputRef: menuRef }
    : { ref: menuRef };

  const close = () => {
    closeMenu();
    if (onClose) onClose();
  };

  useEffect(() => {
    // Handle click outside, select, or blur events
    const handleClick = (event) => {
      const menu = document.getElementById(menuId);
      if (!hideMenu && !menu.contains(event.target) && closeOnBlur) {
        if (onBlur) onBlur();
        close();
      }
    };

    // Handle escape events
    const handleKeyDown = (event) => {
      const escapeFunc = onEscape;
      if (!hideMenu && closeOnEscape && event.keyCode === ESC_KEY_CODE) {
        if (escapeFunc) escapeFunc();
        close();
      }
    };

    document.addEventListener('keydown', handleKeyDown, true);
    document.addEventListener('click', handleClick, true);
    return () => {
      document.removeEventListener('keydown', handleKeyDown, true);
      document.removeEventListener('click', handleClick, true);
    };
  }, [onBlur, onEscape, closeOnBlur, closeOnEscape, closeOnSelect, hideMenu]);

  // Control internal open state from 'open' prop if provided
  useEffect(() => {
    if (open === false && isOpen) close();
    if (open && !isOpen) {
      openMenu();
    }
  }, [open, isOpen]);

  useEffect(() => {
    if (closeOnSelect !== closeOnSelectProvider) {
      setCloseOnSelect(closeOnSelect);
    }
  }, [closeOnSelect]);

  if (hideMenu) return null;
  return (
    <Portal active={asPortal} target="popup-menu">
      <FocusContext setFocusOnOpen={setFocusOnOpen}>
        <Element
          {...ref}
          {...props}
          {...attributes.popper}
          id={menuId}
          style={{ ...style, ...styles.popper }}
          className={classNames('rc-popup-menu', className)}
        >
          {arrow && (
            <Arrow
              arrowRef={arrowRef}
              attributes={attributes.arrow}
              style={styles.arrow}
              className={`${className}-menu-arrow`}
            />
          )}
          {children}
        </Element>
      </FocusContext>
    </Portal>
  );
};
MenuContainer.defaultProps = MenuDefaultProps;
MenuContainer.propTypes = MenuPropTypes;

export default MenuContainer;
