export interface ExecutionResult {
    isError: boolean;
    executionTime: string;
    errorMessage: string;
};

export interface FunctionArgument {
    name: string;
    datatype: string;
    value: string;
};
