import React, { useState, useEffect } from 'react';
import {
  isEqual,
  entries,
  groupBy,
  sortBy,
  xor,
  values,
  keyBy,
  uniqueId,
  remove,
} from 'lodash';
import PropTypes from 'prop-types';
import Input from '../../../library/input';
import Text from '../../../library/text';
import Badge from '../../../library/badge';
import Button from '../../../library/button';
import SearchMenuGroup, { getUniqKey } from './SearchMenuGroup';
import Container from '../../../library/menu/Container';
import asMenuItem from '../../../helpers/asMenuItem';

const MenuInput = asMenuItem(Input);

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
  items: PropTypes.arrayOf(PropTypes.shape({})),
  style: PropTypes.shape({}),
  searchLabel: PropTypes.string,
  searchPlaceholder: PropTypes.string,
  filterBy: PropTypes.func,
  onClose: PropTypes.func,
  onApply: PropTypes.func,
  columns: PropTypes.oneOfType([PropTypes.bool, PropTypes.number]),
  cancelButtonLabel: PropTypes.string,
  cancelButtonType: PropTypes.oneOf([
    'primary',
    'secondary',
    'tertiary',
    'text',
  ]),
  applyButtonLabel: PropTypes.string,
  applyButtonType: PropTypes.oneOf([
    'primary',
    'secondary',
    'tertiary',
    'text',
  ]),
  selected: PropTypes.arrayOf(PropTypes.shape({})),
  open: PropTypes.bool,
  onBlur: PropTypes.func,
  onEscape: PropTypes.func,
  renderItems: PropTypes.func,
  clearLabel: PropTypes.string,
  selectedLabel: PropTypes.oneOfType([PropTypes.string, PropTypes.func]),
  ungroupedPosition: PropTypes.oneOf(['top', 'bottom']),
  arrow: PropTypes.bool,
};

const defaultProps = {
  /** Label displayed onApply button */
  applyButtonLabel: 'Apply',
  /** Type of apply button */
  applyButtonType: 'primary',
  /** Display arrow on menu */
  arrow: false,
  /** Label displayed on cancel button */
  cancelButtonLabel: 'Cancel',
  /** Type of cancel button */
  cancelButtonType: 'tertiary',
  /** Label displayed in clear badge */
  clearLabel: 'Clear selection',
  /** Number of columns to display per row. Can ab a boolean or number. If false, options will be displayed in a single column. If true, options will be displayed in two columns. A number can be passed to define columns of 3 or greater. */
  columns: false,
  /** Function used to filter the options. By default, the filter compares the search query to the group and label props on an option. */
  filterBy: undefined,
  /** Array of options to display. Each option should be an object with a label and value. the `group` prop can be set to group similar items. Items without a group will be displayed without a group header */
  items: [],
  /** Render Prop for displaying something other than grouped checkboxes in the search list */
  renderItems: null,
  /** Function called when the apply button is clicked. Receives an array of selected options as an argument. */
  onApply: () => null,
  /** Function called when the search menu is blurred. */
  onBlur: undefined,
  /** Function called when the search menu is closed. */
  onClose: () => null,
  /** Function called when the escape key is pressed. */
  onEscape: undefined,
  /** Boolean indicating whether the search menu is open. */
  open: false,
  /** Label displayed on search input */
  searchLabel: 'search',
  /** Placeholder displayed on search input */
  searchPlaceholder: 'Search....',
  /** Array of selected options. Each option should be an object with a label and value. */
  selected: [],
  /** Object of styles to apply to the search menu. */
  style: {},
  /** Label of selected count. If a function is provided, the selected count is passed to it. */
  selectedLabel: 'selected',
  /** Position of ungrouped items. Can be 'top' or 'bottom' */
  ungroupedPosition: 'bottom',
};
const SearchMenu = ({
  applyButtonLabel,
  applyButtonType,
  cancelButtonLabel,
  cancelButtonType,
  columns,
  filterBy,
  items: itemsProp,
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
  style,
  arrow,
}) => {
  // Use default filter function if none is provided
  const filterOptions = filterBy || defaultFilter;
  const [items, setItems] = useState([]);
  const [searchString, setSearchString] = useState();
  const [openMenus, setOpenMenus] = useState([]);
  const [selectedOptions, setSelectedOptions] = useState({});

  const onClearSelected = () => setSelectedOptions({});

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
      className="rc-search-menu"
    >
      <div className="rc-search-menu-search">
        <MenuInput
          name="search"
          label={searchLabel}
          placeholder={searchPlaceholder}
          value={searchString}
          trailingButtonIcon="search"
          trailingButtonProps={{ 'aria-label': 'Search tags' }}
          onChange={setSearchString}
        />
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
              toggleGroup={toggleThisGroup}
              isOpen={isOpen}
              columns={columns}
              onSelect={onSelect}
              selectedOptions={selectedOptions}
              id={uniqueId(`${groupName}-`)}
            />
          );
        })}
      </div>
      <div className="rc-search-menu-buttons">
        <Button onClick={onClose} type={cancelButtonType}>
          {cancelButtonLabel}
        </Button>
        <Button onClick={applySelection} type={applyButtonType}>
          {applyButtonLabel}
        </Button>
      </div>
    </Container>
  );
};
SearchMenu.displayName = 'SearchMenu';
SearchMenu.propTypes = propTypes;
SearchMenu.defaultProps = defaultProps;
export default SearchMenu;
