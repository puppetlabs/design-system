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
    'prettier/prettier': 'error',
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
  },
  settings: {
    'import/resolver': {
      node: {
        paths: [
          path.resolve(__dirname, 'styleguide/client'),
          path.resolve(__dirname, 'src'),
        ],
      },
    },
  },
};
