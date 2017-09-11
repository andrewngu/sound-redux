import * as types from '../constants/ActionTypes';

const initialState = {
  followings: {},
  id: null,
  likes: {},
  oauthToken: null,
  newStreamSongs: [],
};

const session = (state = initialState, action) => {
  switch (action.type) {
    case types.FETCH_NEW_STREAM_SONGS_SUCCESS:
      return {
        ...state,
        newStreamSongs: [...state.newStreamSongs, ...action.songs],
      };

    case types.FETCH_SESSION_FOLLOWINGS_SUCCESS:
      return {
        ...state,
        followings: action.followings,
      };

    case types.FETCH_SESSION_LIKES_SUCCESS:
      return {
        ...state,
        likes: action.likes,
      };

    case types.FETCH_SESSION_USER_SUCCESS:
      return {
        ...state,
        id: action.id,
      };

    case types.LOAD_NEW_STREAM_SONGS:
      return {
        ...state,
        newStreamSongs: [],
      };

    case types.LOGIN_SUCCESS:
      return {
        ...state,
        oauthToken: action.oauthToken,
      };

    case types.TOGGLE_FOLLOW:
      return {
        ...state,
        followings: {
          ...state.followings,
          [action.id]: action.follow ? 1 : 0,
        },
      };

    case types.TOGGLE_LIKE:
      return {
        ...state,
        likes: {
          ...state.likes,
          [action.id]: action.liked ? 1 : 0,
        },
      };

    case types.LOGOUT:
      return { ...initialState };

    default:
      return state;
  }
};

export default session;
