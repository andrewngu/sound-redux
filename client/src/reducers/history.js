import * as types from '../constants/ActionTypes';

const initialState = {
  playlists: [],
  showHistory: false,
  songs: [],
};

const history = (state = initialState, action) => {
  switch (action.type) {
    case types.PLAY_SONG:
      return {
        ...state,
        playlists: [
          ...state.playlists.filter(playlist => playlist !== action.playlist),
          ...action.playlist === state.playlists[state.playlists.length - 1]
            ? [action.playlist]
            : [],
        ],
        songs: [
          ...state.songs.filter(id => id !== action.id),
          action.id,
        ],
      };

    case types.TOGGLE_SHOW_HISTORY:
      return {
        ...state,
        showHistory: !state.showHistory,
      };

    default:
      return state;
  }
};

export default history;
