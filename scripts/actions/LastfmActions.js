import * as types from '../constants/ActionTypes';
import { LastFm } from '../utils/LastfmUtils';

const LASTFM_KEY_PATH = 'LASTFM_SESSION_KEY';
const LASTFM_NAME_PATH = 'LASTFM_SESSION_NAME';

export function connectLastFM() {
  return dispatch => {
    window.LASTFM_AUTH = new LastFm();
    window.LASTFM_AUTH.connect().then(session => {
      localStorage.setItem(LASTFM_KEY_PATH, session.key);
      localStorage.setItem(LASTFM_NAME_PATH, session.name);
      dispatch(connectLastFMSuccess(session.name, session.key));
    });
  };
}

export function logoutLastfm() {
  localStorage.removeItem(LASTFM_KEY_PATH);
  localStorage.removeItem(LASTFM_NAME_PATH);
  return {
    type: types.LOGOUT_LASTFM,
  };
}

export function initLastFMAuth() {
  const key = localStorage.getItem(LASTFM_KEY_PATH);
  const name = localStorage.getItem(LASTFM_NAME_PATH);
  return connectLastFMSuccess(name, key);
}

function connectLastFMSuccess(username, sessionKey) {
  return {
    type: types.CONNECT_LASTFM_SUCCESS,
    username,
    sessionKey,
  };
}
