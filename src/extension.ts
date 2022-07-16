import * as vscode from 'vscode';
import { parseFunctionHeader, injectExecutionTimePythonSnippet } from "./utils";
import { ExecutionResult, FunctionArgument } from './interfaces';
import { PythonShell, PythonShellError } from "python-shell";

export function activate(context: vscode.ExtensionContext) {
	let disposable = vscode.commands.registerCommand('vscode-python-timeit.timeIt', async () => {
		const editor = vscode.window.activeTextEditor;

		if (!editor) {
			vscode.window.showInformationMessage("Editor does not exist.");
			return;
		}

		function getfunctionArgumentsValues(functionArgument: FunctionArgument) {
			return vscode.window.showInputBox({
				placeHolder: `Enter value for ${functionArgument.name} (type: ${functionArgument.datatype}, default: ${functionArgument.value})`
			});
		}

		function displayResult(result: ExecutionResult) {
			if (result.isError) {
				vscode.window.showInformationMessage(result.errorMessage);
			}
			else {
				let pos = new vscode.Position(editor?.selection.end.line as number + 1, 0);
				editor?.edit((edit) => {
					edit.insert(pos, `# ${functionCallString} => ${result.executionTime} seconds\n`);
				});
				vscode.window.showInformationMessage(`Execution Time: ${result.executionTime} seconds`);
			}
		}

		let code = editor.document.getText(editor.selection).trim();

		const [functionName, functionArguments] = parseFunctionHeader(code);

		// Fetch argument values from the user
		for (let i = 0; i < functionArguments.length; i++) {
			let argValue = await getfunctionArgumentsValues(functionArguments[i]);
			if (argValue) { // If input is empty, use the default argument value
				functionArguments[i].value = argValue!;
			}
		}

		const [codeToExecute, functionCallString] = injectExecutionTimePythonSnippet(code, functionName, functionArguments);

		var result: ExecutionResult = { isError: true, executionTime: "", errorMessage: "" };
		PythonShell.runString(codeToExecute, {}, function (err?: PythonShellError, results?: string[]) {
			if (err) {
				result.isError = true;
				result.errorMessage = err.toString();
			}
			else {
				result.isError = false;
				result.executionTime = parseFloat(results![results!.length - 1]).toFixed(5);
			}
			displayResult(result);
		});

	});
	context.subscriptions.push(disposable);
}

// this method is called when your extension is deactivated
export function deactivate() { }