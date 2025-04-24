const path = require('path');

module.exports = {
  env: {
    browser: true,
    es6: true,
    mocha: true,
  },
  parser: '@babel/eslint-parser',
  parserOptions: {
    babelOptions: {
      configFile: path.resolve(__dirname, '.babelrc'),
    },
  },
  plugins: ['prettier'],
  extends: ['airbnb', 'prettier'],
  rules: {
    'prettier/prettier': 'error',
    'react/jsx-filename-extension': [1, { extensions: ['.js', '.jsx'] }],
    'jsx-a11y/anchor-is-valid': [
      'error',
      {
        components: ['Link'],
        specialLink: ['as'],
      },
    ],
    'react/jsx-props-no-spreading': 0,
    'react/function-component-definition': 'off',
    'import/no-extraneous-dependencies': [
      'error',
      {
        optionalDependencies: false,
        peerDependencies: false,
      },
    ],
  },
};
