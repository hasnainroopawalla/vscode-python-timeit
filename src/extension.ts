import * as vscode from 'vscode';
import { PythonShell, PythonShellError } from 'python-shell';
import { parseFunctionHeader, generateExecutionTimePythonCode, FunctionArgument } from "./utils";


export function activate(context: vscode.ExtensionContext) {
	let disposable = vscode.commands.registerCommand('vscode-python-timeit.timeIt', async () => {
		const editor = vscode.window.activeTextEditor;

		if (!editor) {
			vscode.window.showInformationMessage("Editor does not exist.");
			return;
		}

		// Check if python-shell is installed
		try {
			require('python-shell');
		} catch {
			vscode.window
				.showInformationMessage('python-shell package required', 'Install')
				.then(selection => {
					const term = vscode.window.createTerminal('python-shell installer');
					term.show();
					term.sendText(`npm install python-shell`);
				});
			return;
		}

		function getfunctionArgumentsValues(functionArgument: FunctionArgument) {
			return vscode.window.showInputBox({
				placeHolder: `Enter value for ${functionArgument.name} (type: ${functionArgument.datatype}, default: ${functionArgument.value})`
			});
		}

		function displayExecutionTime(executionTime: string) {
			let pos = new vscode.Position(editor?.selection.active.line as number, editor?.selection.active.character as number);
			editor?.edit((edit) => {
				edit.insert(pos, `# ${functionCallString} => ${executionTime} seconds\n`);
			});
			vscode.window.showInformationMessage(`Execution Time: ${executionTime} seconds`);
		}

		let code = editor.document.getText(editor.selection).trim();

		const [functionName, functionArguments] = parseFunctionHeader(code);

		// Fetch argument values from the user
		for (let i = 0; i < functionArguments.length; i++) {
			let argValue = await getfunctionArgumentsValues(functionArguments[i]);
			if (argValue) { // If input is empty, use default value
				functionArguments[i].value = argValue!;
			}
		}

		const [codeToExecute, functionCallString] = generateExecutionTimePythonCode(code, functionName, functionArguments);

		PythonShell.runString(codeToExecute, {}, function (err: PythonShellError, results?: string[]) {
			if (err) {
				console.log(err);
				vscode.window.showInformationMessage(err.toString());
			}
			else {
				let executionTime: string = parseFloat(results![results!.length - 1]).toFixed(5);
				displayExecutionTime(executionTime);
				console.log('results: %j', results![results!.length - 1]);
			}

		});
	});
	context.subscriptions.push(disposable);
}

// this method is called when your extension is deactivated
export function deactivate() { }