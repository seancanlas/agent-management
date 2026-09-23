import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { ExampleAgent } from '../src/index';

describe('ExampleAgent', () => {
  let agent: ExampleAgent;

  beforeEach(() => {
    agent = new ExampleAgent('Test Agent', '1.0.0', 'A test agent');
  });

  it('should have correct name', () => {
    expect(agent.getName()).toBe('Test Agent');
  });

  it('should have correct version', () => {
    expect(agent.getVersion()).toBe('1.0.0');
  });

  it('should have correct description', () => {
    expect(agent.getDescription()).toBe('A test agent');
  });

  it('should greet correctly', () => {
    const greeting = agent.greet();
    expect(greeting).toContain('Hello from Test Agent');
    expect(greeting).toContain('version 1.0.0');
    expect(greeting).toContain('A test agent');
  });

  it('should perform task asynchronously', async () => {
    const result = await agent.performTask('test task');
    expect(result).toBe('Agent Test Agent is performing task: test task');
  });
});