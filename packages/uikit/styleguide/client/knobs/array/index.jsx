import { arrayOf, string, func } from 'prop-types';
import React from 'react';
import { path, compose, split, is } from 'ramda';

const getValue = path(['target', 'value']);

const text = (label, fallback, separator = ',') => {
  const Knob = ({ value, updateValue }) => (
    <label htmlFor={label}>
      {label}
      <input
        type="text"
        id={label}
        name={label}
        value={value}
        onChange={compose(updateValue, split(separator), getValue)}
      />
    </label>
  );

  Knob.propTypes = {
    value: arrayOf(string).isRequired,
    updateValue: func.isRequired,
  };

  return {
    fallback,
    Knob,
    parseValue: v => v && (is(Array, v) ? v : [v]),
  };
};

export default text;
