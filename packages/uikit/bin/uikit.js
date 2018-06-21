#!/usr/bin/env node

const generate = require('./generate');

require('yargs') //eslint-disable-line
  .command(
    'generate [template] [name]',
    'Generate the specified template in the given root directory',
    yargs => {
      yargs.positional('template', {
        type: 'string',
        describe: 'The specified template',
        choices: ['project'],
      });

      yargs.positional('name', {
        type: 'string',
        describe: 'The name of the generated item',
      });
    },
    generate,
  )
  .help().argv;
