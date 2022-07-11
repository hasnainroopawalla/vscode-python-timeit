export function getFirstLineOfCode(code: string){
	return code.substring(0, code.indexOf('\n'));
}

export function parseFunctionHeader(firstLineOfCode: string){
	// function name starts from index 4 after 'def'
	let argumentsStartIdx = firstLineOfCode.indexOf('(') + 1;
	let argumentsEndIdx = firstLineOfCode.indexOf(')') - 1;
	let functionName = firstLineOfCode.substring(4, argumentsStartIdx - 1);

	let args: {[key: string]: string} = {};
	let argumentsSubstring = firstLineOfCode.substring(argumentsStartIdx, argumentsEndIdx + 1);
	let splitArgs = argumentsSubstring.split(',');
	for(let i = 0; i < splitArgs.length; i++){
		let argumentTrimmed = splitArgs[i].trim();
		let argName = "";
		// check if type hints are specified
		if (argumentTrimmed.includes(':')){
			argName = argumentTrimmed.substring(0, argumentTrimmed.indexOf(':')).trim();
		}
		else{
			argName = argumentTrimmed;
		}
		args[argName] = "";
	}
	return [functionName, args] as const;
}

export function generateExecutionTimePythonCode(code: string, functionName: string, args: {[key: string]: string}){
	let functionCall = `${functionName}(`;
	for (let key in args) {
		functionCall += `${key}=${args[key]},`;
	}
	functionCall += ')';
	code = code + '\n' + 'import time\n' + 'start = time.time()\n' + functionCall + '\n' + 'end = time.time()\n' + 'print(end - start)';
	return code;
}