export interface FunctionArgument {
	name: string;
	datatype: string;
	value: string;
};

export function parseFunctionHeader(code: string) {
	const functionHeaderRegExp: RegExp = /def (\w+)\s*\((.*?)\):/;
	let matches: string[] = code.match(functionHeaderRegExp)!;
	let functionName: string = matches[1];
	let functionArgumentsString: string = matches[2];

	let functionArgumentsStringSplit: string[] = functionArgumentsString.split(',');
	let functionArguments: FunctionArgument[] = [];
	const functionArgumentsRegExp: RegExp = /(\w*)\s?:?\s?(\w*)\s?=?\s?([\w"']*)/;

	for (let i = 0; i < functionArgumentsStringSplit.length; i++) {
		let argumentString: string = functionArgumentsStringSplit[i].trim();
		let argsMatches: string[] = argumentString.match(functionArgumentsRegExp)!;
		let variableName: string = argsMatches[1];
		let variableDataType: string = argsMatches[2];
		let variableValue: string = argsMatches[3];
		let functionArgument: FunctionArgument = { name: variableName, datatype: variableDataType, value: variableValue };
		functionArguments.push(functionArgument);
	}
	return [functionName, functionArguments] as const;
}

export function generateExecutionTimePythonCode(code: string, functionName: string, functionArguments: FunctionArgument[]) {
	let functionCallString = `${functionName}(`;
	for (let i = 0; i < functionArguments.length; i++) {
		functionCallString += `${functionArguments[i].name}=${functionArguments[i].value},`;
	}
	functionCallString = functionCallString.slice(0, -1); // discard the trailing comma
	functionCallString += ')';
	let codeToExecute: string = code + '\n' + 'import time\n' + 'start = time.time()\n' + functionCallString + '\n' + 'end = time.time()\n' + 'print(end - start)';
	return [codeToExecute, functionCallString] as const;
}