const fs = require('fs-extra');
const klawSync = require('klaw-sync');
const path = require('path');
const HandleBars = require('handlebars');

const getNameVariants = require('./getNameVariants/getNameVariants');

const generate = ({ template, name }) => {
  const templatePath = path.resolve(__dirname, '../templates', template);
  const dest = path.resolve(process.cwd(), name);
  const files = klawSync(templatePath);

  files.filter(({ stats }) => !stats.isDirectory()).forEach(file => {
    const extension = path.extname(file.path);
    const data = fs.readFileSync(file.path, 'utf8');

    let output;
    let newPath = path.join(dest, path.relative(templatePath, file.path));

    if (extension === '.handlebars') {
      const model = { name: getNameVariants(name) };
      output = HandleBars.compile(data)(model);
      newPath = HandleBars.compile(newPath.replace('.handlebars', ''))(model);
    } else {
      output = data;
    }

    fs.outputFileSync(newPath, output, 'utf8');
  });
};

module.exports = generate;
