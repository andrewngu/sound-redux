import * as types from '../constants/ActionTypes';

const initialState = {
  currentTime: 0,
  isPlaying: false,
  playingIndex: null,
  playlistHistory: [],
};

export default function player(state = initialState, action) {
  switch (action.type) {
    case types.CHANGE_CURRENT_TIME:
      return Object.assign({}, state, {
        currentTime: action.time,
      });

    case types.CHANGE_PLAYING_SONG:
      return Object.assign({}, state, {
        playingIndex: action.songIndex,
      });

    case types.CHANGE_SELECTED_PLAYLISTS:
      return Object.assign({}, state, {
        playlistHistory: action.playlists,
      });

    case types.RESET_AUTHED:
      return Object.assign({}, state, initialState);

    case types.TOGGLE_IS_PLAYING:
      return Object.assign({}, state, {
        isPlaying: action.isPlaying,
      });

    default:
      return state;
  }
}
