const path = require('path');
const { map } = require('ramda');

const paths = map(p => path.resolve.bind(null, __dirname, '..', p), {
  root: '',
  client: 'styleguide/client',
  server: 'styleguide/server',
  dist: 'dist',
});

module.exports = paths;
