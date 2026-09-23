---
name: agent-management
description: "Agent management system for OpenCode, Claude Code, Cursor, and Codex. Mirrors npx skills architecture with commands: add, list, remove, find. Supports remote installation from URLs and integrates with multiple IDE/agent harnesses."
license: MIT
---

# Agent Management Skill

This skill provides a complete agent management system that mirrors the existing npx skills architecture but for managing agents across OpenCode, Claude Code, Cursor, and Codex.

## What It Does

The agent management skill provides:

1. **Core CLI Tool (`npx agents`)**: A comprehensive command-line interface with four essential commands:
   - `add`: Install agents from various sources (GitHub, URLs, local paths)
   - `list`: List all installed agents
   - `remove`: Remove agents from harnesses
   - `find`: Search for agents by name, version, or in specific harnesses

2. **Agent Package Structure**: Standardized package structure with:
   - `agent.json`: Agent metadata and configuration
   - `package.json`: npm package metadata
   - `README.md`: Documentation
   - `index.ts`: Main implementation
   - `SKILL.md`: Skills compatibility

3. **Harness Integration**: Seamless integration with four major platforms:
   - **OpenCode**: `~/.config/opencode/agents/`
   - **Claude Code**: `~/.config/claude-code/agents/`
   - **Cursor**: `~/.cursor/agents/`
   - **Codex**: `~/.codex/agents/`

4. **Migration Support**: Ability to migrate existing OpenCode agents to the new harness structure.

## When to Use

Use this skill when you need to:

- Manage agent packages across multiple platforms
- Install agents from GitHub repositories or URLs
- Maintain agent packages with proper versioning
- Create symlinks in harness directories for easy access
- Migrate existing agent configurations

## How to Use

### Basic Usage

```bash
# Add an agent from GitHub
npx agents add github:owner/agent-name

# List installed agents
npx agents list

# Find agents by name
npx agents find my-agent

# Remove an agent
npx agents remove my-agent
```

### Advanced Usage

```bash
# Install with specific options
npx agents add github:owner/agent-name \
  --name my-agent \
  --version 1.0.0 \
  --harnesses opencode,claude-code \
  --symlink \
  --global

# Search in specific harnesses
npx agents find --harnesses cursor,opencode
```

## Technical Architecture

### Core Components

1. **Application Class**: Dependency injection container
2. **AgentManager**: Orchestrates all agent operations
3. **DownloaderService**: Downloads agent packages
4. **ExtractorService**: Extracts downloaded packages
5. **ValidatorService**: Validates package structure
6. **SymlinkService**: Manages harness symlinks

### Dependency Injection

All services use dependency injection for testability and maintainability:

```typescript
const app = new Application();
const agentManager = app.getAgentManager();
const result = await agentManager.installAgent('github:owner/agent-name');
```

## API Reference

### AgentManager Methods

- `installAgent(source: string, options?: InstallOptions): Promise<InstallResult>`
- `listAgents(harnesses?: string[]): Promise<AgentPackage[]>`
- `removeAgent(name: string, version?: string, harnesses?: string[]): Promise<RemoveResult>`
- `findAgent(name?: string, version?: string, harnesses?: string[]): Promise<AgentPackage[]>`

### InstallOptions Interface

```typescript
interface InstallOptions {
  name?: string;
  version?: string;
  harnesses?: string[];
  symlink?: boolean;
  global?: boolean;
  force?: boolean;
  skipValidation?: boolean;
  outputDir?: string;
}
```

## File Structure

The skill follows a clean, organized structure:

```
/agent-management/
├── src/
│   ├── commands/           # CLI command implementations
│   │   ├── add.ts          # Add command
│   │   ├── list.ts         # List command
│   │   ├── remove.ts        # Remove command
│   │   └── find.ts         # Find command
│   ├── core/              # Core services and application
│   │   ├── application.ts  # Main application class
│   │   ├── agentManager.ts # Agent manager
│   │   ├── downloader.ts   # Download service
│   │   ├── extractor.ts    # Extraction service
│   │   ├── validator.ts    # Validation service
│   │   └── symlink.ts      # Symlink service
│   ├── utils/             # Utility classes
│   │   ├── fileOps.ts       # File system operations
│   │   ├── jsonSchema.ts    # JSON schema validation
│   │   └── pathUtils.ts     # Path utilities
│   └── types.ts           # TypeScript interfaces and types
├── scripts/                # Build and migration scripts
│   ├── generate-licenses.ts
│   └── installer.ts
├── tests/                  # Test suite
│   ├── unit/              # Unit tests
│   │   ├── downloader.test.ts
│   │   ├── extractor.test.ts
│   │   ├── validator.test.ts
│   │   └── symlink.test.ts
│   ├── integration/        # Integration tests
│   │   └── harness.test.ts
│   └── cli/                # CLI command tests
│       ├── add.test.ts
│       ├── list.test.ts
│       ├── remove.test.ts
│       └── find.test.ts
├── agent.json              # Agent package schema
├── README.md               # Documentation
└── SKILL.md                # Skill documentation
```

## Configuration

### Environment Variables

- `HOME` or `USERPROFILE`: Used to determine user home directory
- `AGENT_MANAGEMENT_HARNESS_PATH`: Override default harness path

### Configuration Files

- `~/.config/agent-management/config.json`: Global configuration
- `./.agent-management/config.json`: Local configuration

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

## Testing Requirements


The skill includes comprehensive tests:

- **Unit tests** for all core services
- **Integration tests** for harness integration
- **CLI command tests** for all commands
- **Migration script tests** for existing OpenCode agents

## Code Standards

- Follow TypeScript strict mode
- Use dependency injection for core services
- Implement comprehensive error handling
- Write unit tests for all core functionality
- Follow KISS and YAGNI principles

## Key Dependencies

- **axios**: HTTP client for downloading
- **fs-extra**: File system utilities
- **node-fetch**: Fetch API for downloads
- **tar**: Tar file extraction
- **yaml**: YAML parsing
- **yargs**: CLI argument parsing
- **@clack/prompts**: CLI prompts
- **prettier**: Code formatting
- **typescript**: TypeScript compiler
- **vitest**: Test framework

## Future Enhancements

1. **Plugin System**: Extend functionality with plugins
2. **Registry**: Agent registry with search and discovery
3. **Package Index**: Centralized agent index
4. **Authentication**: Secure agent authentication
5. **CI/CD Integration**: CI/CD pipeline support
6. **Documentation Generation**: Automatic documentation

## License

MIT

## Support

For support, please visit the GitHub repository or submit an issue.
