import path from 'path';
import reactCosmosReduxProxy from 'react-cosmos-redux-proxy';
import configureStore from './scripts/store/configureStore';

module.exports = {
  componentPaths: [
    'scripts/components',
    'scripts/containers',
  ],
  ignore: [
    // Ignore HoC (which export functions instead of components)
    /.*ify$/,
    // Not useful because it requires parent node to have `display: flex`
    /MobileInfiniteScroll/,
  ],
  globalImports: [
    'styles/main.scss',
  ],
  proxies: [reactCosmosReduxProxy({
    createStore: configureStore,
  })],
  publicPath: 'server/public',
};
