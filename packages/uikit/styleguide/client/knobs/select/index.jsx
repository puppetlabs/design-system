import { string, func } from 'prop-types';
import React from 'react';
import { map, path, compose } from 'ramda';

const getValue = path(['target', 'value']);

const SelectOption = ({ text, value }) => <option value={value}>{text}</option>;

SelectOption.propTypes = {
  text: string.isRequired,
  value: string.isRequired,
};

const select = (label, options, fallback) => {
  const Knob = ({ value, updateValue }) => (
    <label htmlFor={label} style={{ display: 'block' }}>
      {label}
      <select
        id={label}
        name={label}
        value={value}
        onChange={compose(updateValue, getValue)}
      >
        {map(SelectOption, options)}
      </select>
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

export default select;
