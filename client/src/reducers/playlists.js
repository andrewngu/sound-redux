import * as types from '../constants/ActionTypes';
import { HISTORY_PLAYLIST, PLAYLIST_PLAYLIST_TYPE, SESSION_LIKES_PLAYLIST, SESSION_PLAYLIST_TYPE } from '../constants/PlaylistConstants';

const initialState = {
  isFetching: false,
  items: [],
  futureUrl: null,
  nextUrl: null,
};

function playlist(state = initialState, action) {
  switch (action.type) {
    case types.FETCH_SONGS_REQUEST:
      return {
        ...state,
        isFetching: true,
      };

    case types.FETCH_SONGS_SUCCESS:
      return {
        ...state,
        futureUrl: action.futureUrl,
        isFetching: false,
        items: [...state.items, ...action.items],
        nextUrl: action.nextUrl,
      };

    case types.PLAY_SONG: {
      if (action.playlist !== HISTORY_PLAYLIST) {
        return {
          ...state,
          items: [
            action.id,
            ...state.items.filter(id => id !== action.id),
          ],
        };
      }

      return state;
    }

    case types.TOGGLE_LIKE_SUCCESS:
      return {
        ...state,
        items: action.liked
          ? [action.id, ...state.items]
          : state.items.filter(id => id !== action.id),
      };

    default:
      return state;
  }
}

export default function playlists(state = {}, action) {
  switch (action.type) {
    case types.FETCH_SONGS_REQUEST:
    case types.FETCH_SONGS_SUCCESS:
      return {
        ...state,
        [action.playlist]: playlist(state[action.playlist], action),
      };

    case types.PLAY_SONG:
      return {
        ...state,
        [HISTORY_PLAYLIST]: playlist(
          state[HISTORY_PLAYLIST],
          {
            ...action,
            id: state[action.playlist].items[action.playingIndex],
          },
        ),
      };

    case types.TOGGLE_LIKE_SUCCESS:
      return {
        ...state,
        [SESSION_LIKES_PLAYLIST]: playlist(state[SESSION_LIKES_PLAYLIST], action),
      };

    case types.LOGOUT:
      return Object.keys(state)
        .filter((key) => {
          const type = key.split('|')[0];
          return type !== SESSION_PLAYLIST_TYPE && type !== PLAYLIST_PLAYLIST_TYPE;
        })
        .reduce((obj, key) => ({
          ...obj,
          [key]: state[key],
        }), {});

    default:
      return state;
  }
}
