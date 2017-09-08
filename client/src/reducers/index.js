import { combineReducers } from 'redux';
import authed from '../reducers/authed';
import entities from '../reducers/entities';
import environment from '../reducers/environment';
import history from '../reducers/history';
import modal from '../reducers/modal';
import navigator from '../reducers/navigator';
import router from '../reducers/router';
import player from '../reducers/player';
import playlists from '../reducers/playlists';
import session from '../reducers/session';

const rootReducer = combineReducers({
  authed,
  entities,
  environment,
  history,
  modal,
  navigator,
  player,
  playlists,
  router,
  session,
});

export default rootReducer;
