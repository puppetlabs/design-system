const Runner = require('jscodeshift/src/Runner.js');

module.exports = {
  excludedFiles: ['transform.js'],
  defaultDirectory: 'src/client/routes',
  postGenerate({ dest }) {
    const transformFile = '';
    const paths = [];
    const options = {};
    Runner.run(transformFile, paths, options);
  },
  message: function({ template, name, dest }) {
    return `Generated route and view for "${name}" in ${dest}`;
  },
};
