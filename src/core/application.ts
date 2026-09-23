"use strict";

import { AgentManager } from './agentManager';

export class Application {
  private agentManager: AgentManager;

  constructor() {
    this.agentManager = new AgentManager();
  }

  getAgentManager(): AgentManager {
    return this.agentManager;
  }
}