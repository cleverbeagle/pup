// World is an isolated context for each scenario,
// exposed to Before and After hooks and steps as `this`
// Note: World is NOT exposed to BeforeAll and AfterAll hooks
import { setWorldConstructor } from 'cucumber';
import seleniumWebdriver from 'selenium-webdriver';

function CustomWorld() {
  this.driver = new seleniumWebdriver.Builder()
    .usingServer()
    .withCapabilities({ browserName: 'chrome' })
    .build();
}

setWorldConstructor(CustomWorld);
