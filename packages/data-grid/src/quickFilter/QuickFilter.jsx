import React from 'react';
import { arrayOf, shape, func, string } from 'prop-types';
import { ButtonSelect } from '@puppet/react-components';
import './QuickFilter.scss';

const propTypes = {
  /** Allows you to pass an array to define each quick filter and its possible options */
  filters: arrayOf(
    shape({
      /** This is the label displayed on the action button,
       * the label text should be closely related to the table column which it will be filtering */
      fieldLabel: string,
      /** Unique key that should match datakey of column being filtered */
      field: string,
      /** Options are the possible selections that a user can pick from under a certain field */
      options: arrayOf(
        shape({
          /** Is the value returned after a users selection for a dataset to be filter by */
          value: string,
          /** Should you wish to add an icon to a specific row */
          icon: string,
          /** Text which will be displayed for each option */
          label: string,
        }),
      ),
    }),
  ).isRequired,
  /** Function called whenever a user clicks an action */
  onFilterSelect: func.isRequired,
};

function QuickFilter({ filters, onFilterSelect }) {
  /** Used for the options array when there is no items to filter by */
  const emptyFilterOption = [
    {
      label: 'No items to filter by',
      disabled: true,
    },
  ];

  return (
    <div className="dg-quick-filter-container">
      <div className="dg-quick-filter-filters">
        {filters.map((filter, idx) => {
          return !filter.options ? (
            <ButtonSelect
              className="dg-quick-filter-empty"
              id={`quick-filter-${filter.field}-${idx}`}
              key={`${idx + 1}`}
              type="tertiary"
              options={emptyFilterOption}
              placeholder={filter.fieldLabel}
            />
          ) : (
            <ButtonSelect
              className="dg-quick-filter"
              id={`quick-filter-${filter.field}-${idx}`}
              key={`${idx + 1}`}
              type="tertiary"
              options={filter.options}
              placeholder={filter.fieldLabel}
              onChange={value =>
                onFilterSelect(filter.field, filter.fieldLabel, value)
              }
            />
          );
        })}
      </div>
    </div>
  );
}

QuickFilter.propTypes = propTypes;

export default QuickFilter;
