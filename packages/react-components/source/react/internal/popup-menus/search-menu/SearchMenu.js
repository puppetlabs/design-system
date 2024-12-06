import React, { useState, useEffect } from 'react';
import {
  isEqual,
  entries,
  groupBy,
  sortBy,
  values,
  keyBy,
  uniqueId,
  remove,
  xor,
} from 'lodash';
import PropTypes from 'prop-types';
import Input from '../../../library/input';
import Text from '../../../library/text';
import Badge from '../../../library/badge';
import Button from '../../../library/button';
import SearchMenuGroup, { getUniqKey } from './SearchMenuGroup';
import Container from '../../../library/menu/Container';
import asFocusItem from '../../../helpers/asFocusItem';

const MenuInput = asFocusItem(Input);
const MenuButton = asFocusItem(({ inputRef, ...props }) => (
  <Button ref={inputRef} {...props} />
));

export const defaultFilter = (opts = [], search) => {
  const searchIncludes = str =>
    str && search.length && str.toLowerCase().includes(search.toLowerCase());
  return !search
    ? opts
    : opts.filter(
        opt => searchIncludes(opt.label) || searchIncludes(opt.group),
      );
};

const propTypes = {
  /** Array of options to display. Each option should be an object with a label and value. the `group` prop can be set to group similar items. Items without a group will be displayed without a group header */
  options: PropTypes.arrayOf(PropTypes.shape({})),
  /** Object of styles to apply to the search menu. */
  style: PropTypes.shape({}),
  /** Label displayed on search input */
  searchLabel: PropTypes.string,
  /** Placeholder displayed on search input */
  searchPlaceholder: PropTypes.string,
  /** Function used to filter the options. By default, the filter compares the search query to the group and label props on an option. */
  filterBy: PropTypes.func,
  /** Function called when the search menu is closed. */
  onClose: PropTypes.func,
  /** Function called when the apply button is clicked. Receives an array of selected options as an argument. */
  onApply: PropTypes.func,
  /** Number of columns to display per row. Can ab a boolean or number. If false, options will be displayed in a single column. If true, options will be displayed in two columns. A number can be passed to define columns of 3 or greater. */
  columns: PropTypes.oneOfType([PropTypes.bool, PropTypes.number]),
  /** Label displayed on cancel button */
  cancelButtonLabel: PropTypes.string,
  /** Type of cancel button */
  cancelButtonType: PropTypes.oneOf([
    'primary',
    'secondary',
    'tertiary',
    'text',
  ]),
  /** Label displayed onApply button */
  applyButtonLabel: PropTypes.string,
  /** Type of apply button */
  applyButtonType: PropTypes.oneOf([
    'primary',
    'secondary',
    'tertiary',
    'text',
  ]),
  /** Array of selected options. Each option should be an object with a label and value. */
  selected: PropTypes.arrayOf(PropTypes.shape({})),
  /** Boolean indicating whether the search menu is open. */
  open: PropTypes.bool,
  /** Function called when the search menu is blurred. */
  onBlur: PropTypes.func,
  /** Function called when the escape key is pressed. */
  onEscape: PropTypes.func,
  /** Render Prop for displaying something other than grouped checkboxes in the search list */
  renderItems: PropTypes.func,
  /** Label displayed in clear badge */
  clearLabel: PropTypes.string,
  /** Label of selected count. If a function is provided, the selected count is passed to it. */
  selectedLabel: PropTypes.oneOfType([PropTypes.string, PropTypes.func]),
  /** Position of ungrouped items. Can be 'top' or 'bottom'. Defaults to 'bottom' */
  ungroupedPosition: PropTypes.oneOf(['top', 'bottom']),
  /** Display arrow on menu */
  arrow: PropTypes.bool,
  /** Displays the text input for the default search menu. If set to false, this input will be hidden and the options can be filtered externally. */
  displayInput: PropTypes.bool,
  /** Displays the apply and cancel buttons for the default search menu. If set to false, these buttons will be hidden and the options can be filtered externally. */
  displayButtons: PropTypes.bool,
};

const defaultProps = {
  applyButtonLabel: 'Apply',
  applyButtonType: 'primary',
  arrow: false,
  cancelButtonLabel: 'Cancel',
  cancelButtonType: 'tertiary',
  clearLabel: 'Clear selection',
  columns: false,
  filterBy: undefined,
  options: [],
  renderItems: null,
  onApply: () => null,
  onBlur: undefined,
  onClose: () => null,
  onEscape: undefined,
  open: false,
  searchLabel: 'search',
  searchPlaceholder: 'Search....',
  selected: [],
  style: {},
  selectedLabel: 'selected',
  ungroupedPosition: 'bottom',
  displayInput: true,
  displayButtons: true,
};
const SearchMenu = ({
  applyButtonLabel,
  applyButtonType,
  cancelButtonLabel,
  cancelButtonType,
  columns,
  filterBy,
  options: itemsProp,
  onApply,
  onBlur,
  onClose,
  onEscape,
  open,
  searchLabel,
  searchPlaceholder,
  selected,
  selectedLabel,
  clearLabel,
  ungroupedPosition,
  renderItems: Renderer,
  displayInput,
  displayButtons,
  style,
  arrow,
}) => {
  // Use default filter function if none is provided
  const filterOptions = filterBy || defaultFilter;
  const [items, setItems] = useState([]);
  const [searchString, setSearchString] = useState();
  const [selectedOptions, setSelectedOptions] = useState({});
  const [openMenus, setOpenMenus] = useState([]);

  const onClearSelected = () => setSelectedOptions({});

  // Search
  const onSearch = search => {
    setSearchString(search);
  };
  // Grouping
  const grouper = item => item.group || '#collector-group';
  const groupOptions = entries(groupBy(items, grouper));
  const collector = remove(
    groupOptions,
    ([group]) => group === '#collector-group',
  );
  const sortedGroups = sortBy(groupOptions, ([group]) => group);

  if (ungroupedPosition === 'top') {
    sortedGroups.unshift(...collector);
  } else {
    sortedGroups.push(...collector);
  }

  const toggleGroup = menuName => {
    const newMenus = xor(openMenus, [menuName]);
    setOpenMenus(newMenus);
  };

  // Selection
  const onSelect = (item, checked) => {
    const key = getUniqKey(item);
    if (checked && !selectedOptions[key]) {
      setSelectedOptions({ ...selectedOptions, [key]: item });
    }
    if (!checked && selectedOptions[key]) {
      const { [key]: _, ...newSelectedOptions } = selectedOptions;
      setSelectedOptions(newSelectedOptions);
    }
  };

  const applySelection = () => {
    onApply(values(selectedOptions));
    onClose();
  };

  useEffect(() => {
    const searchResults = filterOptions(itemsProp, searchString);
    if (!isEqual(searchResults, items)) {
      setItems(searchResults);
    }
  }, [itemsProp, searchString]);

  useEffect(() => {
    const incomingSelections = keyBy(selected, getUniqKey);
    if (!isEqual(incomingSelections, selectedOptions)) {
      setSelectedOptions(incomingSelections);
    }
    return onClearSelected;
  }, []);

  const selectedCount = Object.keys(selectedOptions).length;

  const GroupRenderer = Renderer || SearchMenuGroup;
  return (
    <Container
      arrow={arrow}
      style={style}
      open={open}
      onBlur={onBlur}
      onEscape={onEscape}
      onClose={onClose}
      className="rc-search-menu"
      closeOnSelect={false}
    >
      <div className="rc-search-menu-search">
        {displayInput && (
          <MenuInput
            name="search"
            label={searchLabel}
            placeholder={searchPlaceholder}
            value={searchString}
            trailingButtonIcon="search"
            trailingButtonProps={{ 'aria-label': 'Search tags' }}
            onChange={onSearch}
          />
        )}
        <Text
          className="rc-search-menu-list-selected-text"
          size="small"
          color="subtle"
        >
          {selectedLabel && (
            <span>{`${
              typeof selectedLabel === 'function'
                ? selectedLabel(selectedCount)
                : `${selectedCount} ${selectedLabel}`
            }`}</span>
          )}
          {!!selectedCount && (
            <Badge weight="subtle" onClick={onClearSelected} type="danger">
              {clearLabel}
            </Badge>
          )}
        </Text>
      </div>
      <div className="rc-search-menu-list">
        {sortedGroups.map(([groupName, groupItems]) => {
          const toggleThisGroup = () => toggleGroup(groupName);
          const isOpen = openMenus.includes(groupName) || !!searchString;
          return (
            <GroupRenderer
              title={groupName}
              items={groupItems}
              columns={columns}
              onSelect={onSelect}
              toggleGroup={toggleThisGroup}
              isOpen={isOpen}
              selectedOptions={selectedOptions}
              isGroupCollector={groupName === '#collector-group'}
              id={uniqueId(`${groupName}-`)}
            />
          );
        })}
      </div>
      {displayButtons && (
        <div className="rc-search-menu-buttons">
          <MenuButton
            id={cancelButtonLabel}
            onClick={onClose}
            type={cancelButtonType}
          >
            {cancelButtonLabel}
          </MenuButton>
          <MenuButton
            id={applyButtonLabel}
            onClick={applySelection}
            type={applyButtonType}
          >
            {applyButtonLabel}
          </MenuButton>
        </div>
      )}
    </Container>
  );
};
SearchMenu.displayName = 'SearchMenu';
SearchMenu.propTypes = propTypes;
SearchMenu.defaultProps = defaultProps;
export default SearchMenu;
