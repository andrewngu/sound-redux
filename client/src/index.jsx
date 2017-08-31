/* global document */

import 'babel-polyfill';
import 'isomorphic-fetch';
import OfflinePluginRuntime from 'offline-plugin/runtime';
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

import '../styles/main.scss';
import RootContainer from './containers/RootContainer';
import configureStore from './store/configureStore';

OfflinePluginRuntime.install();

ReactDOM.render(
  <Provider store={configureStore()}>
    <RootContainer />
  </Provider>,
  document.getElementById('root'),
);
