const path = require('path');
const { map } = require('ramda');

const paths = map(p => path.resolve.bind(null, __dirname, '..', p), {
  root: '',
  client: 'src/client',
  server: 'src/server',
  dist: 'dist',
});

module.exports = paths;
