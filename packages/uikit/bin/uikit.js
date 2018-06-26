#!/usr/bin/env node

const generate = require('./generate');

/**
 * Allowed template options for the generator script.
 * If you want to add a template please add here
 */
const TEMPLATE_OPTIONS = ['project', 'component'];

require('yargs') //eslint-disable-line
  .command(
    'generate [template] [name]',
    'Generate the specified template in the given root directory',
    yargs => {
      yargs.positional('template', {
        type: 'string',
        describe: 'The specified template',
        choices: TEMPLATE_OPTIONS,
      });

      yargs.positional('name', {
        type: 'string',
        describe: 'The name of the generated item',
      });
    },
    generate,
  )
  .help().argv;
