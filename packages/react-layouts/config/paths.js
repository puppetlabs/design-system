const path = require('path');
const { map } = require('ramda');

const paths = map(p => path.resolve.bind(null, __dirname, '..', p), {
  root: '',
  src: 'src',
  dist: 'dist',
  styleguide: 'styleguide',
  styleguideDist: 'styleguide-dist',
  client: 'styleguide/client',
  server: 'styleguide/server',
});

module.exports = paths;
