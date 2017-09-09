import merge from 'lodash.merge';
import * as types from '../constants/ActionTypes';

const initialState = {
  playlists: {},
  songs: {},
  users: {},
};

export default function entities(state = initialState, action) {
  if (action.entities) {
    return merge({}, state, action.entities);
  }

  switch (action.type) {
    case types.LOGOUT:
      return {
        ...state,
        playlists: {},
      };

    default:
      return state;
  }
}
