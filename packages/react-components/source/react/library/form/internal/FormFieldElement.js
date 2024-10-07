import React from 'react';
import PropTypes from 'prop-types';
import Input, {
  SUPPORTED_TYPES as INPUT_SUPPORTED_TYPES,
} from '../../input/Input';
import Select from '../../select';
import Switch from '../../switch';
import Checkbox from '../../checkbox';
import { omit } from '../../../helpers/statics';

export const supportedTypes = [
  ...INPUT_SUPPORTED_TYPES,
  'checkbox',
  'switch',
  'select',
  'autocomplete',
];

const propTypes = {
  /** The type of input to render. Can be either a string corresponding to a supported input type or a custom React component satisfying the input interface */
  type: PropTypes.oneOfType([
    PropTypes.oneOf(supportedTypes),
    PropTypes.elementType,
  ]).isRequired,
};

const isReactComponent = (c) =>
  (c && c.prototype && c.prototype.isReactComponent) || typeof c === 'function';

const mapTypeToElement = (type) => {
  if (isReactComponent(type)) {
    return type;
  }

  switch (type) {
    case 'checkbox':
      return Checkbox;
    case 'switch':
      return Switch;
    case 'select':
    case 'autocomplete':
    case 'multiselect':
      return Select;
    default:
      return Input;
  }
};

const FormFieldElement = (props) => {
  const { type } = props;

  const elementProps = omit(
    [
      'description',
      'inline',
      'inlineLabelWidth',
      'innerClassName',
      'labelType',
      'style',
      'requiredFieldMessage',
      'validateOnLoad',
      'validator',
    ],
    props,
  );

  const Element = mapTypeToElement(type);

  return <Element {...elementProps} />;
};

FormFieldElement.propTypes = propTypes;

export default FormFieldElement;
