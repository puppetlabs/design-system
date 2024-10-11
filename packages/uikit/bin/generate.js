const fs = require('fs-extra');
const klawSync = require('klaw-sync');
const path = require('path');
const HandleBars = require('handlebars');

HandleBars.registerHelper('inline-if', (condition, t, f) => {
  if (condition) {
    return t;
  }

  return f;
});

const getNameVariants = require('./getNameVariants/getNameVariants');

/**
 * The preGenerate hook can be used if files need to be overlaid afterwards
 */

const getActions = (templatePath) => {
  const uikitrcPath = path.resolve(templatePath, '.uikitrc.js');

  if (fs.existsSync(uikitrcPath)) {
    return require(uikitrcPath); // eslint-disable-line
  }

  return {};
};

const generate = ({ template, name, directory, modules }) => {
  const templatePath = path.resolve(__dirname, '../templates', template);
  const files = klawSync(templatePath);
  const nameVariants = getNameVariants(name);
  const model = { name: nameVariants, modules };
  const { defaultDirectory = '' } = getActions(templatePath);
  const dest = path.resolve(process.cwd(), directory || defaultDirectory, name);
  const {
    preGenerate = () => {},
    postGenerate = () => {},
    message = () => `Generated ${template} "${name}" in ${dest}`,
    excludedFiles = [],
  } = getActions(templatePath);
  const allExcludedFiles = excludedFiles.concat(['.uikitrc.js']);

  preGenerate({ dest, name });

  files
    .filter(({ stats }) => !stats.isDirectory())
    .filter(
      ({ path: p }) =>
        !allExcludedFiles.some((excludedFile) => p.endsWith(excludedFile)),
    )
    .forEach((file) => {
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

  postGenerate({ dest, name });

  console.log(message({ template, name, dest }));
};

module.exports = generate;
