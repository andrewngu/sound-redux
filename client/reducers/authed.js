import * as types from '../constants/ActionTypes';

const initialState = {
  accessToken: null,
  followings: {},
  likes: {},
  newStreamSongs: [],
  playlists: [],
  user: null,
};

export default function authed(state = initialState, action) {
  switch (action.type) {
    case types.RECEIVE_ACCESS_TOKEN:
      return Object.assign({}, state, {
        accessToken: action.accessToken,
      });

    case types.RECEIVE_AUTHED_USER:
      return Object.assign({}, state, {
        user: action.user,
      });

    case types.RECEIVE_AUTHED_FOLLOWINGS:
      return Object.assign({}, state, {
        followings: action.users,
      });

    case types.RECEIVE_AUTHED_PLAYLISTS:
      return Object.assign({}, state, {
        playlists: action.playlists,
      });

    case types.RECEIVE_LIKES:
      return Object.assign({}, state, {
        likes: action.likes,
      });

    case types.RECEIVE_NEW_STREAM_SONGS:
      return Object.assign({}, state, {
        newStreamSongs: [...action.songs, ...state.newStreamSongs],
      });

    case types.RESET_AUTHED:
      return Object.assign({}, initialState);

    case types.SET_FOLLOWING:
      return Object.assign({}, state, {
        followings: Object.assign({}, state.followings, {
          [action.userId]: action.following,
        }),
      });

    case types.SET_LIKE:
      return Object.assign({}, state, {
        likes: Object.assign({}, state.likes, {
          [action.songId]: action.liked,
        }),
      });

    case types.UNSHIFT_NEW_STREAM_SONGS:
      return Object.assign({}, state, {
        newStreamSongs: [],
      });

    default:
      return state;
  }
}
