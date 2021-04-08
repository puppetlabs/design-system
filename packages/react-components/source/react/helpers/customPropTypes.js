import PropTypes from 'prop-types';

/**
 * Design system available element elevations
 */
export const elementElevation = PropTypes.oneOf([
  0,
  50,
  100,
  150,
  200,
  400,
  800,
]);

export const anchorOrientation = PropTypes.oneOf([
  'bottom right',
  'top right',
  'top left',
  'bottom left',
]);

export const reactRef = PropTypes.oneOfType([
  PropTypes.func,
  PropTypes.shape({ current: PropTypes.instanceOf(Element) }),
]);

const extendedErrorShape = {
  message: PropTypes.string.isRequired,
  sensitivity: PropTypes.number,
};

/**
 * Common error type for design system things. The error can be a string,
 * an Error instance, or can be any type satisfying an extended interface which
 * includes an optional array of error causes and set of field-specific
 * errors under 'items'
 */
export const error = PropTypes.oneOfType([
  PropTypes.string,
  PropTypes.instanceOf(Error),
  PropTypes.shape(extendedErrorShape),
]);

// recursive type definitions must be assigned after variable instantiation
extendedErrorShape.causes = PropTypes.arrayOf(error);
extendedErrorShape.items = PropTypes.objectOf(error);

/**
 * PropType wrapper that displays a deprecation message long with normal
 * propType checking.
 *
 * @example
 * const levelDeprecationMessage = 'Use of prop 'level' is deprecated. Please use 'color' instead.
 *
 *  propTypes = {
 *    level: deprecated(levelDeprecationMessage)(PropTypes.string).isRequired
 *  }
 *
 * NOTE: When applied to a prop you must also remove the defaultProps fallback,
 * since default props are assigned before propType checking
 * @param  {String} message Deprecation message
 */
export const deprecated = message => typeChecker => {
  if (process.env.NODE_ENV !== 'development') {
    return typeChecker;
  }

  return (props, key, componentName, location, propFullName) => {
    if (Object.hasOwnProperty.call(props, key)) {
      /* eslint-disable no-console */
      console.warn(message);
      /* eslint-enable */
    }

    return typeChecker(props, key, componentName, location, propFullName);
  };
};
