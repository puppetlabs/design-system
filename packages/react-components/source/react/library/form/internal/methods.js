import React, { useEffect, useRef } from 'react';
import { componentHasType, mapObj, omit } from '../../../helpers/statics';
import FormField from '../FormField';

export const isEmpty = value => {
  if (typeof value === 'string') {
    return !value || !!value.match(/^\s*$/);
  }

  if (typeof value === 'number') {
    return value !== 0 && !value;
  }

  if (Array.isArray(value)) {
    return value.length === 0;
  }

  if (typeof value === 'object') {
    return !value || Object.keys(value).length === 0;
  }

  return !value;
};

/**
 * Collects the user provided props for all FormFields into
 * an object, with props indexed by name
 */
export const collectFieldProps = children => {
  const fields = {};

  React.Children.toArray(children)
    .filter(child => child && child.props)
    .forEach(child => {
      if (child.props.children) {
        Object.assign(fields, collectFieldProps(child.props.children));
      }

      if (componentHasType(child, FormField)) {
        fields[child.props.name] = child.props;
      }
    });

  return fields;
};

export const isFormValid = fieldProps =>
  !Object.values(fieldProps).some(props => props.blockingError);

const renderField = (
  child,
  { name, blockingError, nonBlockingError, ...otherUpdatedProps },
) =>
  React.createElement(child.type, {
    key: name,
    name,
    error: blockingError || nonBlockingError,
    ...otherUpdatedProps,
  });

export const renderChildren = (children, updatedFieldPropMap) =>
  React.Children.toArray(children)
    .filter(child => child)
    .map(child => {
      /**
       * If the child is a field, do special field rendering
       */
      if (componentHasType(child, FormField)) {
        return renderField(child, updatedFieldPropMap[child.props.name]);
      }

      /**
       * If the child has children, recurse. This will cover Form.Section and any wrapper divs
       */
      if (child.props && child.props.children) {
        return React.cloneElement(child, {
          children: renderChildren(child.props.children, updatedFieldPropMap),
        });
      }

      return child;
    });

export const usePrevious = value => {
  const ref = useRef();

  useEffect(() => {
    ref.current = value;
  }, [value]);

  return ref.current;
};

/**
 * Updates user provdided props to child Form.Field components with validation
 * and other context from the parent Form component
 */
export const updateFieldProps = (
  userProvidedFieldProps,
  validate,
  props,
  values,
  onChange,
) => {
  const {
    name,
    error,
    required,
    requiredFieldMessage,
    validator,
  } = userProvidedFieldProps;

  const { labelType, inline, inlineLabelWidth, disabled } = props;
  const value = values[name];

  let blockingError;

  if (validate) {
    if (required && isEmpty(value)) {
      blockingError = requiredFieldMessage;
    } else if (validator) {
      blockingError = validator(value, values);
    }
  }

  /**
   * These fields are removed because they are only used by the parent
   * Form element to set the final error value (above), not by the consuming
   * Form.Field
   */
  const fieldProps = omit(
    ['requiredFieldMessage', 'validator', 'error'],
    userProvidedFieldProps,
  );

  return {
    ...fieldProps,
    blockingError,
    nonBlockingError: error,
    disabled: disabled || userProvidedFieldProps.disabled, // Form overwrites field
    labelType: userProvidedFieldProps.labelType || labelType, // Field overwrites form
    inline: userProvidedFieldProps.inline || inline, // Field overwrites form
    inlineLabelWidth:
      userProvidedFieldProps.inlineLabelWidth || inlineLabelWidth, // Field overwrites form
    value: values[name],
    onChange: val => onChange(name, val),
  };
};

export const contextualizeOnChange = (
  values,
  setValues,
  isControlled,
  onChange,
) => (name, value) => {
  const newValues = {
    ...values,
    [name]: value,
  };

  if (!isControlled) {
    setValues(newValues);
  }

  onChange(name, newValues);
};

export const contextualizeOnSubmit = (
  props,
  setValidate,
  values,
  onChange,
) => async e => {
  e.preventDefault();
  const { children: userProvidedChildren, onSubmit } = props;

  setValidate(true);

  /**
   * Collect child props to run validation again, this time with custom
   * validators always on
   */
  const fieldProps = mapObj(
    collectFieldProps(userProvidedChildren),
    userProvidedFieldProps =>
      updateFieldProps(userProvidedFieldProps, true, props, values, onChange),
  );

  const isValid = isFormValid(fieldProps);

  if (isValid) {
    onSubmit(values);
  }
};
