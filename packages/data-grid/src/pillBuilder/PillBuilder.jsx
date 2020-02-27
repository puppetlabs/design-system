import React from 'react';
import { arrayOf, shape, func, string } from 'prop-types';
import { Button } from '@puppet/react-components';
import './PillBuilder.scss';

const propTypes = {
  /** Optional feature to display number of rows in table */
  filters: arrayOf(
    shape({
      /** The value returned when a remove button on a pill is clicked */
      field: string,
      /** The text shown in the first part of the pill */
      fieldLabel: string,
      /** The value shown on the second half of a pill */
      value: string,
    }),
  ).isRequired,
  /** Callback function called when user clicks a pill */
  onRemovePill: func.isRequired,
  /** Callback function called when user clicks the remove all button */
  onRemoveAll: func.isRequired,
};

function PillBuilder({ filters, onRemovePill, onRemoveAll }) {
  return (
    <div className="dg-pill-bulder-container">
      <div className="dg-pill-container">
        {filters.map(({ field, fieldLabel, value }, idx) => {
          let displayValue = value;
          if (typeof value === 'boolean') {
            displayValue = value.toString();
          }
          return (
            <Button
              className="dg-filter-pill"
              id={idx}
              trailingIcon="close"
              onKeyDown={() => onRemovePill(field)}
              onClick={() => onRemovePill(field)}
              weight="subtle"
            >
              {fieldLabel} = {displayValue}
            </Button>
          );
        })}
        {filters.length > 1 && (
          <Button
            className="dg-pill-remove-all-button"
            type="text"
            icon="close"
            onKeyDown={() => onRemoveAll()}
            onClick={() => onRemoveAll()}
          >
            Remove all
          </Button>
        )}
      </div>
    </div>
  );
}

PillBuilder.propTypes = propTypes;

export default PillBuilder;
