import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { CLICommand } from '../src/core/cliCommand';

describe('CLICommand', () => {
  let cli: CLICommand;

  beforeEach(() => {
    cli = new CLICommand();
  });

  it('should create CLICommand instance', () => {
    expect(cli).toBeDefined();
  });

  it('should have setupYargs method', () => {
    expect(typeof cli.setupYargs).toBe('function');
  });
});