import React, { Component } from 'react';
import { string, number, arrayOf, shape, node, func } from 'prop-types';
import { Text } from '@puppet/react-components';
import QuickFilter from '../quickFilter';
import PillBuilder from '../pillBuilder';
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
};

const defaultProps = {
  rowCountText: null,
  selectedRowCountText: null,
  children: undefined,
  filters: [],
  onFilterChange: () => {},
};

class TableHeader extends Component {
  constructor(props) {
    super(props);
    this.state = { selectedfilters: [] };
    this.onFilterSelect = this.onFilterSelect.bind(this);
  }

  onFilterUpdate() {
    const { onFilterChange } = this.props;
    const { selectedfilters } = this.state;
    onFilterChange(selectedfilters);
  }

  onFilterSelect(filter, label, value) {
    const newPill = { fieldLabel: label, value, field: filter };
    const { selectedfilters } = this.state;

    // if filter field already exists get me the id and change it
    if (selectedfilters.some(e => e.field === filter)) {
      const effectedIndex = selectedfilters.findIndex(x => x.field === filter);

      const newArray = selectedfilters;

      newArray.splice(effectedIndex, 1, newPill);

      this.setState(
        {
          selectedfilters: newArray,
        },
        () => this.onFilterUpdate(),
      );
    } else {
      this.setState(
        {
          selectedfilters: [...selectedfilters, newPill],
        },
        () => this.onFilterUpdate(),
      );
    }
  }

  onRemoveAll() {
    this.setState(
      {
        selectedfilters: [],
      },
      () => this.onFilterUpdate(),
    );
  }

  onRemovePill(pill) {
    const { selectedfilters } = this.state;
    const newArray = selectedfilters;

    const effectedIndex = selectedfilters.findIndex(x => x.field === pill);

    newArray.splice(effectedIndex, 1);

    this.setState(
      {
        selectedfilters: newArray,
      },
      () => this.onFilterUpdate(),
    );
  }

  render() {
    const {
      children,
      rowCountText,
      selectedRowCountText,
      filters,
    } = this.props;
    const { selectedfilters } = this.state;

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
            <QuickFilter
              filters={filters}
              onFilterSelect={this.onFilterSelect}
            />
            <PillBuilder
              filters={selectedfilters}
              onRemoveAll={() => this.onRemoveAll()}
              onRemovePill={pill => this.onRemovePill(pill)}
            />
          </div>
        )}
      </div>
    );
  }
}

TableHeader.propTypes = propTypes;
TableHeader.defaultProps = defaultProps;

export default TableHeader;
