import React from 'react';
import { string, arrayOf, shape, node, func } from 'prop-types';
import { Text } from '@puppet/react-components';
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
  filters,
  activeFilters,
  onFilterChange,
  onRemoveAll,
  onRemoveTag,
}) {
  return (
    <div className="dg-table-header-container">
      {children === undefined ? (
        <Text as="h5" color="medium" className="dg-table-row-count">
          {rowCountText || null}
          {rowCountText && selectedRowCountText ? ' - ' : null}
          {selectedRowCountText || null}
        </Text>
      ) : (
        children
      )}
      {filters.length > 0 && (
        <div>
          <QuickFilter filters={filters} onFilterSelect={onFilterChange} />
          <TagBuilder
            filters={activeFilters}
            onRemoveAll={onRemoveAll}
            onRemoveTag={onRemoveTag}
          />
        </div>
      )}
    </div>
  );
}

TableHeader.propTypes = propTypes;
TableHeader.defaultProps = defaultProps;

export default TableHeader;
