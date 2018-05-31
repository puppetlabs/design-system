const parseVariables = require('./utils/parseVariables');

const variables = {
  ...parseVariables('src/styles/colors.css'),
  ...parseVariables('src/styles/variables.css'),
};

module.exports = {
  plugins: {
    'postcss-cssnext': {
      features: {
        customProperties: {
          variables,
        },
      },
    },
  },
};
