import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { FileSystemUtils } from '../src/utils/fileOps';
import { join } from 'path';

describe('FileSystemUtils', () => {
  let fsUtils: FileSystemUtils;
  let testDir: string;
  let testFile: string;

  beforeEach(() => {
    fsUtils = new FileSystemUtils();
    testDir = './test-directory';
    testFile = join(testDir, 'test.txt');
  });

  afterEach(async () => {
    // Cleanup
    if (await fsUtils.exists(testDir)) {
      // In a real test, we would clean up files
      // For now, we'll just note the cleanup
    }
  });

  it('should create ensureDir method', () => {
    expect(typeof fsUtils.ensureDir).toBe('function');
  });

  it('should create readFile method', () => {
    expect(typeof fsUtils.readFile).toBe('function');
  });

  it('should create writeFile method', () => {
    expect(typeof fsUtils.writeFile).toBe('function');
  });

  it('should create exists method', () => {
    expect(typeof fsUtils.exists).toBe('function');
  });

  it('should create readdir method', () => {
    expect(typeof fsUtils.readdir).toBe('function');
  });

  it('should create stat method', () => {
    expect(typeof fsUtils.stat).toBe('function');
  });

  it('should create unlink method', () => {
    expect(typeof fsUtils.unlink).toBe('function');
  });

  it('should create symlink method', () => {
    expect(typeof fsUtils.symlink).toBe('function');
  });

  it('should create existsSync method', () => {
    expect(typeof fsUtils.existsSync).toBe('function');
  });

  it('should create join method', () => {
    expect(typeof fsUtils.join).toBe('function');
    expect(fsUtils.join('a', 'b', 'c')).toBe('a/b/c');
  });

  it('should create basename method', () => {
    expect(typeof fsUtils.basename).toBe('function');
    expect(fsUtils.basename('/path/to/file.txt')).toBe('file.txt');
  });
});