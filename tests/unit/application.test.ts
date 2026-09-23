import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { Application } from '../src/core/application';
import { AgentManager } from '../src/core/agentManager';

describe('Application', () => {
  let app: Application;

  beforeEach(() => {
    app = new Application();
  });

  it('should create Application instance', () => {
    expect(app).toBeDefined();
  });

  it('should have AgentManager', () => {
    const agentManager = app.getAgentManager();
    expect(agentManager).toBeInstanceOf(AgentManager);
  });

  it('should have DownloaderService', () => {
    const downloader = app.getDownloader();
    expect(downloader).toBeDefined();
  });

  it('should have ExtractorService', () => {
    const extractor = app.getExtractor();
    expect(extractor).toBeDefined();
  });

  it('should have ValidatorService', () => {
    const validator = app.getValidator();
    expect(validator).toBeDefined();
  });

  it('should have SymlinkService', () => {
    const symlinker = app.getSymlinker();
    expect(symlinker).toBeDefined();
  });
});