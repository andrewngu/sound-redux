import { combineReducers } from 'redux';
import authed from '../reducers/authed';
import entities from '../reducers/entities';
import environment from '../reducers/environment';
import modal from '../reducers/modal';
import navigator from '../reducers/navigator';
import player from '../reducers/player';
import playlists from '../reducers/playlists';
import lastfm from '../reducers/lastfm';

const rootReducer = combineReducers({
  authed,
  entities,
  environment,
  modal,
  navigator,
  player,
  playlists,
  lastfm,
});

export default rootReducer;
