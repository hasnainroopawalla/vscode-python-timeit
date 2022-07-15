import * as assert from 'assert';
import * as vscode from 'vscode';

import * as utils from '../../utils';

suite('Utils Test Suite', () => {
	vscode.window.showInformationMessage('Start all tests.');

	test('parseFunctionHeader test', () => {
		const [functionName, functionArguments] = utils.parseFunctionHeader("def add(x, y)");
		console.log(functionName);
	});
});
