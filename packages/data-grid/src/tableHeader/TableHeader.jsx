import React from 'react';
import { string, arrayOf, shape, node, func, bool } from 'prop-types';
import { Text, Input } from '@puppet/react-components';
import QuickFilter from '../quickFilter';
import TagBuilder from '../tagBuilder';
import './TableHeader.scss';

const propTypes = {
  /** Optional feature to display number of rows in table. Provide both the count and 'item' label in a string. */
  rowCountText: string,
  /** Optional feature to display number of rows selected in table. Provide both the count and 'selected' label in a string. */
  selectedRowCountText: string,
  /** Allows children to be rendered within the tableheader */
  children: node,
  /** Boolean value that determines if the seach box should be rendered */
  search: bool,
  /** String shown within blank input box */
  searchPlaceholder: string,
  /** The value shown in the input box */
  searchValue: string,
  /** Ran when user types into input box, returns new value */
  onSearchChange: func,
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
  onRemoveAll: func,
  onRemoveTag: func,
};

const defaultProps = {
  rowCountText: null,
  selectedRowCountText: null,
  children: undefined,
  search: false,
  searchPlaceholder: '',
  searchValue: '',
  onSearchChange: () => {},
  filters: [],
  onFilterChange: () => {},
  activeFilters: [],
  onRemoveAll: () => {},
  onRemoveTag: () => {},
};

function TableHeader({
  children,
  rowCountText,
  selectedRowCountText,
  search,
  searchPlaceholder,
  searchValue,
  onSearchChange,
  filters,
  activeFilters,
  onFilterChange,
  onRemoveAll,
  onRemoveTag,
}) {
  return (
    <div className="dg-table-header-container">
      <div className="dg-table-header-content-container">
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
      </div>
      {activeFilters.length > 0 && (
        <TagBuilder
          className="dg-table-header-tag-builder"
          filters={activeFilters}
          onRemoveAll={onRemoveAll}
          onRemoveTag={onRemoveTag}
        />
      )}
      {children === undefined ? (
        <Text size="small" color="medium" className="dg-table-row-count">
          {rowCountText || null}
          {rowCountText && selectedRowCountText ? ' - ' : null}
          {selectedRowCountText || null}
        </Text>
      ) : (
        children
      )}
    </div>
  );
}

TableHeader.propTypes = propTypes;
TableHeader.defaultProps = defaultProps;

export default TableHeader;
