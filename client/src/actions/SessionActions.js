import { normalize } from 'normalizr';
import { fetchSongsSuccess } from '../actions/PlaylistActions';
import * as types from '../constants/ActionTypes';
import { CLIENT_ID, SESSION_FOLLOWINGS_URL, SESSION_LIKES_URL, SESSION_USER_URL } from '../constants/ApiConstants';
import { SESSION_LIKES_PLAYLIST } from '../constants/PlaylistConstants';
import { songSchema, userSchema } from '../constants/Schemas';
import { callApi, loginToSoundCloud } from '../utils/ApiUtils';

const fetchFollowingsSuccess = (followings, entities) => ({
  type: types.FETCH_SESSION_FOLLOWINGS_SUCCESS,
  entities,
  followings,
});

const fetchFollowings = oauthToken => async (dispatch) => {
  const { json } = await callApi(`${SESSION_FOLLOWINGS_URL}?oauth_token=${oauthToken}`);
  const { collection } = json;
  const { result, entities } = normalize(collection, [userSchema]);
  const followings = result.reduce((obj, id) => ({
    ...obj,
    [id]: 1,
  }), {});

  dispatch(fetchFollowingsSuccess(followings, entities));
};

const fetchSessionLikesSuccess = likes => ({
  type: types.FETCH_SESSION_LIKES_SUCCESS,
  likes,
});

const fetchSessionLikes = oauthToken => async (dispatch) => {
  const { json } = await callApi(`${SESSION_LIKES_URL}?oauth_token=${oauthToken}`);
  const songs = json.filter(song => song.streamable);
  const { result, entities } = normalize(songs, [songSchema]);

  const likes = json.reduce((obj, song) => ({ ...obj, [song.id]: 1 }), {});

  dispatch(fetchSessionLikesSuccess(likes, result, entities));
  dispatch(fetchSongsSuccess(SESSION_LIKES_PLAYLIST, result, entities, null, null));
};

const fetchSessionUserSuccess = (id, entities) => ({
  type: types.FETCH_SESSION_USER_SUCCESS,
  id,
  entities,
});

const fetchSessionUser = oauthToken => async (dispatch) => {
  const { json } = await callApi(`${SESSION_USER_URL}?oauth_token=${oauthToken}`);
  const { result, entities } = normalize(json, userSchema);

  dispatch(fetchSessionUserSuccess(result, entities));
};

const loginSuccess = oauthToken => ({
  type: types.LOGIN_SUCCESS,
  oauthToken,
});

const login = () => async (dispatch) => {
  const { json } = await loginToSoundCloud(CLIENT_ID);
  const { oauthToken } = json;

  dispatch(loginSuccess(oauthToken));
  dispatch(fetchSessionUser(oauthToken));
  dispatch(fetchFollowings(oauthToken));
  dispatch(fetchSessionLikes(oauthToken));
};

export default login;
