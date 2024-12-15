import React from 'react';
import { string, arrayOf, shape, node, func, bool, oneOf } from 'prop-types';
import {
  Text,
  Input,
  Button,
  ButtonSelect,
  Badge,
} from '@puppet/react-components';
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
  /** Boolean value that determines if the search box should be rendered */
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
  /** Allows you to pass an array of Action buttons */
  actionButtons: arrayOf(
    /** Action button next to actions ( if visible ) to trigger an general action to the table. */
    shape({
      /** Text which will be displayed button  */
      label: string.isRequired,
      /** Optional icon to be rendered instead of / in addition to button text. */
      icon: string,
      /** Button visual variant */
      type: oneOf([
        'primary',
        'secondary',
        'tertiary',
        'danger',
        'transparent',
        'text',
      ]),
      /** Callback function called when the button is clicked */
      onClick: func.isRequired,
      /** Loading status of the action */
      loading: bool,
    }),
  ),
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
  filters: [],
  onFilterChange: () => {},
  activeFilters: [],
  onRemoveAll: () => {},
  onRemoveTag: () => {},
  actions: [],
  actionLabel: 'Actions',
  onActionSelect: () => {},
  actionButtons: [],
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
  filters,
  activeFilters,
  onFilterChange,
  onRemoveAll,
  onRemoveTag,
  actions,
  actionLabel,
  onActionSelect,
  actionButtons,
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
        <div className="dg-table-header-actions">
          {actions.length > 0 ? (
            <ButtonSelect
              className="dg-table-action"
              type="transparent"
              options={actions}
              placeholder={actionLabel}
              anchor="bottom right"
              onChange={(value) => onActionSelect(value)}
            />
          ) : null}
          {actionButtons.length > 0 &&
            actionButtons.map((actionButton) =>
              typeof actionButton.onClick === 'function' &&
              actionButton.label !== '' ? (
                <Button
                  className="dg-table-action"
                  icon={actionButton.icon}
                  onClick={actionButton.onClick}
                  type={actionButton.type}
                  loading={actionButton.loading}
                  key={actionButton.label}
                >
                  {actionButton.label}
                </Button>
              ) : null,
            )}
        </div>
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
