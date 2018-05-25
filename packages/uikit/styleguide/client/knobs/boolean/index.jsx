import { string, func } from 'prop-types';
import React from 'react';
import { path, compose } from 'ramda';

const isChecked = path(['target', 'checked']);

const parseValue = value => value === 'true';

const boolean = (label, fallback) => {
  const Knob = ({ value, updateValue }) => (
    <label htmlFor={label}>
      {label}
      <input
        type="checkbox"
        id={label}
        name={label}
        checked={parseValue(value)}
        onChange={compose(
          updateValue,
          isChecked,
        )}
      />
    </label>
  );

  Knob.propTypes = {
    value: string.isRequired,
    updateValue: func.isRequired,
  };

  return {
    fallback,
    Knob,
    parseValue,
  };
};

export default boolean;
