const path = require('path');

module.exports = {
  env: {
    browser: true,
    jest: true,
  },
  parser: '@babel/eslint-parser',
  parserOptions: {
    babelOptions: {
      configFile: path.resolve(__dirname, '.babelrc'),
    },
  },
  extends: ['airbnb', 'prettier'],
  plugins: ['prettier', 'chai-friendly'],
  globals: {
    log: false,
  },
  rules: {
    'prettier/prettier': [
      'error',
      {
        singleQuote: true,
        trailingComma: 'all',
      },
    ],
    'no-unused-expressions': 0,
    'chai-friendly/no-unused-expressions': 2,
    'import/no-extraneous-dependencies': [
      'error',
      {
        devDependencies: true,
        optionalDependencies: true,
        peerDependencies: true,
      },
    ],
    'jsx-a11y/anchor-is-valid': [
      'error',
      {
        components: ['Link'],
        specialLink: ['to', 'button'],
      },
    ],
    'react/jsx-props-no-spreading': 0,
    'react/function-component-definition': 'off',
  },
  settings: {
    'import/resolver': {
      node: {
        paths: [path.resolve(__dirname, 'src')],
      },
    },
  },
};
