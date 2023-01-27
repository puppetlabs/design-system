import React, { useState, useEffect } from 'react';
import { isEqual, entries, groupBy, sortBy, xor, values, keyBy } from 'lodash';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import Input from '../../library/input';
import Text from '../../library/text';
import Badge from '../../library/badge';
import Button from '../../library/button';
import Portal from '../../library/portal';
import SearchMenuGroup, { getUniqKey } from './SearchMenuGroup';
import FocusContext from '../../helpers/useRovingFocus';
import asMenuItem from '../../helpers/asMenuItem';

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
  as: PropTypes.oneOfType([PropTypes.string, PropTypes.func]),
  asPortal: PropTypes.bool,
  children: PropTypes.node,
  className: PropTypes.string,
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
};

const defaultProps = {
  as: 'div',
  asPortal: true,
  children: null,
  className: '',
  items: [],
  style: {},
  searchLabel: 'search',
  searchPlaceholder: 'Search....',
  filterBy: undefined,
  onClose: () => null,
  onApply: () => null,
  columns: false,
  triggerRef: null,
  cancelButtonLabel: 'Cancel',
  cancelButtonType: 'tertiary',
  applyButtonLabel: 'Apply filters',
  applyButtonType: 'primary',
  selected: [],
  attributes: {},
  menuRef: null,
};
const SearchMenuList = ({
  as: Element,
  asPortal,
  children,
  className,
  items: itemsProp,
  style,
  searchLabel,
  searchPlaceholder,
  filterBy,
  onClose,
  onApply,
  columns,
  triggerRef,
  cancelButtonLabel,
  cancelButtonType,
  applyButtonLabel,
  applyButtonType,
  selected,
  attributes,
  menuRef,
  ...props
}) => {
  // Use default filter function if none is provided
  const filterOptions = filterBy || defaultFilter;
  const [items, setItems] = useState([]);
  const [searchString, setSearchString] = useState();
  const [openMenus, setOpenMenus] = useState([]);
  const [selectedOptions, setSelectedOptions] = useState({});

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
  }, [selected]);

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
      <FocusContext>
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
                  Clear selection
                </Badge>
              )}
            </Text>
          </div>
          <div className="rc-search-menu-list">
            {sortedGroups.map(([groupName, groupItems]) => {
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
        </Element>
      </FocusContext>
    </Portal>
  );
};
SearchMenuList.displayName = 'SearchMenuList';
SearchMenuList.propTypes = propTypes;
SearchMenuList.defaultProps = defaultProps;
export default SearchMenuList;
