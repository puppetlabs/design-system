import { map } from 'ramda';
import { string, bool, array as arrayType } from 'prop-types';
import React from 'react';
import { withControls } from '../../../styleguide/client/higherOrderComponents';
import { boolean, text, array, select } from '../../../styleguide/client/knobs';

import Input, { SUPPORTED_TYPES } from '.';
import Header from '../Header';

const typeOptions = map(type => ({ text: type, value: type }), SUPPORTED_TYPES);

const knobs = {
  type: select('Type', typeOptions, 'text'),
  label: text('Label', 'Field'),
  placeholder: text('Placeholder', 'placeholder'),
  inline: boolean('Inline', false),
  disabled: boolean('Disabled', false),
  errors: array('Errors', ''),
};

const InputStyleguide = ({
  type,
  inline,
  label,
  disabled,
  placeholder,
  errors,
}) => (
  <div>
    <Header>Input</Header>
    <Input
      id="styleguide-input-id"
      inline={inline}
      type={type}
      label={label}
      disabled={disabled}
      placeholder={placeholder}
      errors={errors}
      style={{ width: 500 }}
    />
  </div>
);

InputStyleguide.propTypes = {
  type: string,
  inline: bool,
  label: string,
  disabled: bool,
  placeholder: string,
  errors: arrayType,
};

InputStyleguide.defaultProps = {
  type: '',
  inline: false,
  label: '',
  disabled: false,
  placeholder: '',
  errors: false,
};

export default withControls({ knobs })(InputStyleguide);
