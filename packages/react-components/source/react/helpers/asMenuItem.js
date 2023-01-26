import React, { useEffect, useRef, useState, useCallback, forwardRef } from "react";
import { FocusContext, getTabIndexId, getIndexById } from "./useRovingFocus";
import {
	ENTER_KEY_CODE,
	ESC_KEY_CODE,
	SPACE_KEY_CODE,
	TAB_KEY_CODE,
} from '../constants';

const asMenuItem = (WrappedComponent) => {
	const MenuItem = ({
		setFocus,
		tabIndexes,
		currentFocus,
		addTarget,
		removeTarget,
		tabId,
		...componentProps }) => {
		const [ref, setRef] = useState(null);
		const index = getIndexById(tabIndexes, componentProps);
		const focus = index === currentFocus;

		useEffect(() => {
			const id = getTabIndexId(componentProps);
			addTarget(id);
			return () => removeTarget(id);
		}, []);

		useEffect(() => {
			if (focus && ref) {
				// Move element into view when it is focused
				ref.focus();
			}
		}, [tabIndexes, currentFocus]);


		return (
			<WrappedComponent
				{...componentProps}
				role="menuitem"
				inputRef={setRef}
				tabIndex={focus ? 0 : -1}
			/>
		);
	};

	const MenuItemWithProvider = (props) => (<FocusContext.Consumer>
		{({ currentFocus, setCurrentFocus, addTarget, removeTarget, tabIndexes }) => (
			<MenuItem
				currentFocus={currentFocus}
				tabIndexes={tabIndexes}
				setFocus={setCurrentFocus}
				addTarget={addTarget}
				removeTarget={removeTarget}
				{...props}
			/>
		)}
	</FocusContext.Consumer>);

	MenuItemWithProvider.displayName = `MenuItem(${WrappedComponent.displayName || WrappedComponent.name})`;
	MenuItemWithProvider.defaultProps = {
		setFocus: () => { },
		index: 0,
		focus: false,
		...WrappedComponent.defaultProps
	};
	return MenuItemWithProvider;
};

export default asMenuItem;
