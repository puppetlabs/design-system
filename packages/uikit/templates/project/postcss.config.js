const parseVariables = require('./utils/parseVariables');

const variables = {
  ...parseVariables('src/styles/colors.css'),
  ...parseVariables('src/styles/variables.css'),
};

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
