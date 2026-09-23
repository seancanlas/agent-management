"use strict";

export interface AgentPackage {
  name: string;
  version: string;
  description: string;
  harnesses: string[];
}

export interface InstallOptions {
  name?: string;
  version?: string;
  harnesses?: string[];
}

export interface InstallResult {
  success: boolean;
  package?: AgentPackage;
  error?: string;
  messages: string[];
}

export class AgentManager {
  constructor() {}

  async installAgent(
    source: string,
    options: InstallOptions = {}
  ): Promise<InstallResult> {
    const agentPackage: AgentPackage = {
      name: options.name || 'example-agent',
      version: options.version || '1.0.0',
      description: 'Example agent for testing',
      harnesses: options.harnesses || ['opencode'],
    };

    return {
      success: true,
      package: agentPackage,
      messages: [
        `Downloaded from: ${source}`,
        `Installed: ${agentPackage.name}@${agentPackage.version}`,
      ],
    };
  }

  async listAgents(): Promise<AgentPackage[]> {
    return [
      {
        name: 'example-agent',
        version: '1.0.0',
        description: 'Example agent for testing',
        harnesses: ['opencode'],
      },
    ];
  }
}