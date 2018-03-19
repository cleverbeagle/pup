/* eslint-disable func-names */
import { Given, When, Then } from 'cucumber';
import { expect } from 'chai';
import { until, By } from 'selenium-webdriver';

Given('I am on the login page', async function () {
  await this.driver.get('http://localhost:3000/login');
  await this.driver.wait(until.elementLocated(By.css('div.Login')));
});

When('I enter my login details', async function () {
  const email = await this.driver.findElement(By.css('input[name="emailAddress"]'));
  await email.clear();
  await email.sendKeys('admin@admin.com');

  const password = await this.driver.findElement(By.css('input[name="password"]'));
  await password.clear();
  await password.sendKeys('password');
});

When('I click login', async function () {
  const loginButton = await this.driver.findElement(By.css('div.Login button[type="submit"]'));
  loginButton.click();
});

Then(/I am logged in as "(.*)"/, async function (name) {
  const element = await this.driver.wait(until.elementLocated(By.css('#user-nav-dropdown')));
  const userName = await element.getText();
  return expect(userName).to.eql(name);
});
