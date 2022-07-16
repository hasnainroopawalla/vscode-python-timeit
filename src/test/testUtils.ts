import { FunctionArgument } from "../interfaces";

const objectsEqual = (o1: any, o2: any): boolean =>
    typeof o1 === 'object' && Object.keys(o1).length > 0
        ? Object.keys(o1).length === Object.keys(o2).length
        && Object.keys(o1).every(p => objectsEqual(o1[p], o2[p]))
        : o1 === o2;

export const functionArgumentsEqual = (expectedFunctionArguments: FunctionArgument[], actualFunctionArguments: FunctionArgument[]) =>
    expectedFunctionArguments.length === actualFunctionArguments.length && expectedFunctionArguments.every((o: FunctionArgument, idx: number) => objectsEqual(o, actualFunctionArguments[idx]));

