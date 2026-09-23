"use strict";

import fs from 'fs';
import path from 'path';

export class InstallerScript {
  static async installAgent(
    source: string,
    options: InstallOptions = {}
  ): Promise<void> {
    console.log(`🔄 Installing agent from: ${source}`);
    
    // Create output directory
    const outputDir = options.outputDir || './dist';
    if (!fs.existsSync(outputDir)) {
      fs.mkdirSync(outputDir, { recursive: true });
    }
    
    // Copy necessary files
    this.copyFiles('./src', outputDir);
    this.copyFiles('./package.json', outputDir);
    this.copyFiles('./agent.json', outputDir);
    this.copyFiles('./README.md', outputDir);
    this.copyFiles('./SKILL.md', outputDir);
    
    // Generate type definitions
    this.generateTypes(outputDir);
    
    console.log(`✅ Agent installed successfully to: ${outputDir}`);
  }

  static copyFiles(source: string, destination: string): void {
    if (!fs.existsSync(source)) return;
    
    const stat = fs.statSync(source);
    
    if (stat.isDirectory()) {
      if (!fs.existsSync(destination)) {
        fs.mkdirSync(destination, { recursive: true });
      }
      
      const files = fs.readdirSync(source);
      for (const file of files) {
        const sourcePath = path.join(source, file);
        const destPath = path.join(destination, file);
        this.copyFiles(sourcePath, destPath);
      }
    } else {
      fs.copyFileSync(source, destination);
    }
  }

  static generateTypes(outputDir: string): void {
    // In a real implementation, this would run TypeScript compiler
    console.log('📝 Generating type definitions...');
    // This is a placeholder - in production, you would run "tsc --declaration" here
  }
}

export interface InstallOptions {
  outputDir?: string;
  skipBuild?: boolean;
  generateTypes?: boolean;
}

export { InstallOptions };