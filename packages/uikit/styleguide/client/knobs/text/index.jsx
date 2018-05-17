import { string, func } from 'prop-types';
import React from 'react';
import { path, compose } from 'ramda';

const getValue = path(['target', 'value']);

const text = (label, fallback) => {
  const Knob = ({ value, updateValue }) => (
    <label htmlFor={label}>
      {label}
      <input
        type="text"
        id={label}
        name={label}
        value={value}
        onChange={compose(updateValue, getValue)}
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
    parseValue: v => v,
  };
};

export default text;
