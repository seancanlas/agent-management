"use strict";

import { AgentManager } from './agentManager.js';

export class Application {
  private agentManager: AgentManager;

  constructor(agentManager: AgentManager = new AgentManager()) {
    this.agentManager = agentManager;
  }

  getAgentManager(): AgentManager {
    return this.agentManager;
  }
}