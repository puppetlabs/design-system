import React, { useCallback, useState, useEffect } from "react";
import { cancelEvent } from '../helpers/statics';
import { sum, sortBy } from 'lodash';
import {
	UP_KEY_CODE,
	DOWN_KEY_CODE,
	HOME_KEY_CODE,
	END_KEY_CODE,
	ENTER_KEY_CODE,
	ESC_KEY_CODE,
	SPACE_KEY_CODE,
	TAB_KEY_CODE,
} from '../constants';

const defaultProps = {
	size: 0,
}

export const getTabIndexId = (props = {}) => props.tabId || props.name || props.label || props.title;
export const getIndexById = (tabIndexes, props) => {
	const key = getTabIndexId(props);
	return tabIndexes[key];
}

/**
 * @description Reuseable Hook for managing focusable elements (ex: in a menu or a nav bar).
 * @prop {number | undefined} prop.size Initial number of the tabbable elements
 * @prop {function | undefined} prop.getIndex Optional function for determining the specific order for the tab indexes
 * @link https://opensource.adobe.com/spectrum-web-components/tools/roving-tab-index/
 * @returns 
 */
function useRovingFocus({ size: sizeProp, focusOrder } = defaultProps) {
	const [currentFocus, setCurrentFocus] = useState(0);
	const [size, setSize] = useState(0);
	const [tabIndexes, setTabIndexes] = useState({})
	const [tabPositions, setPos] = useState([]);

	const adjustSize = (num, key) => setSize(s => {
		const newSize = sum([s, num]);
		const addingFocusableElement = num > 0;

		if (addingFocusableElement) {
			// const newPositions = sortBy([...tabPositions, pos], ['y', 'x']);
			// setPos(newPositions);
			setTabIndexes(t => ({ ...t, [key]: newSize - 1 }))
		} else {
			const { [key]: _, ...rest } = tabIndexes;
			const newId = getIndexById(rest)
			setTabIndexes(rest);
		}

		return newSize;
	});
	
	const addTarget = (key) => adjustSize(1, key)
	const removeTarget = (key) => adjustSize(-1, key);
	

	const handleKeyDown = useCallback((e) => {
		switch (e.keyCode) {
			case TAB_KEY_CODE:
			case DOWN_KEY_CODE: {
				cancelEvent(e);
				setCurrentFocus(currentFocus === size - 1 ? 0 : currentFocus + 1);
				break;
			}
			case UP_KEY_CODE: {
				cancelEvent(e);
				setCurrentFocus(currentFocus === 0 ? size - 1 : currentFocus - 1);
				break;
			}
			case HOME_KEY_CODE: {
				cancelEvent(e);
				setCurrentFocus(0);
				break;
			}
			case END_KEY_CODE: {
				cancelEvent(e);
				setCurrentFocus(size);
				break;
			}
		}
	}, [currentFocus, size]);

	useEffect(() => {
		document.addEventListener("keydown", handleKeyDown, false);
		return () => {
			document.removeEventListener("keydown", handleKeyDown, false);
		};
	}, [handleKeyDown]);

	useEffect(() => {
		if (sizeProp !== size) {
			setSize(sizeProp);
		}
	}, [sizeProp])

	return { currentFocus, size, tabIndexes, setCurrentFocus, addTarget, removeTarget };
}

export const FocusContext = React.createContext(defaultProps);

export default useRovingFocus;