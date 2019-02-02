import PropTypes from 'prop-types';

/**
 * PropType for anything that can be rendered as a JSX element. Most often this
 * will be used for the flexible element rendering 'as' prop. See library/card/Card.js
 * for an example.
 */
export const renderableElement = PropTypes.oneOfType([
  PropTypes.string,
  PropTypes.func,
]);

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

/**
 * Design system common form sizes
 */
export const formSize = PropTypes.oneOf(['medium', 'small']);

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
