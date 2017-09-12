import { combineReducers } from 'redux';
import entities from '../reducers/entities';
import environment from '../reducers/environment';
import history from '../reducers/history';
import router from '../reducers/router';
import player from '../reducers/player';
import playlists from '../reducers/playlists';
import session from '../reducers/session';

const rootReducer = combineReducers({
  entities,
  environment,
  history,
  player,
  playlists,
  router,
  session,
});

export default rootReducer;
