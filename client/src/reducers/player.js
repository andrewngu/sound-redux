import * as types from '../constants/ActionTypes';
import { SESSION_STREAM_PLAYLIST } from '../constants/PlaylistConstants';

const initialState = {
  currentTime: 0,
  duration: 0,
  isPlaying: false,
  muted: false,
  repeat: false,
  shuffle: false,
  volume: 1,
  playingIndex: null,
  playlist: null,
};

const player = (state = initialState, action) => {
  switch (action.type) {
    case types.LOAD_NEW_STREAM_SONGS:
      return {
        ...state,
        playingIndex:
          state.playlist === SESSION_STREAM_PLAYLIST
          && state.playingIndex !== null
            ? state.playingIndex + action.newStreamSongs.length
            : state.playingIndex,
      };

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

    case types.PLAY_SONG:
      return {
        ...state,
        playingIndex: action.playingIndex,
        playlist: action.playlist,
      };

    case types.TOGGLE_REPEAT:
      return { ...state, repeat: !state.repeat };

    case types.TOGGLE_SHUFFLE:
      return { ...state, shuffle: !state.shuffle };

    case types.LOGOUT:
      return { ...initialState };

    default:
      return state;
  }
};

export default player;
