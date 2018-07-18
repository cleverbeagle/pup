import { configure } from '@storybook/react';
import './styles.css';

// TODO add css for fontawesome or use their npm package
// automatically import all files ending in *.stories.js
const req = require.context('../ui/components', true, /stories.js$/);
req.keys().forEach(console.log);
function loadStories() {
  req.keys().forEach(filename => req(filename));
}

configure(loadStories, module);
