"use strict";

import { expect } from 'vitest';
import { ExampleAgent } from './example-agent/src/index';

// Test the example agent functionality
const agent = new ExampleAgent('Test Agent', '1.0.0', 'A demo agent');

console.log('Testing Example Agent...');

// Test basic properties
expect(agent.getName()).toBe('Test Agent');
expect(agent.getVersion()).toBe('1.0.0');
expect(agent.getDescription()).toBe('A demo agent');

// Test greeting
const greeting = agent.greet();
expect(greeting).toContain('Hello from Test Agent');
expect(greeting).toContain('version 1.0.0');
expect(greeting).toContain('A demo agent');

// Test async task
await agent.performTask('test task');

console.log('✅ All tests passed!');