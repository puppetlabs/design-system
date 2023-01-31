import React, {
  useEffect,
  useRef,
  useContext,
  useState,
  useCallback,
} from 'react';
import { uniqueId } from 'lodash';
import { RovingFocusContext, getTabIndexId } from './useRovingFocus';

/**
 * @description HOC that adds roving focus to a component. Meant to be used with the RovingFocusProvider, it wraps the menu item component and adds the necessary props and event handlers to make it focusable, keeping the focus order according to it's visual position on the page.
 * @param {ReactComponent} WrappedComponent - The React component to wrap. Button, Checkbox, Link, etc.
 * @note The wrapped component must accept an inputRef prop and forward it to the element that should be focused.
 * @returns {
 * RovingFocusContext.Consumer > MenuItemHOC(WrappedComponent)}
 *
 */
const asMenuItem = (WrappedComponent, withoutOnClick = false) => {
  // Wrap the component in a provider that uses the context props
  const MenuItem = componentProps => {
    const {
      currentFocus,
      setFocus,
      addTarget,
      removeTarget,
      indexes,
    } = useContext(RovingFocusContext);
    const [ref, setRef] = useState(null);
    const { current: id } = useRef(uniqueId(getTabIndexId(componentProps)));
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
      [index, currentFocus],
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
        // Move element into view when it is focused
        ref.focus();
      }
    }, [index, currentFocus]);

    // Wrap the component's onClick handler to also set the focus onClick
    const handleSelect = (...args) => {
      setFocus(index);
      const { onClick } = componentProps;
      if (onClick && !withoutOnClick) {
        onClick(...args);
      }
    };

    return (
      <WrappedComponent
        {...componentProps}
        onClick={handleSelect}
        role="menuitem"
        inputRef={setRefNode}
        tabIndex={focus ? 0 : -1}
      />
    );
  };

  MenuItem.displayName = `MenuItem(${WrappedComponent.displayName ||
    WrappedComponent.name})`;
  MenuItem.defaultProps = {
    ...WrappedComponent.defaultProps,
  };
  return MenuItem;
};

export default asMenuItem;
