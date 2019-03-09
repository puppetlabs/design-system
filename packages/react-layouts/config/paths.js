const path = require('path');
const { map } = require('ramda');

const paths = map(p => path.resolve.bind(null, __dirname, '..', p), {
  root: '',
  styleguide: 'styleguide',
  dist: 'styleguide-dist',
  client: 'styleguide/client',
  server: 'styleguide/server',
});

module.exports = paths;
