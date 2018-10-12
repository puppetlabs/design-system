const fs = require('fs-extra');
const klawSync = require('klaw-sync');
const path = require('path');
const HandleBars = require('handlebars');

const getNameVariants = require('./getNameVariants/getNameVariants');

const postGenerateActions = {
  /**
   * Need to chmod +x generated scripts
   */
  project({ dest }) {
    const scripts = klawSync(`${dest}/scripts`);

    scripts.forEach(({ path: filePath }) => fs.chmodSync(filePath, 0o755));
  },
};

const generate = ({ template, name, directory }) => {
  const templatePath = path.resolve(__dirname, '../templates', template);
  const dest = path.resolve(process.cwd(), directory, name);
  const files = klawSync(templatePath);
  const model = { name: getNameVariants(name) };

  files.filter(({ stats }) => !stats.isDirectory()).forEach(file => {
    const extension = path.extname(file.path);
    const data = fs.readFileSync(file.path, 'utf8');

    let output;
    let newPath = path.join(dest, path.relative(templatePath, file.path));

    if (extension === '.handlebars') {
      output = HandleBars.compile(data)(model);
      newPath = HandleBars.compile(newPath.replace('.handlebars', ''))(model);
    } else {
      output = data;
    }

    fs.outputFileSync(newPath, output, 'utf8');
  });

  const postGenerateAction = postGenerateActions[template];

  if (postGenerateAction) {
    postGenerateAction({ dest });
  }

  console.log(`Generated ${template} "${name}" in ${dest}`);
};

module.exports = generate;
