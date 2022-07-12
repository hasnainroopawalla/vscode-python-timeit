export interface FunctionArgument {
	name: string;
	value: string;
};

export function getFirstLineOfCode(code: string) {
	return code.substring(0, code.indexOf('\n'));
}

export function parseFunctionHeader(firstLineOfCode: string) {
	// function name starts from index 4 after 'def'
	let functionArguments: FunctionArgument[] = [];

	let argumentsStartIdx = firstLineOfCode.indexOf('(') + 1;
	let argumentsEndIdx = firstLineOfCode.indexOf(')') - 1;
	let functionName = firstLineOfCode.substring(4, argumentsStartIdx - 1);

	let argumentsSubstring = firstLineOfCode.substring(argumentsStartIdx, argumentsEndIdx + 1);
	let splitArgs = argumentsSubstring.split(',');
	for (let i = 0; i < splitArgs.length; i++) {
		let argumentTrimmed = splitArgs[i].trim();
		let argName = "";
		// check if type hints are specified
		if (argumentTrimmed.includes(':')) {
			argName = argumentTrimmed.substring(0, argumentTrimmed.indexOf(':')).trim();
		}
		else {
			argName = argumentTrimmed;
		}
		let arg: FunctionArgument = { name: argName, value: "" };
		functionArguments.push(arg);
	}
	return [functionName, functionArguments] as const;
}

export function generateExecutionTimePythonCode(code: string, functionName: string, functionArguments: FunctionArgument[]) {
	let functionCallString = `${functionName}(`;
	for (let i = 0; i < functionArguments.length; i++) {
		functionCallString += `${functionArguments[i].name}=${functionArguments[i].value},`;
	}
	functionCallString += ')';
	code = code + '\n' + 'import time\n' + 'start = time.time()\n' + functionCallString + '\n' + 'end = time.time()\n' + 'print(end - start)';
	return code;
}