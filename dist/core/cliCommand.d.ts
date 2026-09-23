import { Application } from '../core/application.js';
export interface AddCommandArgs {
    source: string;
    name?: string | undefined;
    version?: string | undefined;
    harnesses?: string | undefined;
}
export interface ListCommandArgs {
    harnesses?: string | undefined;
}
export declare class CLICommand {
    private app;
    constructor(app?: Application);
    addCommand(args: AddCommandArgs): Promise<void>;
    listCommand(args: ListCommandArgs): Promise<void>;
}
//# sourceMappingURL=cliCommand.d.ts.map