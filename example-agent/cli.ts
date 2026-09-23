"use strict";

import yargs from 'yargs';
import { ExampleAgent } from './src/index';

async function main() {
  const argv = yargs(process.argv.slice(2))
    .scriptName('example-agent')
    .usage('$0 <command> [options]')
    .command(
      'greet',
      'Greet the agent',
      () => {},
      () => {
        const agent = new ExampleAgent('Example Agent', '1.0.0', 'A demo agent');
        console.log(agent.greet());
      }
    )
    .command(
      'task <task>',
      'Perform a task',
      (yargs) => {
        return yargs.positional('task', {
          describe: 'The task to perform',
          type: 'string',
        });
      },
      async (argv) => {
        const agent = new ExampleAgent('Example Agent', '1.0.0', 'A demo agent');
        const result = await agent.performTask(argv.task);
        console.log(result);
      }
    )
    .help()
    .alias('h', 'help')
    .version('1.0.0', 'v', 'Show version information')
    .alias('v', 'version')
    .parse();
}

if (require.main === module) {
  main();
}

export { main };