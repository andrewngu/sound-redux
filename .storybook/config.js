import { configure } from '@kadira/storybook';
import '../styles/main.scss';

const req = require.context('./stories', true, /.stories.js$/)

function loadStories() {
  req.keys().sort().forEach((filename) => req(filename))
}

configure(loadStories, module);
