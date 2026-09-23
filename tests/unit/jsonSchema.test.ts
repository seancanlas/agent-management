import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { JsonSchemaValidator } from '../src/utils/jsonSchema';

describe('JsonSchemaValidator', () => {
  let validator: JsonSchemaValidator;

  beforeEach(() => {
    validator = new JsonSchemaValidator();
  });

  it('should create ValidationResult interface', () => {
    expect(validator).toBeDefined();
  });

  it('should have validate method', () => {
    expect(typeof validator.validate).toBe('function');
  });

  it('should have loadSchema method', () => {
    expect(typeof validator.loadSchema).toBe('function');
  });
});