import React, { useEffect, useRef } from 'react';
import {
  componentHasType,
  mapObj,
  omit,
  path,
  assocPath,
} from '../../../helpers/statics';
import FormField from '../FormField';

export const isEmpty = (value) => {
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
export const collectFieldProps = (children) => {
  const fields = {};

  React.Children.toArray(children)
    .filter((child) => child && child.props)
    .forEach((child) => {
      if (child.props.children) {
        Object.assign(fields, collectFieldProps(child.props.children));
      }

      if (componentHasType(child, FormField)) {
        fields[child.props.name] = child.props;
      }
    });

  return fields;
};

export const isFormValid = (fieldProps) =>
  !Object.values(fieldProps).some((props) => props.blockingError);

/**
 * Splits a path string into array segments
 */
const splitPath = (fieldPath) => {
  if (typeof fieldPath === 'string') {
    return fieldPath
      .split(/[.[\]]+/)
      .filter((p) => p)
      .map((p) => {
        const maybeNum = Number(p);

        return Number.isNaN(maybeNum) ? p : maybeNum;
      });
  }

  return [];
};

/**
 * Gets value at nested path in object
 */
const getValue = (fieldPath, object) => path(splitPath(fieldPath), object);

/**
 * Updates value at nested path in object
 */
const updateValue = (fieldPath, value, object) =>
  assocPath(splitPath(fieldPath), value, object);

/**
 * Flattens a nested object by picking off the values at the path specified
 * in each Form.Field definition
 */
export const flatten = (nestedObject, fieldPaths) => {
  const toReturn = {};
  Object.entries(fieldPaths).forEach(([field, fieldPath]) => {
    toReturn[field] = getValue(fieldPath, nestedObject);
  });
  return toReturn;
};

/**
 * Updates a nested data structure by updating with values from a flatObject
 * at the paths specified by the path in each Form.Field definition
 */
export const reconstitute = (flatObject, originalNestedObject, fieldPaths) => {
  let toReturn = originalNestedObject;

  Object.entries(fieldPaths).forEach(([field, fieldPath]) => {
    toReturn = updateValue(fieldPath, flatObject[field], toReturn);
  });

  return toReturn;
};

/**
 * Given an index of field props by name, returns an index of field paths by name,
 * setting the path to be the field name by default if not provided
 */
export const getFieldPaths = (fieldProps) =>
  mapObj(fieldProps, (props) => props.path || props.name);

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
    .filter((child) => child)
    .map((child) => {
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

export const usePrevious = (value) => {
  const ref = useRef();

  useEffect(() => {
    ref.current = value;
  }, [value]);

  return ref.current;
};

const getErrorMessage = (error) => {
  if (!error) {
    return '';
  }

  if (typeof error === 'string') {
    return error;
  }

  return error.message;
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
  formError,
  fieldPaths,
  onChange,
) => {
  const {
    name,
    error,
    required,
    requiredFieldMessage,
    validateOnLoad,
    validator,
  } = userProvidedFieldProps;

  const { labelType, inline, inlineLabelWidth, disabled } = props;
  const value = values[name];

  let blockingError;

  if (validate || validateOnLoad) {
    if (required && isEmpty(value)) {
      blockingError = requiredFieldMessage;
    } else if (validator) {
      blockingError = validator(value, values);
    }
  }

  const nonBlockingError =
    error || getErrorMessage(path(['items', fieldPaths[name]], formError));

  /**
   * These fields are removed because they are only used by the parent
   * Form element to set the final error value (above), not by the consuming
   * Form.Field
   */
  const fieldProps = omit(
    ['requiredFieldMessage', 'validateOnLoad', 'validator', 'error', 'path'],
    userProvidedFieldProps,
  );

  return {
    ...fieldProps,
    blockingError,
    nonBlockingError,
    disabled: disabled || userProvidedFieldProps.disabled, // Form overwrites field
    labelType: userProvidedFieldProps.labelType || labelType, // Field overwrites form
    inline: userProvidedFieldProps.inline || inline, // Field overwrites form
    inlineLabelWidth:
      userProvidedFieldProps.inlineLabelWidth || inlineLabelWidth, // Field overwrites form
    value: values[name],
    onChange: (val) => onChange(name, val),
  };
};

export const contextualizeOnChange =
  (values, fieldPaths, originalObject, setValues, isControlled, onChange) =>
  (name, value) => {
    const newValues = {
      ...values,
      [name]: value,
    };

    if (!isControlled) {
      setValues(newValues);
    }

    const unNested = reconstitute(
      {
        ...values,
        [name]: value,
      },
      originalObject,
      fieldPaths,
    );

    onChange(name, unNested);
  };

export const contextualizeOnSubmit =
  (props, fieldPaths, setValidate, values, onChange) => async (e) => {
    e.preventDefault();
    const {
      children: userProvidedChildren,
      onSubmit,
      initialValues,
      error,
    } = props;

    setValidate(true);

    /**
     * Collect child props to run validation again, this time with custom
     * validators always on
     */
    const fieldProps = mapObj(
      collectFieldProps(userProvidedChildren),
      (userProvidedFieldProps) =>
        updateFieldProps(
          userProvidedFieldProps,
          true,
          props,
          values,
          error,
          fieldPaths,
          onChange,
        ),
    );

    const isValid = isFormValid(fieldProps);

    if (isValid) {
      onSubmit(reconstitute(values, initialValues, fieldPaths));
    }
  };
