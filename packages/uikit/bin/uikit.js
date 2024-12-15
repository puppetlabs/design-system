#!/usr/bin/env node

const generate = require('./generate');

/**
 * Allowed template options for the generator script.
 * If you want to add a template please add here
 */
const TEMPLATE_OPTIONS = ['project', 'library', 'page', 'component', 'method'];

require('yargs') //eslint-disable-line
  .command({
    command: 'generate <template> <name>',
    aliases: ['g'],
    desc: 'Generate the specified template in the given root directory',
    builder: (yargs) => {
      yargs.positional('template', {
        type: 'string',
        describe: 'The specified template',
        choices: TEMPLATE_OPTIONS,
      });

      yargs.positional('name', {
        type: 'string',
        describe: 'The name of the generated item',
      });

      yargs.option('directory', {
        alias: 'd',
        type: 'string',
        default: '',
        describe: 'The root directory in which to generate the template',
      });

      yargs.option('modules', {
        alias: 'm',
        default: false,
        describe: 'Generate scss boilerplate using css modules',
      });
    },
    handler: generate,
  })
  .alias('g', 'generate')
  .help().argv;
