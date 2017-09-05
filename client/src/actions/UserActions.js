import { normalize } from 'normalizr';
import { fetchSongs } from '../actions/PlaylistActions';
import * as types from '../constants/ActionTypes';
import { USER_FOLLOWINGS_URL, USER_PROFILES_URL, USER_SONGS_URL, USER_URL } from '../constants/ApiConstants';
import { userSchema } from '../constants/Schemas';
import callApi from '../utils/ApiUtils';

const fetchUserFollowingsSuccess = entities => ({
  type: types.FETCH_USER_FOLLOWINGS_SUCCESS,
  entities,
});

const fetchUserFollowings = id => async (dispatch) => {
  const { json } = await callApi(USER_FOLLOWINGS_URL.replace(':id', id));
  const { entities, result } = normalize(json, [userSchema]);

  dispatch(fetchUserFollowingsSuccess({
    users: {
      ...entities.users,
      [id]: { followings: result },
    },
  }));
};

const fetchUserProfilesSuccess = (id, profiles) => ({
  type: types.FETCH_USER_PROFILES_SUCCESS,
  entities: {
    users: {
      [id]: { profiles },
    },
  },
});

const fetchUserProfiles = id => async (dispatch) => {
  const { json } = await callApi(USER_PROFILES_URL.replace(':id', id));
  dispatch(fetchUserProfilesSuccess(id, json));
};

const fetchUserSuccess = entities => ({
  type: types.FETCH_USER_SUCCESS,
  entities,
});

const fetchUser = (id, playlist) => async (dispatch) => {
  const { json } = await callApi(USER_URL.replace(':id', id));
  const { entities } = normalize(json, userSchema);
  dispatch(fetchUserSuccess(entities));

  dispatch(fetchSongs(playlist, USER_SONGS_URL.replace(':id', id)));
  dispatch(fetchUserFollowings(id));
  dispatch(fetchUserProfiles(id));
};

const shouldFetchUser = (id, state) => {
  const { entities } = state;
  const { users } = entities;
  const userExists = id in users;
  const userHasDescription = userExists ? 'description' in users[id] : false;

  return !userExists || !userHasDescription;
};

const fetchUserIfNeeded = (id, playlist) => (dispatch, getState) => {
  if (shouldFetchUser(id, getState())) {
    dispatch(fetchUser(id, playlist));
  }
};

export default fetchUserIfNeeded;
