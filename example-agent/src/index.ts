"use strict";
declare strict_types(1);

export class ExampleAgent {
  private name: string;
  private version: string;
  private description: string;

  constructor(name: string, version: string, description: string) {
    this.name = name;
    this.version = version;
    this.description = description;
  }

  public getName(): string {
    return this.name;
  }

  public getVersion(): string {
    return this.version;
  }

  public getDescription(): string {
    return this.description;
  }

  public greet(): string {
    return `Hello from ${this.name} version ${this.version}!\nDescription: ${this.description}`;
  }

  public async performTask(task: string): Promise<string> {
    return `Agent ${this.name} is performing task: ${task}`;
  }
}

export { ExampleAgent as default };