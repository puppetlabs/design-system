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

const getActions = templatePath => {
  const uikitrcPath = path.resolve(templatePath, '.uikitrc.js');

  if (fs.existsSync(uikitrcPath)) {
    return require(uikitrcPath); // eslint-disable-line
  }

  return {};
};

const generate = ({ template, name, directory, modules }) => {
  const templatePath = path.resolve(__dirname, '../templates', template);
  const dest = path.resolve(process.cwd(), directory, name);
  const files = klawSync(templatePath);
  const model = { name: getNameVariants(name), modules };
  const { preGenerate = () => {}, postGenerate = () => {} } = getActions(
    templatePath,
  );

  preGenerate({ dest });

  files
    .filter(({ stats }) => !stats.isDirectory())
    .filter(({ path: p }) => !p.endsWith('.uikitrc.js'))
    .forEach(file => {
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

  postGenerate({ dest });

  console.log(`Generated ${template} "${name}" in ${dest}`);
};

module.exports = generate;
