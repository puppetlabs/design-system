import PropTypes from 'prop-types';

export const renderableElement = PropTypes.oneOfType([
  PropTypes.string,
  PropTypes.func,
]);

export const elementElevation = PropTypes.oneOf([
  0,
  50,
  100,
  150,
  200,
  400,
  800,
]);
