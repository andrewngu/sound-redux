import * as types from '../constants/ActionTypes';

const initialState = {
  playlists: [],
  showHistory: false,
};

const playlists = (state = [], action) => {
  switch (action.type) {
    case types.PLAY_SONG:
      return [
        ...state.filter(playlist => playlist !== action.playlist),
        ...action.playlist === state[state.length - 1]
          ? [action.playlist]
          : [],
      ];

    default:
      return state;
  }
};

const history = (state = initialState, action) => {
  switch (action.type) {
    case types.CHANGE_ROUTE:
      return {
        ...state,
        showHistory: false,
      };

    case types.PLAY_SONG:
      return {
        ...state,
        playlists: playlists(state.playlists, action),
      };

    case types.TOGGLE_SHOW_HISTORY:
      return {
        ...state,
        showHistory: !state.showHistory,
      };

    case types.LOGOUT:
      return { ...initialState };

    default:
      return state;
  }
};

export default history;
