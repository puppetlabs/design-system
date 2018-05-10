const parseVariables = require('./parseVariables');

const variables = parseVariables('src/styles/colors.css');

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
