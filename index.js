#!/usr/bin/env node
const program = require('commander');

program
  .arguments('<command>')
  .arguments('<subcommand>')
  .action((command, subcommand) => {
    const func = require('./lib/' + command + '/' + subcommand);
    func.main();
  })
  .parse(process.argv);
