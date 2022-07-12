import * as vscode from 'vscode';
import { PythonShell, PythonShellError } from 'python-shell';
import { getFirstLineOfCode, parseFunctionHeader, generateExecutionTimePythonCode, FunctionArgument } from "./utils";

function getfunctionArgumentsValues(functionArgument: FunctionArgument) {
	return vscode.window.showInputBox({
		placeHolder: `Enter value for ${functionArgument.name} (type: ${functionArgument.datatype}, default: ${functionArgument.value})`
	});
}

export function activate(context: vscode.ExtensionContext) {
	let disposable = vscode.commands.registerCommand('vscode-python-timeit.timeIt', async () => {
		const editor = vscode.window.activeTextEditor;

		if (!editor) {
			vscode.window.showInformationMessage("Editor does not exist.");
			return;
		}

		let selection = editor.selection;
		let code = editor.document.getText(selection).trim();

		let firstLineOfCode = getFirstLineOfCode(code);
		const [functionName, functionArguments] = parseFunctionHeader(firstLineOfCode);
		
		// Fetch argument values from the user
		for (let i = 0; i < functionArguments.length; i++) {
			let argValue = await getfunctionArgumentsValues(functionArguments[i]);
			if (argValue){ // If input is empty, use default value
				functionArguments[i].value = argValue!;
			}
		}
		
		let codeToExecute = generateExecutionTimePythonCode(code, functionName, functionArguments);
		console.log(codeToExecute);

		PythonShell.runString(codeToExecute, {}, function (err: PythonShellError, results?: string[]) {
			if (err) {
				vscode.window.showInformationMessage(err.toString());
			}
			else {
				let executionTime = parseFloat(results![results!.length - 1]).toFixed(5);
				vscode.window.showInformationMessage(`Execution Time: ${executionTime} seconds`);
				console.log('results: %j', results![results!.length - 1]);
			}

		});
	});

	context.subscriptions.push(disposable);
}

// this method is called when your extension is deactivated
export function deactivate() { }