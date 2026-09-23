export interface AgentPackage {
    name: string;
    version: string;
    description: string;
    harnesses: string[];
}
export interface InstallOptions {
    name?: string | undefined;
    version?: string | undefined;
    harnesses?: string[] | undefined;
}
export interface InstallResult {
    success: boolean;
    package?: AgentPackage;
    error?: string;
    messages: string[];
}
export type FetchText = (url: string) => Promise<string>;
export type WriteText = (path: string, content: string) => Promise<void>;
export interface AgentManagerDependencies {
    fetchText?: FetchText;
    writeText?: WriteText;
    homeDir?: string;
}
export declare function githubBlobToRawUrl(source: string): {
    rawUrl: string;
    fileName: string;
};
export declare class AgentManager {
    private readonly dependencies;
    constructor(dependencies?: AgentManagerDependencies);
    installAgent(source: string, options?: InstallOptions): Promise<InstallResult>;
    listAgents(): Promise<AgentPackage[]>;
}
//# sourceMappingURL=agentManager.d.ts.map