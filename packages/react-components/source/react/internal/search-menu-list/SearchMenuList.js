import React, { useState, useEffect, forwardRef, useRef } from 'react';
import PropTypes from 'prop-types';
import Input from '../../library/Input';
import Text from '../../library/Text';
import Badge from '../../library/Badge';
import Button from '../../library/Button';
import Portal from '../../library/Portal';
import { isEqual, entries, groupBy, sortBy, xor, values, keyBy } from 'lodash';
import classNames from 'classnames';
import useMenuActions from '../useMenuActions';
import SearchMenuGroup, { getUniqKey } from './SearchMenuGroup';

export const defaultFilter = (opts = [], search) => {
	const searchIncludes = (str) => str && str.toLowerCase().includes(search.toLowerCase())
	return !search
		? opts
		: opts.filter((opt) => searchIncludes(opt.label) || searchIncludes(opt.group));
};

const SearchMenuList = forwardRef(({
	as: Element = 'div',
	asPortal = true,
	children,
	className,
	items: itemsProp,
	style,
	searchLabel = 'search',
	searchPlaceholder = "Search....",
	filterBy,
	onBlur,
	onClose,
	onApply,
	columns,
	triggerRef,
	cancelButtonLabel = 'Cancel',
	cancelButtonType = "tertiary",
	applyButtonLabel = 'Apply filters',
	applyButtonType = "primary",
	selected = [],
	focus,
	setFocus,
	attributes,
	...props
}, ref) => {
	// Use default filter function if none is provided
	const filterOptions = filterBy ? filterBy : defaultFilter;
	const [items, setItems] = useState([]);
	const [searchString, setSearchString] = useState();
	const [openMenus, setOpenMenus] = useState([]);
	const [selectedOptions, setSelectedOptions] = useState({});
	const searchRef = useRef(null);

	useEffect(() => {
		// focus to the search input when the menu opens

		if (!!searchRef) searchRef.current.focus();
	}, [searchRef])

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

	return (
		<Portal active={asPortal} target="search-menu">
			<Element
				className={classNames('rc-search-menu', className)}
				style={style}
				ref={ref}
				tabIndex={0}
				{...props}
				{...attributes}
			>
				<div className="rc-search-menu-search">
					<Input
						name="search"
						label={searchLabel}
						placeholder={searchPlaceholder}
						value={searchString}
						trailingButtonIcon="search"
						trailingButtonProps={{ 'aria-label': 'Search tags' }}
						placeholder={searchPlaceholder}
						onChange={setSearchString}
						inputRef={searchRef}
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
								index={i}
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
		</Portal>
	)
});
SearchMenuList.displayName = 'SearchMenuList';
export default SearchMenuList;