import merge from 'lodash/merge';

const initialState = {
  playlists: {},
  songs: {},
  users: {},
};

export default function entities(state = initialState, action) {
  if (action.entities) {
    return merge({}, state, action.entities);
  }

  return state;
}
