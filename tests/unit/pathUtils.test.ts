import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { PathUtils } from '../src/utils/pathUtils';

describe('PathUtils', () => {
  let pathUtils: PathUtils;

  beforeEach(() => {
    pathUtils = new PathUtils();
  });

  it('should create PathUtils instance', () => {
    expect(pathUtils).toBeDefined();
  });

  it('should have join method', () => {
    expect(typeof pathUtils.join).toBe('function');
    expect(pathUtils.join('a', 'b', 'c')).toBe('a/b/c');
  });

  it('should have basename method', () => {
    expect(typeof pathUtils.basename).toBe('function');
    expect(pathUtils.basename('/path/to/file.txt')).toBe('file.txt');
  });

  it('should have dirname method', () => {
    expect(typeof pathUtils.dirname).toBe('function');
    expect(pathUtils.dirname('/path/to/file.txt')).toBe('/path/to');
  });

  it('should have extname method', () => {
    expect(typeof pathUtils.extname).toBe('function');
    expect(pathUtils.extname('/path/to/file.txt')).toBe('.txt');
  });

  it('should have resolve method', () => {
    expect(typeof pathUtils.resolve).toBe('function');
  });

  it('should have isAbsolute method', () => {
    expect(typeof pathUtils.isAbsolute).toBe('function');
    expect(pathUtils.isAbsolute('/absolute/path')).toBe(true);
    expect(pathUtils.isAbsolute('relative/path')).toBe(false);
  });

  it('should have relative method', () => {
    expect(typeof pathUtils.relative).toBe('function');
    expect(pathUtils.relative('/path/to', '/path/to/file.txt')).toBe('file.txt');
  });

  it('should have normalize method', () => {
    expect(typeof pathUtils.normalize).toBe('function');
    expect(pathUtils.normalize('a//b/../c')).toBe('a/c');
  });
});