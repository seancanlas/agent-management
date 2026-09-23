"use strict";
import { AgentManager } from './agentManager';
export class Application {
    agentManager;
    constructor() {
        this.agentManager = new AgentManager();
    }
    getAgentManager() {
        return this.agentManager;
    }
}
//# sourceMappingURL=application.js.map