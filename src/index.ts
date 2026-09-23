#!/usr/bin/env node
"use strict";

import yargs from 'yargs';
import { hideBin } from 'yargs/helpers';
import { CLICommand } from './core/cliCommand';

async function main() {
  try {
    const cli = new CLICommand();
    
    await yargs(hideBin(process.argv))
      .scriptName('npx agents')
      .usage('$0 <command> [options]')
      .help()
      .alias('h', 'help')
      .version('1.0.0', 'v', 'Show version information')
      .alias('v', 'version')
      .command(
        'add <source>',
        'Add/install an agent from a source',
        (yargs) => {
          return yargs
            .positional('source', {
              describe: 'Source URL or GitHub repo',
              type: 'string',
            })
            .option('name', {
              describe: 'Custom name for the agent',
              type: 'string',
            })
            .option('version', {
              describe: 'Version to install',
              type: 'string',
            })
            .option('harnesses', {
              describe: 'Comma-separated list of harnesses',
              type: 'string',
            });
        },
        (args) => {
          cli.addCommand(args);
        }
      )
      .command(
        'list',
        'List installed agents',
        (yargs) => {
          return yargs.option('harnesses', {
            describe: 'Comma-separated list of harnesses',
            type: 'string',
          });
        },
        (args) => {
          cli.listCommand(args);
        }
      )
      .demandCommand(1, 'Please specify a command (add or list)')
      .strict()
      .parse();

  } catch (error) {
    console.error('❌ CLI Error:', error instanceof Error ? error.message : 'Unknown error');
    process.exit(1);
  }
}

export { main };