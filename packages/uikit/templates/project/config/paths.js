const path = require('path');
const { map } = require('ramda');

const paths = map(p => path.resolve.bind(null, __dirname, '..', p), {
  root: '',
  src: 'src',
  dist: 'dist',
  client: 'src/client',
  server: 'src/server',
});

module.exports = paths;
