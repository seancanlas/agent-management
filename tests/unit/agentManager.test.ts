import { describe, expect, it } from 'vitest';
import { AgentManager, githubBlobToRawUrl } from '../../src/core/agentManager.js';
import { join } from 'node:path';

const source = 'https://github.com/affaan-m/ECC/blob/main/agents/kotlin-reviewer.md';
describe('AgentManager', () => {
  it('converts a GitHub blob URL to a raw URL', () => {
    expect(githubBlobToRawUrl(source)).toEqual({
      rawUrl: 'https://raw.githubusercontent.com/affaan-m/ECC/main/agents/kotlin-reviewer.md',
      fileName: 'kotlin-reviewer.md',
    });
  });

  it('rejects non-GitHub blob URLs', () => {
    expect(() => githubBlobToRawUrl('https://example.com/agent.md')).toThrow(
      'Only GitHub blob URLs are supported'
    );
  });

  it('fetches and installs a GitHub Markdown agent', async () => {
    const writes: Array<{ path: string; content: string }> = [];
    let requestedUrl = '';
    const manager = new AgentManager({
      homeDir: '/tmp/agent-management-test',
      fetchText: async (url) => {
        requestedUrl = url;
        return '# Kotlin Reviewer\n';
      },
      writeText: async (path, content) => {
        writes.push({ path, content });
      },
    });

    const result = await manager.installAgent(source);

    expect(result).toMatchObject({
      success: true,
      package: {
        name: 'kotlin-reviewer',
        version: '1.0.0',
        description: 'Installed GitHub agent',
        harnesses: ['opencode'],
      },
    });
    expect(requestedUrl).toBe(
      'https://raw.githubusercontent.com/affaan-m/ECC/main/agents/kotlin-reviewer.md'
    );
    expect(writes).toEqual([
      {
        path: join('/tmp/agent-management-test', '.config', 'opencode', 'agents', 'kotlin-reviewer.md'),
        content: '# Kotlin Reviewer\n',
      },
    ]);
  });

  it('rejects unsupported harnesses before fetching', async () => {
    let fetched = false;
    let wrote = false;
    const manager = new AgentManager({
      fetchText: async () => {
        fetched = true;
        return '# Kotlin Reviewer\n';
      },
      writeText: async () => {
        wrote = true;
      },
    });

    await expect(manager.installAgent(source, { harnesses: ['claude-code'] })).resolves.toMatchObject({
      success: false,
      error: 'Only the opencode harness is supported for Markdown agents',
    });
    expect(fetched).toBe(false);
    expect(wrote).toBe(false);
  });

  it('returns an error when fetching fails', async () => {
    const manager = new AgentManager({
      fetchText: async () => {
        throw new Error('network unavailable');
      },
      writeText: async () => {
        throw new Error('write should not be called');
      },
    });

    await expect(manager.installAgent(source)).resolves.toMatchObject({
      success: false,
      error: 'network unavailable',
    });
  });
});
