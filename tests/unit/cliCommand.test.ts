import { describe, expect, it } from 'vitest';
import { CLICommand } from '../../src/core/cliCommand.js';

describe('CLICommand', () => {
  it('creates a CLI command', () => {
    expect(new CLICommand()).toBeDefined();
  });
});
