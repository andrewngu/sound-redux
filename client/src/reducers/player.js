import * as types from '../constants/ActionTypes';

const initialState = {
  currentTime: 0,
  isPlaying: false,
  playingIndex: null,
  playlistHistory: [],
};

const player = (state = initialState, action) => {
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

    case types.PLAY_SONG:
      return {
        ...state,
        currentTime: 0,
        playingIndex: action.playingIndex,
        playlistHistory: [
          ...state.playlistHistory,
          ...state.playlistHistory[state.playlistHistory.length - 1] === action.playlist
            ? []
            : [action.playlist],
        ],
      };

    case types.TOGGLE_IS_PLAYING:
      return Object.assign({}, state, {
        isPlaying: action.isPlaying,
      });

    default:
      return state;
  }
};

export default player;
