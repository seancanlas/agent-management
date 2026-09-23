"use strict";
import { AgentManager } from './agentManager.js';
export class Application {
    agentManager;
    constructor(agentManager = new AgentManager()) {
        this.agentManager = agentManager;
    }
    getAgentManager() {
        return this.agentManager;
    }
}
//# sourceMappingURL=application.js.map