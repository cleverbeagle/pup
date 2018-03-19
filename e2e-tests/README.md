# Installation

Install [chromedriver](https://www.npmjs.com/package/chromedriver) globally:
`npm install -g chromedriver`

# Running tests with development build

Start the application:
`npm start`

Then run the tests
`npm run test-e2e`

# The tech stack

We have chosen the following testing setup:

1. Cucumber.js - a test runner framework to "arrange, act and assert". Cucumber.js is a JavaScript implementation of Cucumber.

  [Cucumber](cucumber.io) is a tool for running automated tests written in plain language. By using the popular BDD language ([Given, When, Then](https://martinfowler.com/bliki/GivenWhenThen.html)), stakeholders, testers and developers can all have common understanding of the application features.

2. Standalone browser drivers to be able to interact with the browsers.

  If we want to test the application in Google Chrome then [ChromeDriver](https://www.npmjs.com/package/chromedriver) needs to be installed on the testing environment.

  If we want to test in Firefox then [geckodriver](https://github.com/mozilla/geckodriver/releases/) needs to be runnable.

3. [SeleniumWebdriver](https://www.npmjs.com/package/selenium-webdriver) - a browser automation library to be able automate the interactions with the aforementioned browser drivers.

3. [chai](https://www.npmjs.com/package/chai) - is an assertion library, similar to Node's build in assert. It makes testing much easier by giving you lots of assertions you can run against your code.

# Writing test code

## ES6/7 Babel support

The current configuration is using `babel-register` and `babel-polyfill`. These modules default to using the `.babelrc` file from the root folder. This means you can write test code in the same ES6/7 syntax as your application code.

## Code structure

### Feature files
`features/*.feature` files are written in plain English following the BDD "Given When Then" style.

### Step definitions
`features/support/*.step.js` files are the translations of feature files into actual testing code.

### World
`features/support/world.js` is an isolated context for each scenario - useful to
configure the webdrivers and other stuff

### Hooks
`features/support/hooks.js` allows to run code before and after each scenario - useful for setups and teardowns eg.: closing browser sessions.

# TODOS
* Shared helpers, hooks, configs etc.
* Page objects
* Screenshots
* Report config
* Running tests with production build
* Run e2e tests on pull requests to master (best to Dockerize and run in cloud)
* Integrate with Meteor
