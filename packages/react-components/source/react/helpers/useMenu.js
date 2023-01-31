import { useRef, useState } from 'react';
import { usePopper } from 'react-popper';
import { uniqueId } from 'lodash';

/**
 *@description Hook that returns the necessary refs and event handlers to make a popper.js menu component.
 * @param {popperOptions} param.popperOptions - Options to pass to the popper instance
 * @link https://popper.js.org/docs/v2/constructors/
 */
const useMenu = ({ popperOptions }) => {
  /** Ref of the menu */
  const [menuRef, setMenu] = useState(null);

  /** Ref of the trigger (button, select, etc.) */
  const [triggerRef, setTrigger] = useState(null);

  /** Ref of the optional arrow element */
  const [arrowRef, setArrowRef] = useState(null);

  const { current: menuId } = useRef(uniqueId(`menu-`));
  const { current: menuTriggerId } = useRef(uniqueId(`menu-trigger-`));
  const { current: menuArrowId } = useRef(uniqueId(`menu-arrow-`));

  const popperModifiers = [
    {
      name: 'flip',
      enabled: true,
    },
    {
      name: 'arrow',
      enabled: !!arrowRef,
      options: {
        element: arrowRef,
        // padding: 1,
        offset: [0, 6],
      },
    },
    {
      name: 'offset',
      options: {
        offset: [0, 6],
      },
    },
    {
      name: 'preventOverflow',
      options: {
        rootBoundary: 'document',
        padding: 0,
      },
    },
  ];

  const { styles, attributes, update } = usePopper(triggerRef, menuRef, {
    placement: 'bottom-start',
    modifiers: popperModifiers,
    strategy: 'absolute',
    ...popperOptions,
  });

  // Focus on a node by id
  const focusOnId = node => () => {
    if (node) node.focus();
  };

  const focusMenu = focusOnId(menuRef);
  const focusTrigger = focusOnId(triggerRef);

  return {
    menuRef: setMenu,
    triggerRef: setTrigger,
    arrowRef: setArrowRef,
    focusMenu,
    focusTrigger,
    styles,
    attributes,
    update,
    /** Id to be set on menu container. Needed for closing menu on click outside */
    menuId,
    /** Id to be set on menu trigger. Needed for aria-controls */
    menuTriggerId,
    /** Id to be set on menu arrow. Needed for aria-controls */
    menuArrowId,
  };
};

export default useMenu;
