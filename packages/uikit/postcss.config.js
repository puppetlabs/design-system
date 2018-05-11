const parseVariables = require('./parseVariables');

const variables = Object.assign(
  {},
  parseVariables('src/styles/colors.css'),
  parseVariables('src/styles/variables.css'),
);

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
