"use strict";

import { mkdir, readdir, writeFile as writeFileToDisk } from 'node:fs/promises';
import { homedir } from 'node:os';
import { basename, dirname, join } from 'node:path';

export interface AgentPackage {
  name: string;
  version: string;
  description: string;
  harnesses: string[];
}

export interface InstallOptions {
  name?: string | undefined;
  version?: string | undefined;
  harnesses?: string[] | undefined;
}

export interface InstallResult {
  success: boolean;
  package?: AgentPackage;
  error?: string;
  messages: string[];
}

export type FetchText = (url: string) => Promise<string>;
export type WriteText = (path: string, content: string) => Promise<void>;

export interface AgentManagerDependencies {
  fetchText?: FetchText;
  writeText?: WriteText;
  homeDir?: string;
}

const defaultFetchText: FetchText = async (url) => {
  const response = await fetch(url, {
    redirect: 'error',
    signal: AbortSignal.timeout(30_000),
  });
  if (!response.ok) {
    throw new Error(`Failed to fetch ${url}: HTTP ${response.status}`);
  }
  return response.text();
};

const defaultWriteText: WriteText = async (path, content) => {
  await mkdir(dirname(path), { recursive: true });
  await writeFileToDisk(path, content, { flag: 'wx' });
};

export function githubBlobToRawUrl(source: string): { rawUrl: string; fileName: string } {
  let sourceUrl: URL;
  try {
    sourceUrl = new URL(source);
  } catch {
    throw new Error('Invalid GitHub URL');
  }

  if (
    sourceUrl.protocol !== 'https:' ||
    sourceUrl.hostname !== 'github.com' ||
    sourceUrl.username ||
    sourceUrl.password
  ) {
    throw new Error('Only GitHub blob URLs are supported');
  }

  const segments = sourceUrl.pathname.split('/').filter(Boolean);
  const owner = segments[0];
  const repo = segments[1];
  const ref = segments[3];
  const fileSegments = segments.slice(4);

  if (
    segments[2] !== 'blob' ||
    !owner ||
    !repo ||
    !ref ||
    fileSegments.length === 0 ||
    fileSegments.includes('..')
  ) {
    throw new Error('Expected a GitHub blob URL such as https://github.com/owner/repo/blob/main/agent.md');
  }

  let fileName: string;
  try {
    fileName = decodeURIComponent(basename(fileSegments.join('/')));
  } catch {
    throw new Error('The GitHub URL contains an invalid file name');
  }

  if (!fileName.toLowerCase().endsWith('.md')) {
    throw new Error('The GitHub URL must point to a Markdown file');
  }

  return {
    rawUrl: `https://raw.githubusercontent.com/${owner}/${repo}/${ref}/${fileSegments.join('/')}`,
    fileName,
  };
}

function agentNameFrom(fileName: string, requestedName?: string): string {
  const name = (requestedName ?? fileName).replace(/\.md$/i, '').trim();
  if (!/^[A-Za-z0-9][A-Za-z0-9._-]*$/.test(name)) {
    throw new Error('Agent name must contain only letters, numbers, dots, underscores, and hyphens');
  }
  return name;
}

function harnessDirectory(harness: string, homeDir: string): string {
  if (harness !== 'opencode') {
    throw new Error('Only the opencode harness is supported for Markdown agents');
  }
  return join(homeDir, '.config', 'opencode', 'agents');
}

function versionFrom(value: string | undefined): string {
  const version = value || '1.0.0';
  if (!/^[A-Za-z0-9][A-Za-z0-9.+-]*$/.test(version)) {
    throw new Error('Agent version contains unsupported characters');
  }
  return version;
}

export class AgentManager {
  constructor(private readonly dependencies: AgentManagerDependencies = {}) {}

  async installAgent(
    source: string,
    options: InstallOptions = {}
  ): Promise<InstallResult> {
    try {
      const { rawUrl, fileName } = githubBlobToRawUrl(source);
      const name = agentNameFrom(fileName, options.name);
      const version = versionFrom(options.version);
      const harnesses = [...new Set(
        (options.harnesses ?? ['opencode'])
          .map((harness) => harness.trim())
          .filter(Boolean)
      )];
      const homeDir = this.dependencies.homeDir ?? homedir();

      if (harnesses.length === 0) {
        throw new Error('At least one harness is required');
      }
      for (const harness of harnesses) {
        harnessDirectory(harness, homeDir);
      }

      const content = await (this.dependencies.fetchText ?? defaultFetchText)(rawUrl);
      const installedPaths: string[] = [];
      for (const harness of harnesses) {
        const path = join(harnessDirectory(harness, homeDir), `${name}.md`);
        await (this.dependencies.writeText ?? defaultWriteText)(path, content);
        installedPaths.push(path);
      }

      return {
        success: true,
        package: {
          name,
          version,
          description: 'Installed GitHub agent',
          harnesses,
        },
        messages: [
          `Downloaded from: ${rawUrl}`,
          ...installedPaths.map((path) => `Installed: ${path}`),
        ],
      };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown installation error',
        messages: [],
      };
    }
  }

  async listAgents(): Promise<AgentPackage[]> {
    const directory = harnessDirectory('opencode', this.dependencies.homeDir ?? homedir());
    let entries;
    try {
      entries = await readdir(directory, { withFileTypes: true });
    } catch (error) {
      if ((error as NodeJS.ErrnoException).code === 'ENOENT') {
        return [];
      }
      throw error;
    }

    return entries
      .filter((entry) => entry.isFile() && entry.name.toLowerCase().endsWith('.md'))
      .map((entry) => ({
        name: entry.name.replace(/\.md$/i, ''),
        version: 'unknown',
        description: 'Installed GitHub agent',
        harnesses: ['opencode'],
      }))
      .filter((agent) => /^[A-Za-z0-9][A-Za-z0-9._-]*$/.test(agent.name));
  }
}
