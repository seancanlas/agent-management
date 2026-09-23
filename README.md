# Agent Management System

An agent management system for OpenCode, Claude Code, Cursor, and Codex that mirrors the existing npx skills architecture.

## Overview

This project provides a comprehensive agent management system that allows you to:

- **Add** agents from GitHub Markdown blob URLs
- **List** installed agents

## Features

### Core CLI Tool (`npx --package=@seancanlas/agentmp agentmp`)

The main CLI tool provides two essential commands:

- **`npx --package=@seancanlas/agentmp agentmp add <source>`**: Install an agent from a source
- **`npx --package=@seancanlas/agentmp agentmp list`**: List all installed agents

### Agent Package Structure

Each agent package follows a standardized structure:

```
my-agent/
├── agent.json          # Agent metadata and configuration
├── package.json        # npm package metadata
├── README.md           # Documentation
├── index.ts            # Main implementation
└── SKILL.md            # Skills compatibility
```

### Harness Integration

The current installer writes Markdown agents to the OpenCode harness:

- **OpenCode**: `~/.config/opencode/agents/`

## Installation

### From npm

```bash
npm install -g @seancanlas/agentmp
```

### Development

```bash
cd /Users/sean/Projects/agent-management
npm install
```

## Usage

### Add an Agent

Install a Markdown agent from a GitHub blob URL:

```bash
npx --package=@seancanlas/agentmp agentmp add https://github.com/owner/repo/blob/main/agents/agent.md
```

Install with custom metadata:

```bash
npx --package=@seancanlas/agentmp agentmp add https://github.com/owner/repo/blob/main/agents/agent.md \
  --name my-agent \
  --version 1.0.0 \
  --harnesses opencode
```

### List Agents

```bash
npx --package=@seancanlas/agentmp agentmp list
npx --package=@seancanlas/agentmp agentmp list --harnesses opencode
```

## API

The system provides a programmatic API for integration with other tools:

```typescript
import { Application } from './src/core/application';

const app = new Application();
const agentManager = app.getAgentManager();

// Install an agent
const result = await agentManager.installAgent('https://github.com/owner/repo/blob/main/agents/agent.md');

// List agents
const agents = await agentManager.listAgents();
```

## Development

### Building

```bash
npm run build
```

### Testing

```bash
npm run test
npm run test:run
npm run typecheck
```

### Linting and Formatting

```bash
npm run lint
npm run format
```

## Contributing

### Code Standards

- Follow TypeScript strict mode
- Use dependency injection for core services
- Implement comprehensive error handling
- Write unit tests for all core functionality
- Follow KISS and YAGNI principles

### Testing Requirements

The project includes comprehensive tests:

- **Unit tests** for all core services
- **Integration tests** for harness integration
- **CLI command tests** for all commands

## License

MIT

## Support

For support, please visit the GitHub repository or submit an issue.

---

**Note**: This project is designed to mirror the existing npx skills architecture while providing enhanced features for agent management across multiple platforms.

## Quick Start

```bash
# Install globally
npm install -g @seancanlas/agentmp

# Start using immediately
npx --package=@seancanlas/agentmp agentmp add https://github.com/owner/repo/blob/main/agents/agent.md
npx --package=@seancanlas/agentmp agentmp list
```

The system is designed to be intuitive and follows the familiar npx skills pattern, making it easy for developers to get started quickly.
Agents moved and symlinked
