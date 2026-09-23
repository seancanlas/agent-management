#!/usr/bin/env node
"use strict";
import yargs from 'yargs';
import { hideBin } from 'yargs/helpers';
import { CLICommand } from './core/cliCommand.js';
async function main() {
    try {
        const cli = new CLICommand();
        await yargs(hideBin(process.argv))
            .scriptName('agentmp')
            .usage('$0 <command> [options]')
            .help()
            .version(false)
            .alias('h', 'help')
            .command('add <source>', 'Add/install an agent from a source', (yargs) => {
            return yargs
                .positional('source', {
                describe: 'GitHub Markdown blob URL',
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
        }, (args) => {
            if (!args.source) {
                throw new Error('Source is required');
            }
            return cli.addCommand({
                source: args.source,
                name: args.name,
                version: args.version,
                harnesses: args.harnesses,
            });
        })
            .command('list', 'List installed agents', (yargs) => {
            return yargs.option('harnesses', {
                describe: 'Comma-separated list of harnesses',
                type: 'string',
            });
        }, (args) => cli.listCommand(args))
            .demandCommand(1, 'Please specify a command (add or list)')
            .strict()
            .parseAsync();
    }
    catch (error) {
        console.error('CLI Error:', error instanceof Error ? error.message : 'Unknown error');
        process.exitCode = 1;
    }
}
void main().catch((error) => {
    console.error('CLI Error:', error instanceof Error ? error.message : 'Unknown error');
    process.exitCode = 1;
});
//# sourceMappingURL=cli.js.map