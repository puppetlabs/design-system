const Runner = require('jscodeshift/src/Runner.js');

module.exports = {
  excludedFiles: ['transform.js'],
  postGenerate({ dest }) {
    const transformFile = '';
    const paths = [];
    const options = {};
    Runner.run(transformFile, paths, options);
  },
  message: function({ template, name, dest }) {
    return `Generated page and route for "${name}"`;
  },
};
