import React, { useCallback, useState, useEffect, useReducer } from "react";
import { cancelEvent } from '../helpers/statics';
import { sortBy } from 'lodash';
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

/**
 * @description Gets a human readable index id for a tabbable node via the props
 * @param {Wrapped component props} props 
 * @returns 
 */
export const getTabIndexId = (props = {}) => props.tabId || props.name || props.label || props.title || '';

/**
 * @description maps and array of nodes to this component's tab index id
 * @returns {
 * 	{nodeId}: number (tab index) 
 * }
 */
const toIndexMap = (acc, { id }, index) => ({ ...acc, [id]: index });

/**
 * @description Indexes an array of tabbable nodes by their position on the page 
 * @param {node[]} nodes Array of tabbable nodes 
 * @returns  A Sorted array of nodes and it's size
 */
const getIndexes = (nodes) => {
	const positions = sortBy(Object.values(nodes), ['y', 'x']);
	const size = positions.length;
	const indexes = positions.reduce(toIndexMap, {});
	return [size, indexes]
};

/**
 * @description Returns reducer state data. 
 * @param {node[]} nodes Array of tabbable nodes
 * @returns {
 * 	nodes: {node[]},
 * 	indexes: {[nodeId]: tabIndex},
 * 	size: number
 * }
 */
const getNodeData = (nodes) => {
	const [size, indexes] = getIndexes(nodes);
	return {
		nodes,
		indexes,
		size
	}
};

/**
 * @description Reducer for managing tabbable nodes 
 */
const reducer = (state, action) => {
	switch (action.type) {
		case 'add': {
			const nodes = { ...state.nodes, [action.node.id]: action.node };
			return {
				...state,
				...getNodeData(nodes)
			}
			break;
		};
		case 'remove': {
			const { [action.node.id]: _, ...nodes } = state.nodes;
			return {
				...state,
				...getNodeData(nodes)
			}
			break;
		};
		default: return state;
	}
}
const defaultState = { nodes: {}, positions: [], indexes: {}, size: 0 };

/**
 * @description Reuseable Hook for managing focusable elements (ex: in a menu or a nav bar). Allows for tabbing and arrow key navigation between nodes, based off their visual hierarchy. 
 * @prop {number | undefined} prop.size Initial number of the tabbable elements
 * @prop {function | undefined} prop.getIndex Optional function for determining the specific order for the tab indexes
 * @reference https://opensource.adobe.com/spectrum-web-components/tools/roving-tab-index/
 * @returns Roving focus state and action handlers
 */
export function useRovingFocus() {
	const [currentFocus, setFocus] = useState(0);
	const [{ size, indexes }, dispatch] = useReducer(reducer, defaultState);
	const removeNode = (node) => dispatch({ type: 'remove', node })
	const addNode = (node) => dispatch({ type: 'add', node });

	const addTarget = (node) => addNode(node);
	const removeTarget = (node) => removeNode(node);

	const handleKeyDown = useCallback((e) => {
		switch (e.keyCode) {
			case TAB_KEY_CODE:
			case DOWN_KEY_CODE: {
				cancelEvent(e);
				setFocus(currentFocus === size - 1 ? 0 : currentFocus + 1);
				break;
			}
			case UP_KEY_CODE: {
				cancelEvent(e);
				setFocus(currentFocus === 0 ? size - 1 : currentFocus - 1);
				break;
			}
			case HOME_KEY_CODE: {
				cancelEvent(e);
				setFocus(0);
				break;
			}
			case END_KEY_CODE: {
				cancelEvent(e);
				setFocus(size);
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

	return { currentFocus, size, indexes, setFocus, addTarget, removeTarget };
}

export const RovingFocusContext = React.createContext();

/**
 * 
 * @param {*} param0 
 * @returns 
 */
const FocusContext = ({ children }) => {
	const focusState = useRovingFocus();
	return (<RovingFocusContext.Provider value={focusState}>{children}</RovingFocusContext.Provider>);
}
export default FocusContext;