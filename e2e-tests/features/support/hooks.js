/* eslint-disable func-names */
import { After } from 'cucumber';

After(function () {
  return this.driver.quit();
});
