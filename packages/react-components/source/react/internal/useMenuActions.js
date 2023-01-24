import { useRef, useState, useCallback, useEffect } from 'react';
import { focus, cancelEvent } from '../helpers/statics';
import { usePopper } from 'react-popper';
import { uniqueId } from 'lodash';
import classNames from 'classnames';

const useMenuActions = ({className, onBlur }) => {
	/** Ref of the menu */
	const [menuRef, setMenu] = useState(null);

	/** Ref of the trigger (button, select, etc.) */
	const [triggerRef, setTrigger] = useState(null);

	/** Ref of the optional arrow element */
	const [arrowRef, setArrow] = useState(null);

	const [selectedOptions, setSelectedOptions] = useState({});

	const { current: menuId } = useRef(uniqueId(`menu-`));
	const { current: menuTriggerId } = useRef(uniqueId(`menu-trigger-`));


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
				padding: 1,
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

	const { styles, attributes, update, state } = usePopper(
		triggerRef,
		menuRef,
		{
			placement: 'bottom-start',
			modifiers: popperModifiers,
			strategy: 'absolute',
		},
	);

	// Handle click outside (onBlur) events
	useEffect(() => {
		const handleClickOutside = (event) => {
			const menu = document.getElementById(menuId);
			if (!menu.contains(event.target)) {
				onBlur && onBlur();
			}
			
		};

		document.addEventListener('click', handleClickOutside, true);
		return () => {
			document.removeEventListener('click', handleClickOutside, true);
		};
	}, [onBlur]);

	// Focus on a node by id
	const focusOnId = (id) => () => {
		const node = document.getElementById(id);
		if (node) node.focus();
	};

	const focusMenu = focusOnId(menuRef);
	const focusTrigger = focusOnId(triggerRef);

	const Arrow = () => ( <span
                id={`${className}-menu-arrow`}
                style={styles.arrow}
                {...attributes.arrow}
                ref={setArrow}
              />)

	const onMenuKeyDown = () => { }

	return {
		Arrow,
		menuRef: setMenu,
		triggerRef: setTrigger,
		focusMenu,
		focusTrigger,
		styles,
		attributes,
		update,
		/** Id to be set on menu container. Needed for closing menu on click outside */
		menuId,
		/** Id to be set on menu trigger. Needed for aria-controls */
		menuTriggerId
	};
}

export default useMenuActions;