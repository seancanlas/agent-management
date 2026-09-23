export interface AgentPackage {
    name: string;
    version: string;
    description: string;
    harnesses: string[];
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
export declare class AgentManager {
    constructor();
    installAgent(source: string, options?: InstallOptions): Promise<InstallResult>;
    listAgents(): Promise<AgentPackage[]>;
}
//# sourceMappingURL=agentManager.d.ts.map