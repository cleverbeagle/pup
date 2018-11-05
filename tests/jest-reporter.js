/* eslint-disable */

const chalk = require('chalk');

class Reporter {
  constructor(globalConfig, options) {
    this._globalConfig = globalConfig; // eslint-disable-line
    this._options = options; // eslint-disable-line
  }

  onRunStart() {
    console.log('\n');
  }

  onTestResult(config, testFile) {
    const currentDirectory = process.cwd();
    const testPath = testFile.testFilePath.replace(currentDirectory, '');
    console.log(`${chalk.gray(testPath)}\n`);

    testFile.testResults.forEach((result) => {
      if (result.status === 'failed') {
        console.log(`  ${chalk.red('\u2715')} ${chalk.white(result.title)}${result.failureMessages.length ? '\n' : '\r'}`);
        result.failureMessages.forEach((failure) => {
          console.log(`  ${chalk.red(failure)} \n`);
        });
      }

      if (result.status === 'passed') console.log(`  ${chalk.green('\u2714')} ${chalk.white(result.title)}\r`);
    });
    console.log('\r');
  }

  onRunComplete(contexts, results) {
    const { testResults } = results;

    if (results.numTotalTests > 0) {
      console.log(`${chalk.blue('Test Results:')}\n`);

      console.log(`  ${chalk.red('\u2715')} ${chalk.white(`${results.numFailedTestSuites === 1 ? '1 failed suite' : `${results.numFailedTestSuites} failed suites`}`)}`);
      console.log(`  ${chalk.red('\u2715')} ${chalk.white(`${results.numFailedTests === 1 ? '1 failed test' : `${results.numFailedTests} failed tests`}`)}`);
  
      console.log(`  ${chalk.green('\u2714')} ${chalk.white(`${results.numPassedTestSuites === 1 ? 'passed suite' : `${results.numPassedTestSuites} passed suites`}`)}`);
      console.log(`  ${chalk.green('\u2714')} ${chalk.white(`${results.numPassedTests === 1 ? '1 passed test' : `${results.numPassedTests} passed tests`}`)}`);
  
      testResults.forEach(({ testExecError }) => {
        if (testExecError) console.log(chalk.red(testExecError));
      });
    }
  }
}

module.exports = Reporter;
