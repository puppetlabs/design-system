import React from 'react';
import {
  string,
  arrayOf,
  shape,
  node,
  func,
  bool,
  number,
  element,
  oneOfType,
  oneOf,
  elementType,
} from 'prop-types';
import {
  Text,
  Input,
  ButtonSelect,
  Badge,
  Icon,
} from '@puppet/react-components';
import QuickFilter from '../quickFilter';
import TagBuilder from '../tagBuilder';
import CreateFilterBuilder from '../FilterBuilder/FilterBuilder';
import './TableHeader.scss';

const propTypes = {
  /** Optional feature to display number of rows in table. Provide both the count and 'item' label in a string. */
  rowCountText: string,
  /** Optional feature to display number of rows selected in table. Provide both the count and 'selected' label in a string. */
  selectedRowCountText: string,
  /** Allows children to be rendered within the tableheader */
  children: node,
  /** Boolean value that determines if the search box should be rendered */
  search: bool,
  /** String shown within blank input box */
  searchPlaceholder: string,
  /** The value shown in the input box */
  searchValue: string,
  /** Ran when user types into input box, returns new value */
  onSearchChange: func,
  /**  Boolean value that determines if a createFilter box should be rendered */
  FilterBuilder: bool,
  /** An Array of field objects */
  filterBuilderFieldOptions: arrayOf(
    shape({
      /** Unique action id */
      id: oneOfType([string, number]).isRequired,
      /** Action text */
      label: node.isRequired,
      /** Optional icon rendered to the left of action text */
      icon: oneOf(Icon.AVAILABLE_ICONS),
      /** Optional custom icon rendered to the left of action text */
      svg: element,
      /** Action click handler. Not needed if the action is a link */
      onClick: func,
      /** Custom action element. Useful for creating navigation actions with as: 'a' or as: Link. Additionally, extra props not listed here are passed through to the action element. This allows custom props such as `href` or `to` to be passed to the inner action element. */
      as: elementType,
    }),
  ),
  /** Optional new label added above top field of filterBuilder */
  fieldLabel: string,
  /** Optional new placeholder added above top field of filterBuilder */
  fieldPlaceholder: string,
  /** Optional new error text added to the top field of filterBuilder */
  fieldErrorText: string,
  /** Optional new label added above middle field of filterBuilder */
  operatorLabel: string,
  /** Optional new placeholder added above middle field of filterBuilder */
  operatorPlaceholder: string,
  /** Optional new error text added to the bottom field of filterBuilder */
  operatorErrorText: string,
  /** Optional new label added above bottom field of filterBuilder */
  valueLabel: string,
  /** Optional new placeholder added above bottom field of filterBuilder */
  valuePlaceholder: string,
  /** Optional new error text added to the bottom field of filterBuilder  */
  valueErrorText: string,
  /** An Array of operator objects */
  filterBuilderOperatorOptions: arrayOf(
    shape({
      /** Unique action id */
      id: oneOfType([string, number]).isRequired,
      /** Action text */
      label: node.isRequired,
      /** Optional icon rendered to the left of action text */
      icon: oneOf(Icon.AVAILABLE_ICONS),
      /** Optional custom icon rendered to the left of action text */
      svg: element,
      /** Action click handler. Not needed if the action is a link */
      onClick: func,
      /** Custom action element. Useful for creating navigation actions with as: 'a' or as: Link. Additionally, extra props not listed here are passed through to the action element. This allows custom props such as `href` or `to` to be passed to the inner action element. */
      as: elementType,
    }),
  ),
  filterBuilderOnSubmit: func,
  /** Allows you to pass an array to define each quick filter and its possible options */
  filters: arrayOf(
    shape({
      /** This is the label displayed on the action button,
       * the label text should be closely related to the table column which it will be filtering */
      fieldLabel: string,
      /** Unique key that should match datakey of column being filtered */
      field: string,
      /** Options are the possible selections that a user can pick from under a certain field */
      options: arrayOf({
        /** Is the value returned after a users selection for a dataset to be filter by */
        value: string,
        /** Should you wish to add an icon to a specific row */
        icon: string,
        /** Text which will be displayed for each option */
        label: string,
      }),
    }),
  ),
  /** Callback function called when a filter is changed, returns the currently selected filters */
  onFilterChange: func,
  /** */
  activeFilters: arrayOf(
    shape({
      /** The value returned when a remove button on a pill is clicked */
      field: string,
      /** The text shown in the first part of the pill */
      fieldLabel: string,
      /** The value shown on the second half of a pill */
      value: string,
    }),
  ),
  /** Callback function called when the tag close button is clicked */
  onRemoveAll: func,
  /** Callback function called when the tags x button is clicked */
  onRemoveTag: func,
  /** Actions are the possible selections that a user can pick from under a certain field */
  actions: arrayOf({
    /** Is the value returned after a users selection for a dataset to be filter by */
    value: string,
    /** Should you wish to add an icon to a specific row */
    icon: string,
    /** Text which will be displayed for each option */
    label: string,
  }),
  /** String shown as action button select */
  actionLabel: string,
  /** Callback function called when an action is selected from the dropdown list */
  onActionSelect: func,
  /** Boolean used to conditionally render the showSelectAllBadge */
  showSelectAllBadge: bool,
  /** Text shown in the selectAllBadge */
  selectAllBadgeText: string,
  /** Callback function called when the selectAllBadge is clicked */
  onSelectAllBadgeClick: func,
  /** Boolean used to conditionally render the showClearAllBadge */
  showClearAllBadge: bool,
  /** Text shown in the clearAllBadge */
  clearAllBadgeText: string,
  /** Callback function called when the clearAllBadgeClick is clicked */
  onClearAllBadgeClick: func,
};

const defaultProps = {
  rowCountText: null,
  selectedRowCountText: null,
  children: undefined,
  search: false,
  searchPlaceholder: '',
  searchValue: '',
  onSearchChange: () => {},
  FilterBuilder: false,
  fieldLabel: 'FIELD',
  fieldPlaceholder: 'Select a field',
  fieldErrorText: 'Please complete this field',
  operatorLabel: 'OPERATOR',
  operatorPlaceholder: 'Select an operator',
  operatorErrorText: 'Please complete this field',
  valueLabel: 'VALUE',
  valuePlaceholder: 'Enter a string or number',
  valueErrorText: 'Please complete this field',
  filterBuilderFieldOptions: [],
  filterBuilderOperatorOptions: [],
  filterBuilderOnSubmit: () => {},
  filters: [],
  onFilterChange: () => {},
  activeFilters: [],
  onRemoveAll: () => {},
  onRemoveTag: () => {},
  actions: [],
  actionLabel: 'Actions',
  onActionSelect: () => {},
  showSelectAllBadge: false,
  selectAllBadgeText: 'Select all *** nodes',
  onSelectAllBadgeClick: () => {},
  showClearAllBadge: false,
  clearAllBadgeText: 'Clear selection',
  onClearAllBadgeClick: () => {},
};

function TableHeader({
  children,
  rowCountText,
  selectedRowCountText,
  search,
  searchPlaceholder,
  searchValue,
  onSearchChange,
  FilterBuilder,
  filterBuilderFieldOptions,
  fieldLabel,
  fieldPlaceholder,
  fieldErrorText,
  operatorLabel,
  operatorPlaceholder,
  operatorErrorText,
  valueLabel,
  valuePlaceholder,
  valueErrorText,
  filterBuilderOperatorOptions,
  filterBuilderOnSubmit,
  filters,
  activeFilters,
  onFilterChange,
  onRemoveAll,
  onRemoveTag,
  actions,
  actionLabel,
  onActionSelect,
  showSelectAllBadge,
  selectAllBadgeText,
  onSelectAllBadgeClick,
  showClearAllBadge,
  clearAllBadgeText,
  onClearAllBadgeClick,
}) {
  return (
    <div className="dg-table-header-container">
      <div className="dg-table-header-content-container">
        {FilterBuilder && (
          <CreateFilterBuilder
            fieldOptions={filterBuilderFieldOptions}
            fieldPlaceholder={fieldPlaceholder}
            operatorOptions={filterBuilderOperatorOptions}
            onSubmit={filterBuilderOnSubmit}
            fieldLabel={fieldLabel}
            fieldErrorText={fieldErrorText}
            operatorLabel={operatorLabel}
            operatorPlaceholder={operatorPlaceholder}
            operatorErrorText={operatorErrorText}
            valueLabel={valueLabel}
            valuePlaceholder={valuePlaceholder}
            valueErrorText={valueErrorText}
          />
        )}
        {FilterBuilder && (filters.length > 0 || search) ? (
          <div className="dg-table-header-vertical-line-separator" />
        ) : null}
        {search && (
          <Input
            className="dg-table-header-search"
            name="dg-table-header-search"
            type="search"
            icon="search"
            placeholder={searchPlaceholder}
            value={searchValue}
            onChange={onSearchChange}
            aria-label="Search"
          />
        )}
        {filters.length > 0 && search ? (
          <div className="dg-table-header-vertical-line-separator" />
        ) : null}
        {filters.length > 0 && (
          <div>
            <QuickFilter filters={filters} onFilterSelect={onFilterChange} />
          </div>
        )}
        {actions.length > 0 ? (
          <ButtonSelect
            className="dg-table-action"
            type="transparent"
            options={actions}
            placeholder={actionLabel}
            anchor="bottom right"
            onChange={value => onActionSelect(value)}
          />
        ) : null}
      </div>
      {activeFilters.length > 0 && (
        <TagBuilder
          className="dg-table-header-tag-builder"
          filters={activeFilters}
          onRemoveAll={onRemoveAll}
          onRemoveTag={onRemoveTag}
        />
      )}
      <div className="dg-table-header-text-container">
        {!children ? (
          <Text size="small" color="medium" className="dg-table-row-count">
            {rowCountText || null}
            {rowCountText && selectedRowCountText ? ' - ' : null}
            {selectedRowCountText || null}
          </Text>
        ) : (
          children
        )}
        {showSelectAllBadge && (
          <Badge
            onClick={onSelectAllBadgeClick}
            className="dg-table-header-select-all"
            weight="subtle"
            type="info"
          >
            {selectAllBadgeText}
          </Badge>
        )}
        {showClearAllBadge && (
          <Badge
            onClick={onClearAllBadgeClick}
            className="dg-table-header-select-all"
            weight="subtle"
            type="danger"
          >
            {clearAllBadgeText}
          </Badge>
        )}
      </div>
    </div>
  );
}

TableHeader.propTypes = propTypes;
TableHeader.defaultProps = defaultProps;

export default TableHeader;
