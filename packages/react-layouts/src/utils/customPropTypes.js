/* eslint-disable import/prefer-default-export */
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
/* eslint-enable */
