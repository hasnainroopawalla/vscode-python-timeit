# Change Log

## 20-July-2022 [1.3.8]
- Fixed a [bug](https://github.com/hasnainroopawalla/vscode-python-timeit/issues/1) that caused parsing errors for functions containing type hints for return type(s)
- Replaced the demo GIFs in the README

## 16-July-2022 [1.3.7]
- Fixed a bug that caused the result comment string to be inserted at the incorrect position when the another result comment string already existed

## 16-July-2022 [1.3.6]
- Fixed a [bug](https://github.com/hasnainroopawalla/vscode-python-timeit/issues/3) that caused parsing errors for functions containing argument(s) with default values as decimals
- Fixed a bug that caused the result comment string to be displayed at the incorrect position
- Added unit tests for the `utils` functions

## 13-July-2022 [1.3.5]
- Updated the logo (removed background to make it a vector)
  
## 13-July-2022 [1.3.4]
- Updated the description of the extension

## 13-July-2022 [1.3.3]
- Updated the README
  - Added status badges
  - *Known Issue* section - Deleted parsing functions with no arguments
- Added dates to the CHANGELOG

## 13-July-2022 [1.3.2]
- Added an icon for the extension
- Added the extension's logo to the README
- Added support for Python functions containing no arguments ([reference](https://github.com/hasnainroopawalla/vscode-python-timeit/issues/2))
  
## 13-July-2022 [1.3.1]
- Updated the extension's description

## 13-July-2022 [1.3.0]
- The working version of the extension can now be installed and used in Visual Studio Code
  
## 13-July-2022 [1.2.6]
- Updated the package.json file to preinstall `python-shell`

<!-- 
## 13-July-2022 [1.2.5]
- Changed the `python-shell` import statement

## 13-July-2022 [1.2.4]
- Removed the *node_modules* folder
- Updated the *package.json* file

## 13-July-2022 [1.2.3]
- Included the *node_modules* folder

## 13-July-2022 [1.2.2]
- Removed the `python-shell` not installed prompt and various unnecessary log statements

## 13-July-2022 [1.2.1]
- Added a prompt if `python-shell` is not installed
  - The *install* button creates a new terminal and runs `npm install python-shell` to install the package

## 12-July-2022 [1.2.0]
- Updated extension description
- Added `python-shell` as a dependency in *package.json*

## 12-July-2022 [1.0.0]
- Initial release -->