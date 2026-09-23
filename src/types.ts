"use strict";

export interface AgentPackage {
  name: string;
  version: string;
  description: string;
  harnesses: string[];
  skills: string[];
}

export interface InstallOptions {
  name?: string;
  version?: string;
  harnesses?: string[];
}

export interface InstallResult {
  success: boolean;
  package?: AgentPackage;
  error?: string;
  messages: string[];
}

export interface RemoveResult {
  success: boolean;
  removed?: { name: string; harness: string }[];
  error?: string;
  messages: string[];
}