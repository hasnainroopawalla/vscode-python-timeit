import * as assert from 'assert';

import { parseFunctionHeader, generateExecutionTimePythonCode, FunctionArgument } from "../../utils";
import { functionArgumentsEqual } from "../testUtils";


suite('Utils Test Suite', () => {
	test('parseFunctionHeader basicFunction', () => {
		const code: string = `def add(x, y):\n\ta = x + 5\n\tb = y * 4\n\treturn a + b`;
		const [actualFunctionName, actualFunctionArguments] = parseFunctionHeader(code);
		const expectedFunctionName: string = "add";
		const expectedFunctionArguments: FunctionArgument[] = [
			{ name: 'x', datatype: '', value: '' },
			{ name: 'y', datatype: '', value: '' }
		];
		assert(functionArgumentsEqual(expectedFunctionArguments, actualFunctionArguments));
		assert.strictEqual(expectedFunctionName, actualFunctionName);
	});

	test('parseFunctionHeader functionWithTypeHints', () => {
		const code: string = `def subtract(a: int, b: float, c: float):\n\treturn a - b - c`;
		const [actualFunctionName, actualFunctionArguments] = parseFunctionHeader(code);
		const expectedFunctionName: string = "subtract";
		const expectedFunctionArguments: FunctionArgument[] = [
			{ name: 'a', datatype: 'int', value: '' },
			{ name: 'b', datatype: 'float', value: '' },
			{ name: 'c', datatype: 'float', value: '' }
		];
		assert(functionArgumentsEqual(expectedFunctionArguments, actualFunctionArguments));
		assert.strictEqual(expectedFunctionName, actualFunctionName);
	});

	test('parseFunctionHeader functionWithDefaultValues', () => {
		const code: string = `def divide(num1=98, num2= 345):\n\treturn num1/num2`;
		const [actualFunctionName, actualFunctionArguments] = parseFunctionHeader(code);
		const expectedFunctionName: string = "divide";
		const expectedFunctionArguments: FunctionArgument[] = [
			{ name: 'num1', datatype: '', value: '98' },
			{ name: 'num2', datatype: '', value: '345' },
		];
		assert(functionArgumentsEqual(expectedFunctionArguments, actualFunctionArguments));
		assert.strictEqual(expectedFunctionName, actualFunctionName);
	});

	test('parseFunctionHeader functionWithTypeHintsDefaultValues', () => {
		const code: string = `def multiply(a: int, b: float = 4, name:str="john"):\n\treturn a * b`;
		const [actualFunctionName, actualFunctionArguments] = parseFunctionHeader(code);
		const expectedFunctionName: string = "multiply";
		const expectedFunctionArguments: FunctionArgument[] = [
			{ name: 'a', datatype: 'int', value: '' },
			{ name: 'b', datatype: 'float', value: '4' },
			{ name: 'name', datatype: 'str', value: '"john"' }
		];
		assert(functionArgumentsEqual(expectedFunctionArguments, actualFunctionArguments));
		assert.strictEqual(expectedFunctionName, actualFunctionName);
	});
});
