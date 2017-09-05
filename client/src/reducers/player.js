import * as types from '../constants/ActionTypes';

const initialState = {
  currentTime: 0,
  duration: 0,
  isPlaying: false,
  muted: false,
  repeat: false,
  shuffle: false,
  volume: 1,
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

    case types.ON_LOAD_START:
      return {
        ...state,
        currentTime: 0,
        duration: 0,
      };

    case types.ON_LOADED_METADATA:
      return {
        ...state,
        duration: action.duration,
      };

    case types.ON_PAUSE:
      return {
        ...state,
        isPlaying: false,
      };

    case types.ON_PLAY:
      return {
        ...state,
        isPlaying: true,
      };

    case types.ON_TIME_UPDATE:
      return {
        ...state,
        currentTime: action.currentTime,
      };

    case types.ON_VOLUME_CHANGE:
      return {
        ...state,
        muted: action.muted,
        volume: action.volume,
      };

    case types.RESET_AUTHED:
      return Object.assign({}, state, initialState);

    case types.PLAY_SONG:
      return {
        ...state,
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

    case types.TOGGLE_REPEAT:
      return { ...state, repeat: !state.repeat };

    case types.TOGGLE_SHUFFLE:
      return { ...state, shuffle: !state.shuffle };

    default:
      return state;
  }
};

export default player;
