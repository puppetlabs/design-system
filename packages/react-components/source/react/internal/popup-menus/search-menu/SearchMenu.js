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
  triggerRef: PropTypes.shape({}),
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
  attributes: PropTypes.shape({}),
  menuRef: PropTypes.shape({}),
  open: PropTypes.bool,
  onBlur: PropTypes.func,
  onEscape: PropTypes.func,
  renderItems: PropTypes.func,
  clearLabel: PropTypes.string,
};

const defaultProps = {
  applyButtonLabel: 'Apply',
  applyButtonType: 'primary',
  attributes: {},
  cancelButtonLabel: 'Cancel',
  cancelButtonType: 'tertiary',
  clearLabel: 'Clear selection',
  columns: false,
  filterBy: undefined,
  items: [],
  menuRef: null,
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
  triggerRef: null,
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
  clearLabel,
  renderItems: Renderer,
  style,
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
  const sortedGroups = sortBy(groupOptions, ([group]) => group);

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
      arrow
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
          <span>{`${selectedCount} filters selected`}</span>
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
