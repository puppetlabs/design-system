import React, {
  useEffect,
  useRef,
  useContext,
  useState,
  useCallback,
} from 'react';
import classNames from 'classnames';
import { RovingFocusContext, getTabIndexId } from './useRovingFocus';
import MenuContext from '../internal/popup-menus/menu-context';
import { ENTER_KEY_CODE } from '../constants';

/**
 * @description HOC that adds roving focus to a component. Meant to be used with the RovingFocusProvider, it wraps the menu item component and adds the necessary props and event handlers to make it focusable, keeping the focus order according to it's visual position on the page.
 * @param {ReactComponent} WrappedComponent - The React component to wrap. Button, Checkbox, Link, etc.
 * @note The wrapped component must accept an inputRef prop and forward it to the element that should be focused.
 * @returns {
 * RovingFocusContext.Consumer > MenuItemHOC(WrappedComponent)}
 */
const asFocusItem = WrappedComponent => {
  // Wrap the component in a providers that uses the context props
  const MenuItem = componentProps => {
    const { closeMenu, closeOnSelect } = useContext(MenuContext);
    const {
      currentFocus,
      setFocus,
      addTarget,
      removeTarget,
      indexes,
    } = useContext(RovingFocusContext);

    const [ref, setRef] = useState(null);
    const { current: id } = useRef(getTabIndexId(componentProps));
    const [position, setPosition] = useState(null);
    const index = indexes[id];
    const focus = index === currentFocus;

    const setRefNode = useCallback(
      node => {
        setRef(node);
        if (node) {
          setPosition(node.getBoundingClientRect());
        }
      },
      [currentFocus, focus],
    );

    useEffect(() => {
      const node = { id };
      // Register the node position on the page
      if (position) {
        node.x = position.x;
        node.y = position.y;
        addTarget(node);
      }
      return () => removeTarget(node);
    }, [position]);

    useEffect(() => {
      if (focus && ref) {
        // Move element into view when it is focused and apply focus styles
        ref.className = classNames(ref.className, { focus });
        ref.focus();
      } else if (!focus && ref) {
        // Remove focus styles when the element is not focused
        ref.className = ref.className.replace(' focus', '');
      }
    }, [focus]);

    // Wrap the component's onClick handler to also set the focus onClick
    const handleSelect = (...args) => {
      const { onClick } = componentProps;
      setFocus(index);
      if (onClick) {
        onClick(...args);
        if (closeMenu && closeOnSelect) closeMenu();
      }
    };

    const handleKeyDown = (...args) => {
      const [event] = args;
      setFocus(index);

      const { onClick } = componentProps;
      if (onClick && event && event.keyCode === ENTER_KEY_CODE) {
        onClick(...args);
        if (closeMenu && closeOnSelect) closeMenu();
      }
    };

    return (
      <WrappedComponent
        {...componentProps}
        inputRef={setRefNode}
        onClick={handleSelect}
        className={classNames(componentProps.className, { focus })}
        onKeyDown={handleKeyDown}
        role="menuitem"
        tabIndex={focus ? 0 : -1}
      />
    );
  };

  MenuItem.displayName = `FocusItem`;
  MenuItem.defaultProps = {
    ...WrappedComponent.defaultProps,
  };
  return MenuItem;
};

export default asFocusItem;
