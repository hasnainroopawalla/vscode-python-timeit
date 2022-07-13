# VS Code Python TimeIt

Display the execution time of a Python function by providing custom argument values.

<p align="center">
<img src="images/demo_time.gif" alt="Demo"/>
</p>

<p align="center">
<img src="images/demo_time_2.gif" alt="Demo"/>
</p>


## Features

* Simply select the entire function (including import statements if required) with the cursor and triggger the `Time It` command. 

* The generated function call with the specified arguments and the execution time is inserted as a comment above the selected code.

* Uses the built-in Python3 [time](https://docs.python.org/3/library/time.html) module to efficiently compute the execution time.

* Handles various types of Python function definitions including type hints and default values.


## Requirements

This extension requires the `python-shell` npm package ([source](https://www.npmjs.com/package/python-shell)). If this package is not detected, a prompt is generated for installation.

## Known Issue(s)

* The parser fails for Python functions which contain type hints for return type(s).
* The parser fails for functions with no arguments.

