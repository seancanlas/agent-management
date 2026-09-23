"use strict";
export class AgentManager {
    constructor() { }
    async installAgent(source, options = {}) {
        const agentPackage = {
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
    async listAgents() {
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
//# sourceMappingURL=agentManager.js.map