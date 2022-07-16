import { PythonShell, PythonShellError } from "python-shell";

export interface ExecutionResult {
    isError: boolean;
    executionTime: string;
    errorMessage: string;
};

export function executePythonCode(codeToExecute: string): ExecutionResult {
    let result: ExecutionResult = { isError: true, executionTime: "", errorMessage: "" };
    PythonShell.runString(codeToExecute, {}, function (err?: PythonShellError, results?: string[]) {
        if (err) {
            result.isError = true;
            result.errorMessage = err.toString();
        }
        else {
            result.isError = false;
            result.executionTime = parseFloat(results![results!.length - 1]).toFixed(5);
        }
    });
    return result;
}