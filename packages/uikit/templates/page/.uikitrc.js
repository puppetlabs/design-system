const { existsSync } = require('fs');
const { join } = require('path');
const Runner = require('jscodeshift/src/Runner.js');

module.exports = {
  excludedFiles: ['transform.js'],
  defaultDirectory: 'src/client/routes',
  postGenerate({ dest, name }) {
    const inputFile = join(
      process.cwd(),
      'src',
      'client',
      'routes',
      'index.js',
    );
    const transformFile = join(__dirname, 'transform.js');
    if (!existsSync(inputFile)) {
      console.log('Could not find src/client/routes/index.js');
      return process.exit(1);
    }
    Runner.run(transformFile, [inputFile], { name });
  },
  message: function({ template, name, dest }) {
    return `Generated route and view for "${name}" in ${dest}`;
  },
};
