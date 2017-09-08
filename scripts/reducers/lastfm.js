import * as types from '../constants/ActionTypes';

const initialState = {
  username: null,
  sessionKey: null,
};

export default function lastfm(state = initialState, action) {
  switch (action.type) {
    case types.CONNECT_LASTFM_SUCCESS:
      return Object.assign({}, state, {
        username: action.username,
        sessionKey: action.sessionKey,
      });

    case types.LOGOUT_LASTFM:
      return Object.assign({}, state, initialState);

    default:
      return state;
  }
}
