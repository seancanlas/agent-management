"use strict";

import { Application } from '../core/application';

export class CLICommand {
  private app: Application;

  constructor() {
    this.app = new Application();
  }

  async addCommand(args: any): Promise<void> {
    console.log('Adding agent...');
    
    const options = {
      name: args.name,
      version: args.version,
      harnesses: args.harnesses ? args.harnesses.split(',') : undefined,
    };

    const result = await this.app.getAgentManager().installAgent(args.source, options);
    
    if (result.success) {
      console.log(`✅ Agent ${result.package?.name}@${result.package?.version} installed successfully!`);
      console.log(`📝 Description: ${result.package?.description}`);
      console.log(`🏷️  Harnesses: ${result.package?.harnesses.join(', ')}`);
    } else {
      console.error(`❌ Failed to install agent: ${result.error}`);
    }
  }

  async listCommand(args: any): Promise<void> {
    console.log('Listing agents...');
    
    // Handle harnesses option
    const harnesses = args.harnesses ? args.harnesses.split(',') : undefined;
    
    const agents = await this.app.getAgentManager().listAgents();
    
    // Filter by harnesses if specified
    const filteredAgents = harnesses ? agents.filter(agent => 
      agent.harnesses.some(harness => harnesses.includes(harness))
    ) : agents;
    
    if (filteredAgents.length === 0) {
      console.log('📭 No agents found.');
      return;
    }
    
    console.log('\n📋 Installed Agents:');
    console.log('='.repeat(60));
    
    for (const agent of filteredAgents) {
      console.log(`${agent.name}@${agent.version}
  📝 ${agent.description}
  🏷️  Harnesses: ${agent.harnesses.join(', ')}
`);
    }
  }
}