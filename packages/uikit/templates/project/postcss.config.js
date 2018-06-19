// const parseVariables = require('./utils/parseVariables');

/**
 * Put parsed global css variables here
 */
const variables = {};

module.exports = {
  plugins: {
    'postcss-preset-env': {
      stage: 0,
      features: {
        'custom-properties': {
          variables,
          preserve: process.env.NODE_ENV !== 'production',
        },
      },
    },
  },
};
