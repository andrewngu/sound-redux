import 'babel-core/polyfill';
import fetch from 'isomorphic-fetch';
import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import App from './containers/App';
import configureStore from './store/configureStore';
import {changeSong, toggleIsPlay} from './actions/player';
import {CHANGE_TYPES} from './constants/SongConstants';

require('../styles/main.scss');

const store = configureStore();

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById('main')
);

// Expose a global API for controlling the player.
// Used for example by the Electron Desktop wrapper for media key bindings.
window.Player = {
  nextSong() {
    store.dispatch(changeSong(CHANGE_TYPES.NEXT));
  },

  prevSong() {
    store.dispatch(changeSong(CHANGE_TYPES.PREV));
  },

  togglePlay() {
    const {player: {isPlaying}} = store.getState();
    store.dispatch(togglePlay(isPlaying));
  }
};
