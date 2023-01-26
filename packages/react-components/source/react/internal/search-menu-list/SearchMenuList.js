import React, { useState, useEffect, forwardRef, useRef } from 'react';
import PropTypes from 'prop-types';
import Input from '../../library/Input';
import Text from '../../library/Text';
import Badge from '../../library/Badge';
import Button from '../../library/Button';
import Portal from '../../library/Portal';
import { isEqual, entries, groupBy, sortBy, xor, values, keyBy } from 'lodash';
import classNames from 'classnames';
import useMenuActions from '../../helpers/useMenuActions';
import SearchMenuGroup, { getUniqKey } from './SearchMenuGroup';
import useRovingFocus, {FocusContext} from '../../helpers/useRovingFocus'
import asMenuItem from '../../helpers/asMenuItem';

const MenuInput = asMenuItem(Input);

export const defaultFilter = (opts = [], search) => {
	const searchIncludes = (str) => str && search.length && str.toLowerCase().includes(search.toLowerCase())
	return !search
		? opts
		: opts.filter((opt) => searchIncludes(opt.label) || searchIncludes(opt.group));
};

const SearchMenuList = ({
	as: Element = 'div',
	asPortal = true,
	children,
	className,
	items: itemsProp,
	style,
	searchLabel = 'search',
	searchPlaceholder = "Search....",
	filterBy,
	onClose,
	onApply,
	columns,
	triggerRef,
	cancelButtonLabel = 'Cancel',
	cancelButtonType = "tertiary",
	applyButtonLabel = 'Apply filters',
	applyButtonType = "primary",
	selected = [],
	attributes,
	menuRef,
	...props
}) => {
	// Use default filter function if none is provided
	const filterOptions = filterBy ? filterBy : defaultFilter;
	const [items, setItems] = useState([]);
	const [searchString, setSearchString] = useState();
	const [openMenus, setOpenMenus] = useState([]);
	const [selectedOptions, setSelectedOptions] = useState({});

	useEffect(() => {
		const searchResults = filterOptions(itemsProp, searchString)
		if (!isEqual(searchResults, items)) {
			setItems(searchResults);
		}
	}, [itemsProp, searchString]);

	useEffect(() => {
		const incomingSelections = keyBy(selected, getUniqKey)
		if (!isEqual(incomingSelections, selectedOptions)) {
			setSelectedOptions(incomingSelections);
		}
	}, [selected]);
	
	// Grouping
	const grouper = (item) => item.group || '#collector-group';
	const groupOptions = entries(groupBy(items, grouper));
	const sortedGroups = sortBy(groupOptions, ([group]) => group);

	const toggleGroup = (menuName) => {
		const newMenus = xor(openMenus, [menuName]);
		setOpenMenus(newMenus);
	}

	
	// Selection
	const onSelect = (item, checked) => {
		const key = getUniqKey(item);
		if (checked && !selectedOptions[key]) {
			setSelectedOptions({ ...selectedOptions, [key]: item })
		}
		if (!checked && selectedOptions[key]) {
			const newSelectedOptions = { ...selectedOptions };
			delete newSelectedOptions[key];
			setSelectedOptions(newSelectedOptions);
		}
	};

	const onClearSelected = () => setSelectedOptions({});

	const applySelection = () => {
		onApply(values(selectedOptions));
		onClose();
	};
	const selectedCount = Object.keys(selectedOptions).length;
	const focusState = useRovingFocus();
	return (
		<Portal active={asPortal} target="search-menu">
			<FocusContext.Provider value={focusState}>
				<Element
					className={classNames('rc-search-menu', className)}
					style={style}
					ref={menuRef}
					{...props}
					{...attributes}
				>
					<div className="rc-search-menu-search">
						<MenuInput
							name="search"
							label={searchLabel}
							placeholder={searchPlaceholder}
							value={searchString}
							trailingButtonIcon="search"
							trailingButtonProps={{ 'aria-label': 'Search tags' }}
							placeholder={searchPlaceholder}
							onChange={setSearchString}
						/>
						<Text className="rc-search-menu-list-selected-text" size='small' color="subtle">
							<span>{`${selectedCount} filters selected`}</span>
							{!!selectedCount && <Badge weight="subtle" onClick={onClearSelected} type="danger">Clear selection</Badge>}
						</Text>
					</div>
					<div className='rc-search-menu-list'>
						{sortedGroups.map(([groupName, groupItems], i) => {
							const toggleThisGroup = () => toggleGroup(groupName);
							const isOpen = openMenus.includes(groupName) || !!searchString;
							return (
								<SearchMenuGroup
									title={groupName}
									items={groupItems}
									toggleGroup={toggleThisGroup}
									isOpen={isOpen}
									columns={columns}
									onSelect={onSelect}
									selectedOptions={selectedOptions}
								/>
							)
						})}
					</div>
					<div className='rc-search-menu-buttons'>
						<Button onClick={onClose} type={cancelButtonType}>{cancelButtonLabel}</Button>
						<Button onClick={applySelection} type={applyButtonType}>{applyButtonLabel}</Button>
					</div>
				</Element>
			</FocusContext.Provider>
		</Portal>
	)
};
SearchMenuList.displayName = 'SearchMenuList';
export default SearchMenuList;