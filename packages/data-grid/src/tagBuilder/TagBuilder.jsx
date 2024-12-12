import React from 'react';
import { arrayOf, shape, func, string } from 'prop-types';
import { Tag, Button } from '@puppet/react-components';
import classNames from 'classnames';

import './TagBuilder.scss';

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
  onRemoveTag: func.isRequired,
  /** Callback function called when user clicks the remove all button */
  onRemoveAll: func.isRequired,
};

function TagBuilder({ filters, onRemoveTag, onRemoveAll }) {
  return (
    <div className="dg-tag-builder-container">
      <div className="dg-tag-container">
        {filters.map(({ field, fieldLabel, value }, idx) => {
          let displayValue = value;
          if (typeof value === 'boolean') {
            displayValue = value.toString();
          }
          const tagLabel = `${fieldLabel} = ${displayValue}`;
          return (
            <Tag
              className={classNames('dg-filter-tag', `dg-filter-tag-${idx}`)}
              onClick={() => onRemoveTag(field)}
              label={tagLabel}
              key={`dg-filter-tag-${idx + 1}`}
            />
          );
        })}
        {filters.length > 1 && (
          <Button
            className="dg-tag-remove-all-button"
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

TagBuilder.propTypes = propTypes;

export default TagBuilder;
