import * as vscode from 'vscode';
import {PythonShell} from 'python-shell';
import {getFirstLineOfCode, parseFunctionHeader, generateExecutionTimePythonCode} from "./utils";


function getArgsValues(key: string){
	return vscode.window.showInputBox({
		placeHolder: `Enter value for ${key}`
	});
}

export function activate(context: vscode.ExtensionContext) {
	let disposable = vscode.commands.registerCommand('vscode-python-timeit.timeIt', async () => {
		const editor = vscode.window.activeTextEditor;
		
		if (!editor){
			vscode.window.showInformationMessage("Editor does not exist.");
			return;
		}

		var selection = editor.selection;
		var code = editor.document.getText(selection).trim();
		
		let firstLineOfCode = getFirstLineOfCode(code);
		const [functionName, args] = parseFunctionHeader(firstLineOfCode);
		
		// Fetch argument values from the user
		for (let key in args) {
			args[key] = await getArgsValues(key);
		}

		let codeToExecute = generateExecutionTimePythonCode(code, functionName, args);
		console.log(codeToExecute);

		PythonShell.runString(codeToExecute, {}, function (err, results: string[]) {
			if (err) {
				vscode.window.showInformationMessage(err.toString());
			}
			else{
				let executionTime = parseFloat(results[results.length-1]).toFixed(5);
				vscode.window.showInformationMessage(`Execution Time: ${executionTime} seconds`);
				console.log('results: %j', results[results.length-1]);
			}
			
		});
	});

	context.subscriptions.push(disposable);
}

// this method is called when your extension is deactivated
export function deactivate() {}