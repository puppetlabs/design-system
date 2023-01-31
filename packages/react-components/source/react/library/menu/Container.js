import React, { useContext, useEffect } from 'react';
import PropTypes from 'prop-types';
import { has } from 'lodash';
import classNames from 'classnames';
import MenuContext from './context';
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
  onBlur: PropTypes.func,
  onEscape: PropTypes.func,
  onClose: PropTypes.func,
};
const MenuDefaultProps = {
  as: 'div',
  asPortal: true,
  className: '',
  children: null,
  arrow: false,
  style: {},
  open: false,
  closeOnBlur: true,
  onBlur: undefined,
  onEscape: undefined,
  onClose: undefined,
};
const Menu = ({
  as: Element,
  asPortal = true,
  className,
  children,
  arrow = false,
  style,
  open = false,
  closeOnBlur = true,
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
  } = useContext(MenuContext);

  const ref = has(Element.propTypes || {}, 'inputRef')
    ? { inputRef: menuRef }
    : { ref: menuRef };

  const close = () => {
    closeMenu();
    if (onClose) onClose();
  };
  // Handle click outside, escape, or onBlur events
  useEffect(() => {
    const handleClickOutside = event => {
      const menu = document.getElementById(menuId);
      if (!menu || (!menu.contains(event.target) && closeOnBlur)) {
        if (onBlur) onBlur();
        closeMenu();
      }
    };

    const handleEscape = event => {
      const escapeFunc = onEscape;
      if (escapeFunc && event.keyCode === ESC_KEY_CODE) {
        escapeFunc();
        closeMenu();
      }
    };

    document.addEventListener('keydown', handleEscape, true);
    document.addEventListener('click', handleClickOutside, true);
    return () => {
      document.removeEventListener('keydown', handleEscape, true);
      document.removeEventListener('click', handleClickOutside, true);
      close();
    };
  }, [onBlur]);

  if (!open || !isOpen) return null;
  return (
    <Portal active={asPortal} target="popup-menu">
      <FocusContext>
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
Menu.defaultProps = MenuDefaultProps;
Menu.propTypes = MenuPropTypes;

export default Menu;
