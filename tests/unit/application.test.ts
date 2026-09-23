import { describe, expect, it } from 'vitest';
import { Application } from '../../src/core/application.js';
import { AgentManager } from '../../src/core/agentManager.js';

describe('Application', () => {
  it('creates an AgentManager', () => {
    const app = new Application();
    expect(app.getAgentManager()).toBeInstanceOf(AgentManager);
  });
});
