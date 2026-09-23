# Agent Management System

An agent management system for OpenCode, Claude Code, Cursor, and Codex that mirrors the existing npx skills architecture.

## Overview

This project provides a comprehensive agent management system that allows you to:

- **Add** agents from various sources (GitHub, URLs, local paths)
- **List** installed agents

## Features

### Core CLI Tool (`npx agents`)

The main CLI tool provides two essential commands:

- **`npx agents add <source>`**: Install an agent from a source
- **`npx agents list`**: List all installed agents

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

- **OpenCode**: `~/.config/opencode/agents/`
- **Claude Code**: `~/.config/claude-code/agents/`
- **Cursor**: `~/.cursor/agents/`
- **Codex**: `~/.codex/agents/`

## Installation

### From npm

```bash
npm install -g agent-management
```

### Development

```bash
cd /Users/sean/Projects/agent-management
npm install
```

## Usage

### Add an Agent

Install an agent from a GitHub repository:

```bash
npx agents add github:owner/agent-name
```

Install from a URL:

```bash
npx agents add https://github.com/owner/agent-name/archive/refs/heads/main.tar.gz
```

Install with custom options:

```bash
npx agents add github:owner/agent-name \
  --name my-agent \
  --version 1.0.0 \
  --harnesses opencode,claude-code \
  --symlink \
  --global
```

### List Agents

```bash
npx agents list
npx agents list --harnesses opencode,claude-code
```

## API

The system provides a programmatic API for integration with other tools:

```typescript
import { Application } from './src/core/application';

const app = new Application();
const agentManager = app.getAgentManager();

// Install an agent
const result = await agentManager.installAgent('github:owner/agent-name');

// List agents
const agents = await agentManager.listAgents(['opencode', 'claude-code']);
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
npm install -g agent-management

# Start using immediately
npx agents add github:owner/agent-name
npx agents list
```

The system is designed to be intuitive and follows the familiar npx skills pattern, making it easy for developers to get started quickly.
